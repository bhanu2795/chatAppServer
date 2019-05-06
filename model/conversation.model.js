const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversation = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    creatorId: {
        type: Number,
        required: true
    },
    channelId: {
        type: String,
        required: true,
        unique: true
    },
    isDeleted: Boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model('conversation', conversation);