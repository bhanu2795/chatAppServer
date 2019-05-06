const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const participants = new Schema({
    id: Number,
    conversationId: Number,
    userId: Number,
    type: Array
});

module.exports = mongoose.model('participants', participants);