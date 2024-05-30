import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { countries } from './countryData';
import './App.css';

function GlobalSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedCountry1, setSelectedCountry1] = useState('');
    const [selectedCountry2, setSelectedCountry2] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length > 3 && (selectedCountry1 || selectedCountry2)) {
                try {
                    const response = await axios.get(`http://localhost:5000/search`, {
                        params: {
                            q: query,
                            country1: selectedCountry1,
                            country2: selectedCountry2,
                            page: page
                        }
                    });
                    setResults(response.data.results);
                    setTotalPages(response.data.totalPages);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchResults();
    }, [query, selectedCountry1, selectedCountry2, page]);

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const startPage = Math.max(1, page - 2);
        const endPage = Math.min(totalPages, page + 2);

        if (page > 1) {
            buttons.push(
                <button key="prev" onClick={() => handlePageChange(page - 1)}>
                    Previous
                </button>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={page === i ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }

        if (page < totalPages) {
            buttons.push(
                <button key="next" onClick={() => handlePageChange(page + 1)}>
                    Next
                </button>
            );
        }

        return buttons;
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
            <input
                type="text"
                placeholder="Search Globally here"
                value={query}
                onChange={handleSearchChange}
                className="search-input"
            />
            <ul className="search-suggestions">
                {results.map((result, index) => (
                    <li key={index}>{result.formattedAddress}</li>
                ))}
            </ul>
            {totalPages > 1 && (
                <div className="pagination">
                    {renderPaginationButtons()}
                </div>
            )}
        </div>
    );
}

export default GlobalSearch;