const express = require('express');
const { logger } = require('./config');
const { loggerLoader } = require('./loaders');

// log startup and add timestamp
logger.info('starting express...');
const expressStartedTime = new Date();

// instantiate express
const app = express();

// load morgan and winston
loggerLoader(app);

// test route
app.get('/*', (req, res) => res.send('Hello World'));

// log startup complete with time differential
const expressLoadedTime = new Date();
const expressTimeToLoad = expressLoadedTime - expressStartedTime;
logger.info(`express started...time to load ${expressTimeToLoad}ms`);

module.exports = app;
