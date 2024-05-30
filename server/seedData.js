const mongoose = require('mongoose');
const faker = require('faker');
const path = require('path');
const { Address } = require('./mongooseModel');

const countryDataPath = path.resolve(__dirname, '../client/src/countryData.js');
const { regionData, countryFormats } = require(countryDataPath);

const countryPopulations = {
    'Brazil': 212559417,
    'Canada': 37742154,
    'Germany': 83783942,
    'India': 1380004385,
    'Japan': 126476461,
    'North Korea': 25778816,
    'South Korea': 51269185,
    'Mexico': 128932753,
    'Spain': 46754778,
    'United Kingdom': 67886011,
    'United States': 331002651
};

const totalPopulation = Object.values(countryPopulations).reduce((sum, population) => sum + population, 0);

const addressCountPerCountry = {};
const totalAddresses = 100000; // total generating these many addresses

for (const country in countryPopulations) {
    const population = countryPopulations[country];
    addressCountPerCountry[country] = Math.round((population / totalPopulation) * totalAddresses);
}

const addressGenerator = (country, count) => {
    const addresses = [];
    const data = regionData[country];
    const format = countryFormats[country]?.postalCodeFormat;

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
            const addressCount = addressCountPerCountry[country];
            console.log(`Generating ${addressCount} addresses for ${country}...`);
            const addresses = addressGenerator(country, addressCount);
            allAddresses.push(...addresses);
        }

        console.log(`Inserting ${allAddresses.length} addresses into the database...`);
        await Address.insertMany(allAddresses);
        console.log('Data successfully seeded!');
    } catch (err) {
        console.error('Error seeding the data', err);
    } finally {
        mongoose.connection.close();
    }
};

seedData();