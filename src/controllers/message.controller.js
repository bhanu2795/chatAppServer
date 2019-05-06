const Message = require('../../model/messages.model');
const utils = require('../utils/functions');

const md5 = require('md5');

// Initiate a new message for convo
exports.send = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: 'message content can not be empty'
        });
    }

    // Create a message
    const message = new Message({
        id: utils.random(),
        conversationId: req.params.convoId,
        senderId: req.params.userId,
        message: req.body.message,
        createdAt: new Date()
    });

    message.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Something wend wrong!'
        });
    })
};

// Retrive and return all messages by users from the database.
exports.findAll = (req, res) => {
    Message.find({
        creatorId: req.params.userId
    }).then(convo => {
        res.send(convo);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving messages.'
        });
    });
};

// Find a single message with a userId
exports.findOne = (req, res) => {

};

// Update a message identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
};

// Delete a message with the specified userId in the request
exports.delete = (req, res) => {

};