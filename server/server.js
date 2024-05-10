const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Address = require('./mongooseModel'); 

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ 'address': ['address1', 'address2', 'address3..'] });
});

app.post('/api/addresses', async (req, res) => {
    console.log("tryna save ya address!")
    try {
        const newAddress = new Address(req.body);
        await newAddress.save();
        res.status(201).send("Address saved successfully!");
    } catch (error) {
        console.error("Oops! something went wrong", error);
        res.status(400).send("Oops! something went wrong");
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
