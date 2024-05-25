const countryFormats = {
    'Brazil': {
        'format': '{name}, {addressLine1}, {addressLine2}, {neighbourhood}, {city}, {region}, {postalCode}',
        'labels': {
            'addressLine1': 'Street',
            'addressLine2': 'Apt/Suite',
            'region': 'State',
            'postalCode': 'CEP'
        }
    },
    'Canada': {
        'format': '{name}, {addressLine1}, {addressLine2}, {city}, {region}, {postalCode}, {country}',
        'labels': {
            'addressLine1': 'Street Number and Name',
            'addressLine2': 'Unit Number',
            'region': 'Province',
            'postalCode': 'Postal Code',
            'country': 'Country'
        }
    },
    'Germany': {
        'format': '{name}, {addressLine1}, {addressLine2}, {city}, {region}, {postalCode}',
        'labels': {
            'addressLine1': 'Street Address',
            'addressLine2': 'Optional Address Line',
            'region': 'State',
            'postalCode': 'Postal Code'
        }
    },
    'India': {
        'format': '{name}, {addressLine1}, {addressLine2}, {city}, {region}, {postalCode}',
        'labels': {
            'addressLine1': 'Street Address',
            'addressLine2': 'Landmark',
            'region': 'State',
            'postalCode': 'PIN'
        }
    },
    'Japan': {
        'format': '{postalCode}, {region}, {city}, {addressLine1}, {addressLine2}, {name}',
        'labels': {
            'region': 'Prefecture',
            'city': 'City',
            'addressLine1': 'Neighborhood, Block',
            'addressLine2': 'Building Name, Apartment Number'
        }
    },
    'North Korea': {
        'format': '{name}, {addressLine1}, {addressLine2}, {city}, {region}, {postalCode}, {country}',
        'labels': {
            'addressLine1': 'Street',
            'addressLine2': 'District',
            'city': 'City',
            'region': 'Province',
            'postalCode': 'Postal Code',
            'country': 'Country'
        }
    },
    'South Korea': {
        'format': '{name}, {addressLine1}, {addressLine2}, {city}, {region}, {postalCode}, {country}',
        'labels': {
            'addressLine1': 'Street',
            'addressLine2': 'District',
            'city': 'City',
            'region': 'Province',
            'postalCode': 'Postal Code',
            'country': 'Country'
        }
    },
    'Mexico': {
        'format': '{name}, {addressLine1}, {addressLine2}, {neighbourhood}, {city}, {region}, {postalCode}, {country}',
        'labels': {
            'addressLine1': 'Street',
            'addressLine2': 'Neighborhood',
            'city': 'City',
            'region': 'State',
            'postalCode': 'Postal Code',
            'country': 'Country'
        }
    },
    'Spain': {
        'format': '{name}, {addressLine1}, {addressLine2}, {city}, {region}, {postalCode}, {country}',
        'labels': {
            'addressLine1': 'Street',
            'addressLine2': 'Neighborhood',
            'city': 'City',
            'region': 'Region',
            'postalCode': 'Postal Code',
            'country': 'Country'
        }
    },
    'UK': {
        'format': '{name}, {addressLine1}, {addressLine2}, {city}, {region}, {postalCode}, {country}',
        'labels': {
            'addressLine1': 'Street',
            'addressLine2': 'County',
            'city': 'City',
            'region': 'Region',
            'postalCode': 'Postal Code',
            'country': 'Country'
        }
    },
    'USA': {
        'format': '{name}, {addressLine1}, {addressLine2}, {city}, {region}, {postalCode}',
        'labels': {
            'addressLine1': 'Street',
            'addressLine2': 'Apt/Suite',
            'region': 'State',
            'postalCode': 'ZIP Code'
        }
    },
};

module.exports = countryFormats;