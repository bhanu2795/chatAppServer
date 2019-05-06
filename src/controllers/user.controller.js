const Users = require('../../model/users.model');
const utils = require('../utils/functions');

const md5 = require('md5');

// Create and save a new user
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: 'User content can not be empty'
        });
    }

    const exist = await Users.findOne({
        'phone': req.body.phone,
        'email': req.body.email,
    }).then(id => {
        if (!id) {
            return res.status(404).send({
                message: `User not found with id ${id}`
            });
        }
        return id;
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'User not found'
            });
        }
        return res.status(404).send({
            message: 'Error retrieving user'
        });
    });

    if (!exist) {
        // Create a User
        const user = new Users({
            id: utils.random(),
            phone: req.body.phone,
            email: req.body.email,
            password: md5(req.body.password),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            isActive: req.body.isActive,
            isValid: true,
            createdAt: new Date()
        });

        user.save().then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Something wend wrong!'
            });
        });
    } else {
        // Find user and update it with the request body
        Users.findOneAndUpdate({
            'phone': req.body.phone,
            'email': req.body.email,
        }, { 'isValid': true }, { new: true, runValidators: true }).then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'user not found with id ' + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'user not found with id ' + req.params.userId
                });
            }
            return res.status(500).send({
                message: 'Error updating user with id ' + req.params.userId
            });
        });
    }
};

// Retrive and return all users from the database.
exports.findAll = (req, res) => {
    Users.find().then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving user.'
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    Users.findOne({
        'id': req.params.userId
    }).then(id => {
        if (!id) {
            return res.status(404).send({
                message: `User not found with id ${id}`
            });
        }
        res.send(id);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'User not found'
            });
        }
        return res.status(404).send({
            message: 'Error retrieving user'
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: 'user content can not be empty'
        });
    }

    // Find user and update it with the request body
    Users.findOneAndUpdate({
        'id': req.params.userId,
        'isValid': true
    }, req.body, { new: true, runValidators: true }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: 'user not found with id ' + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'user not found with id ' + req.params.userId
            });
        }
        return res.status(500).send({
            message: 'Error updating user with id ' + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    Users.findOneAndUpdate({
        'id': req.params.userId
    }, { isValid: false }, { new: true, runValidators: true }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: 'User not found with id ' + req.params.userId
            });
        }
        res.send({ message: 'User deleted successfully!' });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: 'User not found with id ' + req.params.userId
            });
        }
        return res.status(500).send({
            message: 'Could not delete User with id ' + req.params.userId
        });
    });
};