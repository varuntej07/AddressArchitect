import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { countries, regionData, countryFormats } from './countryData';

function HomePage() {
    const [address, setAddress] = useState({
        name: '',
        country: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        region: '',
        postalCode: '',
    });

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting address:', address);
        axios.post('http://localhost:5000/api/addresses', address)
            .then(response => {
                console.log('Address saved:', response.data);
            }).catch(error => {
                console.error('Error saving address:', error);
            });
    };

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 2) {
            try {
                const response = await axios.get(`http://localhost:5000/search?q=${value}`);
                setSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const { labels = {} } = countryFormats[address.country] || {};

    return (
        <div className="App">
            <form onSubmit={handleSubmit} className="address-form">
                <input type="text"
                    value={query}
                    placeholder="Search Globally here"
                    onChange={handleChange} />
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion.formattedAddress}</li>
                    ))}
                </ul>
                <label>
                    Full Name: <input type="text" name="name" placeholder="AbdAllah Varun"
                        value={address.name} onChange={handleInputChange} required />
                </label>
                <label>
                    Country: <select name="country" value={address.country} onChange={handleInputChange} required>
                        <option value="" disabled>Select your country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </select>
                </label>
                <label>
                    {labels.addressLine1 || 'Address Line 1'}: <input type="text" name="addressLine1" placeholder="123 Main St"
                        value={address.addressLine1} onChange={handleInputChange} required />
                </label>
                <label>
                    {labels.addressLine2 || 'Address Line 2'}: <input type="text" name="addressLine2" placeholder="Apt, Suite, etc. (optional)"
                        value={address.addressLine2} onChange={handleInputChange} />
                </label>
                <label>
                    City: <input type="text" name="city" placeholder="City" value={address.city}
                        onChange={handleInputChange} required />
                </label>

                {address.country && regionData[address.country] ? (
                    <label>
                        {address.country === "United States" || address.country === "Canada" ? "State/Province" : "Region"}:
                        <select name="region" value={address.region} onChange={handleInputChange} required>
                            <option value="">Select a {address.country === "United States" || address.country === "Canada" ? "State/Province" : "Region"}</option>
                            {Object.keys(regionData[address.country]).map((region, index) => (
                                <option key={index} value={region}>{region}</option>
                            ))}
                        </select>
                    </label>
                ) : (
                    <label>
                        State/Region/Province: <input type="text" name="region"
                            placeholder="State/Region/Province" value={address.region} onChange={handleInputChange} />
                    </label>
                )}

                <label>
                    {labels.postalCode || 'Postal Code'}: <input type="text" name="postalCode" placeholder="12345"
                        value={address.postalCode} onChange={handleInputChange} required />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default HomePage;