import React, { useState } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import './App.css';
import { countries, regionData, countryFormats } from './countryData';

function HomePage() {
    const [address, setAddress] = useState({
        salutation: '',
        company: '',
        name: '',
        country: '',
        addressLine1: '',
        addressLine2: '',
        neighborhood: '',
        locality: '',
        city: '',
        region: '',
        postalCode: '',
    });

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [errors, setErrors] = useState({});
    const [selectedCountry1, setSelectedCountry1] = useState('');
    const [selectedCountry2, setSelectedCountry2] = useState('');
    const [citySuggestions, setCitySuggestions] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateAddress = () => {
        const { country, postalCode } = address;
        const errors = {};
        const format = countryFormats[country];

        if (format) {
            const postalCodePattern = new RegExp(`^${format.postalCodeFormat.replace(/#/g, '\\d').replace(/A/g, '[A-Za-z]')}$`);
            if (!postalCodePattern.test(postalCode)) {
                errors.postalCode = `Invalid Postal code: ${format.postalCodeFormat}`;
            }
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateAddress()) {
            console.log('Validation failed');
            return;
        }

        console.log('Submitting address:');
        axios.post('http://localhost:5000/api/addresses', address)
            .then(response => {
                console.log('Address saved:', response.data);
            }).catch(error => {
                console.error('Error saving address:', error);
            });
    };

    const handleSearchChange = (e, { newValue }) => {
        setQuery(newValue);
    };

    const handleSuggestionsFetchRequested = async ({ value }) => {
        if (value.length > 2) {
            try {
                const response = await axios.get(`http://localhost:5000/search?q=${encodeURIComponent(value)}`);
                setSuggestions(response.data.slice(0, 5));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion) => suggestion.formattedAddress;

    const renderSuggestion = (suggestion) => (
        <div>
            {suggestion.formattedAddress}
        </div>
    );

    const handleCityChange = (e, { newValue }) => {
        setAddress(prevState => ({
            ...prevState,
            city: newValue
        }));
    };

    const handleCitySuggestionsFetchRequested = ({ value }) => {
        const country = address.country;
        if (country && value.length > 0) {
            const states = regionData[country] || {};
            const cities = Object.values(states).flat(); // creates a new array with all the cities
            const filteredCities = cities.filter(city => city.toLowerCase().startsWith(value.toLowerCase()));
            setCitySuggestions(filteredCities);
        } else {
            setCitySuggestions([]);
        }
    };

    const handleCitySuggestionsClearRequested = () => {
        setCitySuggestions([]);
    };

    const getCitySuggestionValue = (suggestion) => suggestion;

    const renderCitySuggestion = (suggestion) => (
        <div>
            {suggestion}
        </div>
    );

    const { labels = {} } = countryFormats[address.country] || {};

    const inputProps = {
        placeholder: 'Search Globally here',
        value: query,
        onChange: handleSearchChange
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit} className="address-form">
                {labels.salutation && (
                    <label>
                        {labels.salutation}: <input type="text" name="salutation" placeholder="Mr/Ms"
                            value={address.salutation} onChange={handleInputChange} />
                    </label>
                )}
                <label>
                    {labels.name || 'Name'}: <input type="text" name="name"
                        value={address.name} onChange={handleInputChange} required />
                </label>
                {labels.company && (
                    <label>
                        {labels.company}: <input type="text" name="company" placeholder="Company (optional)"
                            value={address.company} onChange={handleInputChange} />
                    </label>
                )}
                <label>
                    Country: <select name="country" value={address.country} onChange={handleInputChange} required>
                        <option value="" disabled>Select your country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </select>
                </label>
                <label>
                    {labels.addressLine1 || 'Address Line 1'}: <input type="text" name="addressLine1" placeholder="Street"
                        value={address.addressLine1} onChange={handleInputChange} required />
                </label>
                {labels.addressLine2 && (
                    <label>
                        {labels.addressLine2}: <input type="text" name="addressLine2"
                            value={address.addressLine2} onChange={handleInputChange} />
                    </label>
                )}
                {labels.neighborhood && (
                    <label>
                        {labels.neighborhood}: <input type="text" name="neighborhood"
                            value={address.neighborhood} onChange={handleInputChange} />
                    </label>
                )}
                {labels.locality && (
                    <label>
                        {labels.locality}: <input type="text" name="locality"
                            value={address.locality} onChange={handleInputChange} />
                    </label>
                )}
                <label>
                    {labels.city || 'City'}:
                    <Autosuggest
                        suggestions={citySuggestions}
                        onSuggestionsFetchRequested={handleCitySuggestionsFetchRequested}
                        onSuggestionsClearRequested={handleCitySuggestionsClearRequested}
                        getSuggestionValue={getCitySuggestionValue}
                        renderSuggestion={renderCitySuggestion}
                        inputProps={{
                            value: address.city,
                            onChange: handleCityChange
                        }}
                    />
                </label>

                {address.country && regionData[address.country] ? (
                    <label>
                        {address.country === "Japan" ? "Prefecture" :
                            address.country === "United States" ? "State" :
                                address.country === "Canada" ? "Province" :
                                    address.country === "India" ? "State" : "Region"
                        }:
                        <select name="region" value={address.region} onChange={handleInputChange} required>
                            <option value="">Select a {address.country === "Japan" ? "Prefecture" :
                                address.country === ("India" && "United States") || address.country === "Canada" ? "State/Province" : "State"}</option>
                            {Object.keys(regionData[address.country]).map((region, index) => (
                                <option key={index} value={region}>{region}</option>
                            ))}
                        </select>
                    </label>
                ) : (
                    <label>
                        {labels.region || 'State/Region/Province'}: <input type="text" name="region"
                            value={address.region} onChange={handleInputChange} />
                    </label>
                )}

                <label>
                    {labels.postalCode || 'Postal Code'}: <input type="text" name="postalCode"
                        value={address.postalCode} onChange={handleInputChange} required />
                    {errors.postalCode && <span className="error">{errors.postalCode}</span>}
                </label>
                <button type="submit">Submit</button>
            </form>
            <div className="search-container">
                <div className='dropdown-container'>
                    <select
                        name="selectedCountry1"
                        value={selectedCountry1}
                        onChange={(e) => setSelectedCountry1(e.target.value)}
                        className="dropdown1"
                    >
                        <option value="" disabled>Select Country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </select>

                    <select
                        name="selectedCountry2"
                        value={selectedCountry2}
                        onChange={(e) => setSelectedCountry2(e.target.value)}
                        className="dropdown2"
                    >
                        <option value="" disabled>Select another</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </select>
                </div>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested={handleSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        </div>
    );
}

export default HomePage;