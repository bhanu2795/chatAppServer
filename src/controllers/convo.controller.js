const Conversation = require('../../model/conversation.model');
const utils = require('../utils/functions');

const md5 = require('md5');

// Initiate a new convo by user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: 'User content can not be empty'
        });
    }

    // Create a User
    const user = new Conversation({
        id: utils.random(),
        title: req.body.title,
        creatorId: req.params.userId,
        channelId: utils.random(),
        createdAt: new Date()
    });

    user.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Something wend wrong!'
        });
    })
};

// Retrive and return all convo by users from the database.
exports.findAll = (req, res) => {
    Conversation.find({
        creatorId: req.params.userId
    }).then(convo => {
        res.send(convo);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving convo.'
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {

};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
};

// Delete a user convo with the specified userId in the request
exports.delete = (req, res) => {
    Conversation.findOneAndUpdate({
        'creatorId': req.params.userId
    },{
        isDeleted: true
    },{
        new: true, runValidators: true
    }
    ).then(user => {
        if (!user) {
            return res.status(404).send({
                message: 'User not found with id ' + req.params.userId
            });
        }
        res.send({ message: 'User convo deleted successfully!' });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: 'User not found with id ' + req.params.userId
            });
        }
        return res.status(500).send({
            message: 'Could not delete User covo with id ' + req.params.userId
        });
    });
};