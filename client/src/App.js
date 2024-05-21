import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function HomePage() {
    const [address, setAddress] = useState({
        name: '',
        country: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
    });

    const handleInputChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Clicked on submit button, saving address...');
        axios.post('http://localhost:5000/api/addresses', address)
            .then(response => {
                console.log('Address saved:', response.data);
            }).catch(error => {
                console.error('Error saving address:', error);
            });
    };

    const handleGlobalSearch = () => {
        console.log('Global search initiated');
        // Implement search functionality as needed
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit} className="address-form">
                <label>
                    Full Name:
                    <input type="text" name="name" value={address.name} onChange={handleInputChange} />
                </label>
                <label>
                    Country:
                    <select name="country" value={address.country} onChange={handleInputChange}>
                        <option value="usa">USA</option>
                        <option value="canada">Canada</option>
                        <option value="uk">UK</option>
                    </select>
                </label>
                <label>
                    Street:
                    <input type="text" name="street" value={address.street} onChange={handleInputChange} />
                </label>
                <label>
                    City:
                    <input type="text" name="city" value={address.city} onChange={handleInputChange} />
                </label>
                <label>
                    State/Province/Region:
                    <input type="text" name="state" value={address.state} onChange={handleInputChange} />
                </label>
                <label>
                    ZIP/Postal Code:
                    <input type="text" name="postalCode" value={address.postalCode} onChange={handleInputChange} />
                </label>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleGlobalSearch}>Global Search</button>
            </form>
        </div>
    );
}

export default HomePage;
