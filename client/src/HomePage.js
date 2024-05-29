import React, { useState } from 'react';
import axios from 'axios';
import AddressForm from './AddressForm';
import GlobalSearch from './GlobalSearch';
import { countryFormats } from './countryData';

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

    const [errors, setErrors] = useState({});

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

    return (
        <div>
            <AddressForm
                address={address}
                errors={errors}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
            <GlobalSearch />
        </div>
    );
}

export default HomePage;