const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blockList = new Schema({
    id: Number,
    userId: Number,
    participantsId: Number,
    createdAt: Date
});

module.exports = mongoose.model('blockList', blockList);