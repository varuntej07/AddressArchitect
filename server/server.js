const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Address, saveAddress } = require('./mongooseModel');

const cors = require('cors');
app.use(cors());

app.use(express.json());

const countryFormats = require('./countryFormats');


app.get('/search', async (req, res) => {
    const query = req.query.q;
    const regex = new RegExp(query, 'i');
    const results = await Address.find({
        $or: [
            { name: regex },
            { addressLine1: regex },
            { addressLine2: regex },
            { city: regex },
            { region: regex },
            { postalCode: regex }
        ]
    }).lean();

    const formattedResults = results.map(address => {
        const countryFormat = countryFormats[address.country];
        if (countryFormat) {
            const format = countryFormat.format;
            const formattedAddress = format
                .replace("{name}", address.name)
                .replace("{addressLine1}", address.addressLine1)
                .replace("{addressLine2}", address.addressLine2 || "")
                .replace("{city}", address.city)
                .replace("{region}", address.region)
                .replace("{postalCode}", address.postalCode)
                .replace("{country}", address.country || "")
                .replace("{neighbourhood}", address.neighbourhood || "");
            return {
                ...address,
                formattedAddress
            };
        } else {
            return {
                ...address,
                formattedAddress: `${address.addressLine1}, ${address.addressLine2 || ''}, ${address.city}, ${address.region}, ${address.postalCode}`
            };
        }
    });

    res.json(formattedResults);
});

    app.get('/api', (req, res) => {
        res.json({ 'address': ['address1', 'address2', 'address3..'] });
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