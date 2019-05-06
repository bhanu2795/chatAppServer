const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reports = new Schema({
    id: Number,
    userId: Number,
    participantsId: Number,
    reportType: String,
    notes: String,
    createdAt: Date
});

module.exports = mongoose.model('reports', reports);