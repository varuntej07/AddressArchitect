const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Address, saveAddress } = require('./mongooseModel');

const cors = require('cors');
app.use(cors());

app.use(express.json());

const path = require('path');
const countryFormatPath = path.resolve(__dirname, '../client/src/countryData.js');
const { countryFormats } = require(countryFormatPath);

app.get('/search', async (req, res) => {
    const query = req.query.q;
    const regex = new RegExp(query, 'i');
    const country1 = req.query.country1 || '';
    const country2 = req.query.country2 || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const skip = (page - 1) * limit;

    console.log(`Searching for: ${query} in ${country1} and ${country2}`);

    const countryConditions = [];
    if (country1) countryConditions.push({ country: country1 });
    if (country2) countryConditions.push({ country: country2 });

    const searchConditions = {
        $and: [
            { $or: countryConditions },
            {
                $or: [
                    { salutation: regex },
                    { company: regex },
                    { name: regex },
                    { addressLine1: regex },
                    { addressLine2: regex },
                    { neighborhood: regex },
                    { locality: regex },
                    { city: regex },
                    { region: regex },
                    { postalCode: regex }
                ]
            }
        ]
    };

    const results = await Address.find(searchConditions).lean().skip(skip).limit(limit);

    const totalResults = await Address.countDocuments(searchConditions);

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

        formattedAddress = formattedAddress.replace(/,/g, ' ');

        return {
            ...address,
            formattedAddress
        };
    });

    res.json({
        results: formattedResults,
        totalResults,
        totalPages: Math.ceil(totalResults / limit),
        currentPage: page
    });
});

app.post('/api/addresses', async (req, res) => {
    console.log("Trying to save address:", req.body)
    try {
        const address = await saveAddress(req.body);
        res.status(201).json(address);
    } catch (error) {
        console.error("Error saving address:", error);
        res.status(500).json({ error: 'Oops! Error saving address', details: error.message });
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