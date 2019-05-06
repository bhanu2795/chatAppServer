const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userContact = new Schema({
    userId: Number,
    contactId: Number,
    firstName: String,
    lastName: String,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('userContact', userContact);