import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { countries } from './countryData';
import './App.css';

function GlobalSearch() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCountry1, setSelectedCountry1] = useState('');
    const [selectedCountry2, setSelectedCountry2] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchSuggestions = useCallback(async (value, page) => {
        if (value.length > 2 && (selectedCountry1 || selectedCountry2)) {
            try {
                console.log('Fetching data with:', {
                    q: value,
                    country1: selectedCountry1,
                    country2: selectedCountry2,
                    page,
                    limit: 25
                });
                const response = await axios.get(`http://localhost:5000/search`, {
                    params: {
                        q: value,
                        country1: selectedCountry1,
                        country2: selectedCountry2,
                        page,
                        limit: 25
                    }
                });
                console.log('Fetched data:', response.data);
                setSuggestions(response.data.results || []);
                setTotalPages(response.data.totalPages || 1);
            } catch (error) {
                console.error('Error fetching data:', error);
                setSuggestions([]);
                setTotalPages(1);
            }
        } else {
            setSuggestions([]);
            setTotalPages(1);
        }
    }, [selectedCountry1, selectedCountry2]);

    useEffect(() => {
        if (query.length > 2 && (selectedCountry1 || selectedCountry2)) {
            fetchSuggestions(query, page);
        }
    }, [query, page, selectedCountry1, selectedCountry2, fetchSuggestions]);

    const handleSearchChange = (e, { newValue }) => {
        setQuery(newValue);
        setPage(1); // Reseting to the first page whenever a new search is initiated
    };

    const handleSuggestionsFetchRequested = async ({ value }) => {
        setPage(1); // Reseting to the first page whenever suggestions are fetched
        await fetchSuggestions(value, 1);
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

    const handlePageChange = (newPage) => {
        console.log('Changing to page:', newPage);
        setPage(newPage);
    };

    useEffect(() => {
        console.log('Suggestions updated:', suggestions);
    }, [suggestions]);

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
                key={`${page}-${suggestions.length}`}
                suggestions={suggestions}
                onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={handleSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
            {totalPages > 1 && (
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index} onClick={() => handlePageChange(index + 1)} disabled={page === index + 1}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default GlobalSearch;
