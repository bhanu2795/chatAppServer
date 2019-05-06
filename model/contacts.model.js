const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contacts = new Schema({
    id: Number,
    firstName: String,
    middleName: String,
    lastName: String,
    phone: String,
    email: String,
    createdAt: Date
});

module.exports = mongoose.model('contacts', contacts);