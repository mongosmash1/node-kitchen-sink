const express = require('express');
const statusMonitor = require('express-status-monitor');

const { logger } = require('./config');
const { authenticationLoader, headersLoader, loggerLoader, mongodbLoader } = require('./loaders');
const { statusMonitorConfig } = require('./config');

// log startup and add timestamp
logger.info('starting express...');
const expressStartedTime = new Date();

// instantiate express
const app = express();

// status monitor dashboard (served at /status)
app.use(statusMonitor(statusMonitorConfig));

// load morgan and winston
loggerLoader(app);

// load http header security options
headersLoader(app);

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Promise.all([mongodbLoader.initMongodb(app)]);

// authenticationLoader(app);

// status monitor dashboard route
// need to secure this route
app.get('/status', statusMonitor);

// test route
app.get('/*', (req, res) => {res.send('Hello World')});

// log startup complete with time differential
const expressLoadedTime = new Date();
const expressTimeToLoad = expressLoadedTime - expressStartedTime;
logger.info(`express started...time to load ${expressTimeToLoad}ms`);

module.exports = app;
