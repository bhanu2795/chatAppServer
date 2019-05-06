const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deletedMessages = new Schema({
    id: Number,
    messageId: Number,
    userId: Number,
    createdAt: Date
});

module.exports = mongoose.model('deletedMessages', deletedMessages);