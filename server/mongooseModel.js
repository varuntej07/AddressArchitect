const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/AddressData', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const IntAddressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    region: { type: String, required: true },
    postalCode: { type: String, required: true },
    salutation: { type: String },
    company: { type: String },
    locality: { type: String },
    neighborhood: { type: String },
}, { timestamps: true });

IntAddressSchema.index({ name: 1 });
IntAddressSchema.index({ addressLine1: 1 });
IntAddressSchema.index({ city: 1 });
IntAddressSchema.index({ region: 1 });
IntAddressSchema.index({ postalCode: 1 });

const Address = mongoose.model('Address', IntAddressSchema);

const saveAddress = async (addressData) => {
    const address = new Address(addressData);
    await address.save();
    return address;
};

const clearAddresses = async () => {
    await Address.deleteMany({});
    console.log("All addresses cleared");
};

module.exports = { Address, saveAddress, clearAddresses };