const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/AddressData', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const addressSchema = new mongoose.Schema({
    name: String,
    country: String,
    street: String,
    city: String,
    state: String,
    postalCode: Number,
    search: String
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;