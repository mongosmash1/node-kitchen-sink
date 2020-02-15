const authenticationLoader = require('./authn.loader.js');
const headersLoader = require('./headers.loader.js');
const loggerLoader = require('./logger.loader.js');
const mongodbLoader = require('./mongodb.loader.js');

module.exports = { authenticationLoader, headersLoader, loggerLoader, mongodbLoader };
