const express = require('express');
const mongoose = require('mongoose');
const http = require('http');

const bodyParser = require('body-parser');
const config = require('./config/config');
const routes = require('./src/routes/routes');
mongoose.Promise = global.Promise;

const app = express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, x-access-token')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.set('url', config.baseUrl);
app.use('/api/v1/chat', routes);

//connect mongo db database
mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('\x1b[36m%s\x1b[0m', 'connection successfully!');
}).catch(err => {
    console.log('\x1b[36m%s\x1b[0m', 'Could not connect to the database. Exiting now...', err);
    process.exit();
});

//Port to access the api
http.createServer(app).listen(config.PORT, function () {
    console.clear();
    console.log('Application listing on port', config.PORT);
});

module.exports = app;
