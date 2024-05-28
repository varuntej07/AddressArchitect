const mongoose = require('mongoose');
const faker = require('faker');
const path = require('path');
const { Address } = require('./mongooseModel');

const countryDataPath = path.resolve(__dirname, '../client/src/countryData.js');
const { regionData, countryFormats } = require(countryDataPath);

const addressGenerator = (country, count) => {
    const addresses = [];
    const data = regionData[country];
    const format = countryFormats[country]?.postalCodeFormat;

    /*if (!data) {
        console.error(`No region data found for ${country}`);
        return addresses;
    }*/

    const regions = Object.keys(data);

    const generatePostalCode = (format) => {
        return format.replace(/#/g, () => Math.floor(Math.random() * 10))
            .replace(/A/g, () => String.fromCharCode(65 + Math.floor(Math.random() * 26)));
    };

    for (let i = 0; i < count; i++) {
        const region = regions[Math.floor(Math.random() * regions.length)];
        const cities = data[region];
        const city = cities[Math.floor(Math.random() * cities.length)];

        const address = {
            name: faker.name.findName(),
            country: country,
            addressLine1: faker.address.streetAddress(),
            addressLine2: faker.address.secondaryAddress(),
            city: city,
            region: region,
            postalCode: format ? generatePostalCode(format) : faker.address.zipCode()
        };

        addresses.push(address);
    }
    return addresses;
};

const seedData = async () => {
    console.log('Starting the seeding process...');

    try {
        const allAddresses = [];
        for (const country in regionData) {
            console.log(`Generating addresses for ${country}...`);
            const addresses = addressGenerator(country, 3);
            allAddresses.push(...addresses);
           /* console.log(`${addresses.length} addresses generated for ${country}`);*/
        }

       /* console.log(`Inserting ${allAddresses.length} addresses into the database...`);*/
        await Address.insertMany(allAddresses);
        console.log('Data successfully seeded!', allAddresses);
    } catch (err) {
        console.error('Error seeding the data', err);
    } finally {
        mongoose.connection.close();
    }
};

seedData();