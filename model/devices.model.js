const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const devices = new Schema({
    id: Number,
    userId: Number,
    deviceId: String,
    type: Array,
    deviceToken: String
});

module.exports = mongoose.model('devices', devices);