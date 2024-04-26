import React, { useState } from 'react';

function HomePage() {
    const [address, setAddress] = useState({
        name: '',
        country: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        search: '',
    });

    const handleInputChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted address:', address);
        // Should make an API call to submit the address data
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit} className="address-form">
                <label>
                    Full Name:
                    <input type='text' name='name'
                        value={address.name}
                        onChange={handleInputChange} />
                </label>
                <label>
                    Country:
                    <select name="country" value={address.country} onChange={handleInputChange}>
                        {/* Options can be fetched from an API or will define statically */}
                        <option value="usa">USA</option>
                        <option value="canada">Canada</option>
                        <option value="uk">UK</option>
                    </select>
                </label>

                <label>
                    Street:
                    <input type="text" name="street"
                        value={address.street}
                        onChange={handleInputChange} />
                </label>

                <label>
                    City:
                    <input type="text" name="city"
                        value={address.city}
                        onChange={handleInputChange} />
                </label>

                <label>
                    State/Province/Region:
                    <input type="text" name="state"
                        value={address.state}
                        onChange={handleInputChange} />
                </label>

                <label>
                    ZIP/Postal Code:
                    <input type="text" name="postalCode"
                        value={address.postalCode}
                        onChange={handleInputChange} />
                </label>

                <label>
                    Search:
                    <input type="text" name="search"
                        value={address.search}
                        onChange={handleInputChange} />
                </label>

                <button type="submit">Submit</button>
                <button type="button" onClick={() => console.log('Global search:', address.search)}>
                    Global Search
                </button>
            </form>
        </div>
    );
}

export default HomePage;