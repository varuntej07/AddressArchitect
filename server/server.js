const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Address, saveAddress } = require('./mongooseModel');
const cors = require('cors');
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const countryFormatPath = path.resolve(__dirname, '../client/src/countryData.js');
const { countryFormats } = require(countryFormatPath);

app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Address API',
            version: '1.0.0',
            description: 'API for managing International country specific addresses'
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Local server'
            }
        ]
    },
    apis: [path.resolve(__dirname, './openapi.yaml')], // Path to the API docs
};

console.log('Swagger Path:', path.resolve(__dirname, './openapi.yaml'));

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/search', async (req, res) => {
    const query = req.query.q;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 25;
    const skip = (page - 1) * limit;
    const country1 = req.query.country1 || '';
    const country2 = req.query.country2 || '';

    console.log(`Searching for: ${query} in ${country1} and ${country2}`);
    try {
        const queryConditions = [];

        queryConditions.push({
            $or: [
                { company: { $regex: new RegExp(query, 'i') } },
                { name: { $regex: new RegExp(`^${query}$`, 'i') } },  //exactly matching the name
                { addressLine1: { $regex: new RegExp(query, 'i') } },
                { city: { $regex: new RegExp(query, 'i') } },
                { region: { $regex: new RegExp(query, 'i') } },
                { postalCode: { $regex: new RegExp(query, 'i') } },
            ]
        });

        if (country1 && country2) {
            queryConditions.push({
                country: { $in: [country1, country2] }
            });
        } else if (country1 || country2) {
            queryConditions.push({
                country: country1 || country2
            });
        }

        const results = await Address.find({
            $and: queryConditions
        }).skip(skip).limit(limit).lean();

        const totalResults = await Address.countDocuments({
            $and: queryConditions
        });

        const totalPages = Math.ceil(totalResults / limit);

        const formattedResults = results.map(address => {
            const countryFormat = countryFormats[address.country];
            let formattedAddress = '';
            if (countryFormat) {
                const format = countryFormat.format;
                formattedAddress = format
                    .replace("{salutation}", address.salutation || "")
                    .replace("{name}", address.name || "")
                    .replace("{company}", address.company || "")
                    .replace("{addressLine1}", address.addressLine1 || "")
                    .replace("{addressLine2}", address.addressLine2 || "")
                    .replace("{neighborhood}", address.neighborhood || "")
                    .replace("{locality}", address.locality || "")
                    .replace("{city}", address.city || "")
                    .replace("{region}", address.region || "")
                    .replace("{postalCode}", address.postalCode || "")
                    .replace("{country}", address.country || "");
            } else {
                formattedAddress = `${address.salutation || ''} ${address.name || ''} ${address.company || ''} ${address.addressLine1 || ''} ${address.addressLine2 || ''} ${address.neighborhood || ''} ${address.locality || ''} ${address.city || ''} ${address.region || ''} ${address.postalCode || ''} ${address.country || ''}`;
            }

            formattedAddress = formattedAddress.replace(/,/g, ' '); // removing commas 

            return {
                ...address,
                formattedAddress
            };
        });

        res.json({ results: formattedResults, totalPages, totalResults });
    } catch (error) {
        console.error("Error fetching search results:", error);
        res.status(500).json({ error: 'Error fetching search results', details: error.message });
    }
});

app.post('/api/addresses', async (req, res) => {
    console.log("Trying to save address:", req.body);
    try {
        const address = await saveAddress(req.body);
        res.status(201).json(address);
    } catch (error) {
        console.error("Error saving address:", error);
        res.status(500).json({ error: 'Error saving address', details: error.message });
    }
});

app.get('/api/addresses', async (req, res) => {
    try {
        const addresses = await Address.find();
        res.json(addresses);
    } catch (error) {
        console.error("Error fetching addresses", error);
        res.status(500).send("Error fetching addresses");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started serving at port ${PORT}!`);
});