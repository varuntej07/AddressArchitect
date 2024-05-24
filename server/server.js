const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Address, saveAddress } = require('./mongooseModel');

const cors = require('cors');
app.use(cors());

app.use(express.json());

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
