const mongoose = require('mongoose');
const validate = require('mongoose-validator');


const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Name should contain alpha-numeric characters only',
    }),
];

const phoneValidator = [
    validate({
        validator: 'matches',
        arguments: ['(0|91)?[789][0-9]{9}', 'i'],
        message: 'Invalid Phone Number'
    })
];

const emailValidator = [
    validate({
        validator: 'matches',
        arguments: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        message: 'Invalid Email'
    })
];

const passwordValidator = [
    validate({
        validator: 'matches',
        arguments: ['[a-zA-Z][a-zA-Z0-9\\s-/]*', 'i'],
        message: 'Password did not falls in basic criteria' 
    })
]

const Schema = mongoose.Schema;

const users = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        validate: phoneValidator
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: emailValidator
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidator
    },
    firstName: {
        type: String,
        required: true,
        validate: nameValidator
    },
    lastName: {
        type: String,
        required: true,
        validate: nameValidator
    },
    middleName: String,
    verificationCode: String,
    isActive: {
        type: Boolean,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true
    },
    isReported: Boolean,
    isBlocked: Boolean,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('users', users);