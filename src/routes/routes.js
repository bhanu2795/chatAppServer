const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const convoController = require('../controllers/convo.controller');
const msgController = require('../controllers/message.controller');

router.get('/health', (req, res) => {
    const responseObject = {
        status: 'UP'
    }
    res.json(responseObject);
});

// Router for Users
router.post('/user', (req, res) => {
    userController.create(req, res);
});

router.get('/user', (req, res) => {
    userController.findAll(req, res);
});

router.get('/user/:userId', (req, res) => {
    userController.findOne(req, res);
});

router.put('/user/:userId', (req, res) => {
    userController.update(req, res);
});

router.delete('/user/:userId', (req, res) => {
    userController.delete(req, res);
});


// Router for Conversations
router.post('/user/:userId/convo', (req, res) => {
    convoController.create(req, res);
});

router.get('/user/:userId/convo', (req, res) => {
    convoController.findAll(req, res);
});

router.delete('/user/:userId/convo', (req, res) => {
    convoController.delete(req, res);
});


// Router for Conversations Messages
router.post('/user/:userId/convo/:convoId', (req, res) => {
    msgController.send(req, res);
});

module.exports = router;