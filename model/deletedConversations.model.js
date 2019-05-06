const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deletedConversations = new Schema({
    id: Number,
    conversationId: Number,
    userId: Number,
    createdAt: Date
});

module.exports = mongoose.model('deletedConversations', deletedConversations);