const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const access = new Schema({
    id: Number,
    userId: Number,
    token: String,
    createdAt: Date,
    deletedAt: Date,
    deviceId: Number
});

module.exports = mongoose.model('access', access);