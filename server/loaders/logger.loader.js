const nanoid = require('nanoid');
const morgan = require('morgan');

const { logger } = require('../config');

module.exports = app => {
	// log loading and add timestamp
	logger.info('enabling logging...');
	const loggerLoaderStartedTime = new Date();

	// generate unique uuid and assign to request object
	app.use((req, res, next) => {
		req.id = nanoid();
		next();
	});

	// add token to morgan for req header id
	morgan.token('id', req => req.id);

	// custom morgan req format, more verbose for production
	const loggerReqFormat =
		process.env.NODE_ENV !== 'production'
			? `:id ":method :url" :remote-addr`
			: `:id ":method :url" HTTP/:http-version :res[content-length] ":referrer" ":user-agent" :remote-addr`;

	// customer morgan res format
	const loggerResFormat = `:id ":method :url" :status :response-time ms`;

	// stream all requests to logger combined log
	app.use(
		morgan(loggerReqFormat, {
			immediate: true,
			stream: logger.streamHttp,
		})
	);

	// stream all error responses to logger error log
	app.use(
		morgan(loggerResFormat, {
			skip: (req, res) => res.statusCode < 400,
			stream: logger.streamErr,
		})
	);

	// stream all success responses to logger combined log
	app.use(
		morgan(loggerResFormat, {
			skip: (req, res) => res.statusCode >= 400,
			stream: logger.streamHttp,
		})
	);

	// log loading complete with time differential
	const loggerLoaderLoadedTime = new Date();
	const loggerLoaderTimeToLoad = loggerLoaderLoadedTime - loggerLoaderStartedTime;
	logger.info(`logging enabled...time to load ${loggerLoaderTimeToLoad}ms`);

	// pass app back to express
	return app;
};
