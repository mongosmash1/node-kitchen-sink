const express = require('express');

const { loggerLoader } = require('./loaders');

const app = express();

// load morgan and winston
loggerLoader(app);

// test route
app.get('/*', (req, res) => res.send('Hello World'));

module.exports = app;
