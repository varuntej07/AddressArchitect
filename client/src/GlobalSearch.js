import React, { useState } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { countries } from './countryData';
import './App.css';

function GlobalSearch() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCountry1, setSelectedCountry1] = useState('');
    const [selectedCountry2, setSelectedCountry2] = useState('');

    const handleSearchChange = (e, { newValue }) => {
        setQuery(newValue);
    };

    const handleSuggestionsFetchRequested = async ({ value }) => {
        if (value.length > 2 && selectedCountry1 && selectedCountry2) {
            try {
                const response = await axios.get(`http://localhost:5000/search?q=${encodeURIComponent(value)}&country1=${encodeURIComponent(selectedCountry1)}&country2=${encodeURIComponent(selectedCountry2)}`);
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
        <div>{suggestion.formattedAddress}</div>
    );

    const inputProps = {
        placeholder: 'Search Globally here',
        value: query,
        onChange: handleSearchChange
    };

    return (
        <div className="search-container">
            <div className="dropdown-container">
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
    );
}

export default GlobalSearch;