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

    console.log(`Searching for: ${query} in ${country1} and ${country2}`);
    const results = await Address.find({
        $and: [
            { $or: [{ country: country1 }, { country: country2 }] },
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
                    { postalCode: regex },
                    { country: regex }
                ]
            }
        ]
    }).lean().limit(50); // Limiting to first 50 results

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

        // Removing commas from the formatted address in the suggestions
        formattedAddress = formattedAddress.replace(/,/g, ' ');

        return {
            ...address,
            formattedAddress
        };
    });

    res.json(formattedResults);
});

app.post('/api/addresses', async (req, res) => {
    console.log("tryna save ya address!", req.body)
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