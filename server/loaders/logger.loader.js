const nanoid = require('nanoid');
const morgan = require('morgan');

const { logger } = require('../config');

module.exports = app => {
	logger.verbose('💼  enabling logging...');
	// generate unique uuid and assign to request object
	app.use((req, res, next) => {
		req.id = nanoid();
		next();
	});

	// custom morgan token for req header id
	morgan.token('id', req => req.id);

	// custom morgan req/res format
	const loggerReqFormat = ':id ":method :url" :remote-addr';
	const loggerResFormat = ':id ":method :url" :status :response-time';

	// stream all requests to logger at info level
	app.use(
		morgan(loggerReqFormat, {
			immediate: true,
			stream: logger.streamHttp,
		})
	);

	// stream all error responses to logger at error level
	app.use(
		morgan(loggerResFormat, {
			skip: (req, res) => res.statusCode < 400,
			stream: logger.streamErr,
		})
	);

	// stream all error success responses to logger at info level
	app.use(
		morgan(loggerResFormat, {
			skip: (req, res) => res.statusCode >= 400,
			stream: logger.streamHttp,
		})
	);

	logger.verbose('💼  logging enabled...');

	return app;
};
