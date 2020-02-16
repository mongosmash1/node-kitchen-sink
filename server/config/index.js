const authnConfig = require('./authn.config.js');
const logger = require('./logger.config.js');
const mongodbConfig = require('./mongodb.config.js');
const statusMonitorConfig = require('./monitor.config.js');

module.exports = { authnConfig, logger, mongodbConfig, statusMonitorConfig };
