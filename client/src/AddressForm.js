import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { countries, regionData, countryFormats } from './countryData';

function AddressForm({ address, errors, handleInputChange, handleSubmit }) {
    const [citySuggestions, setCitySuggestions] = useState([]);

    const handleCityChange = (e, { newValue }) => {
        handleInputChange({
            target: {
                name: 'city',
                value: newValue
            }
        });
    };

    const handleCitySuggestionsFetchRequested = ({ value }) => {
        const country = address.country;
        if (country && value.length > 0) {
            const states = regionData[country] || {};
            const cities = Object.values(states).flat();
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
        <div>{suggestion}</div>
    );

    const { labels = {} } = countryFormats[address.country] || {};

    return (
        <div className = "address-form">
        <form onSubmit={handleSubmit}>
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
                    {labels.company}: <input type="text" name="company"
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
                {labels.addressLine1 || 'Address'}: <input type="text" name="addressLine1"
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
                    {labels.region || 'State/Region'}: <input type="text" name="region"
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
        </div>
    );
}

export default AddressForm;