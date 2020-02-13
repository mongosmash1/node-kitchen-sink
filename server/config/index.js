const logger = require('./logger.config.js');
const mongodbConfig = require('./mongodb.config.js');
const statusMonitorConfig = require('./monitor.config.js');

module.exports = { logger, mongodbConfig, statusMonitorConfig };
