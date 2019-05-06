const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messages = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    conversationId: {
        type: Number,
        required: true,
        unique: true
    },
    senderId: {
        type: Number,
        required: true,
        unique: true
    },
    messageType: Array,
    message: {
        type: String,
        required: true
    },
    attachmentThumbUrl: String,
    createdAt: Date,
    guId: String,
    deletedAt: Date
});

module.exports = mongoose.model('messages', messages);