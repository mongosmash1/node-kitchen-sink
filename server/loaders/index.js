const authenticationLoader = require('./authn.loader.js');
const httpHeadersLoader = require('./httpHeaders.loader.js');
const loggerLoader = require('./logger.loader.js');
const mongodbLoader = require('./mongodb.loader.js');

module.exports = { authenticationLoader, httpHeadersLoader, loggerLoader, mongodbLoader };
