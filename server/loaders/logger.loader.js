const morgan = require('morgan');

const { logger, uuid } = require('../middleware');

module.exports = app => {
	// log loading and add timestamp
	logger.info('enabling logging...');
	const loggerLoaderStartedTime = new Date();

	// assign request ID to request object and bind CLS to req and res objects
	app.use(uuid.setId());

	// add req ID to morgan token
	morgan.token('id', () => uuid.getId());

	// custom morgan req format
	const loggerReqFormat =
		process.env.NODE_ENV !== 'production'
			? `req: ":method :url" :remote-addr`
			: // more verbose for production
			  `req: ":method :url" HTTP/:http-version :res[content-length] ":referrer" ":user-agent" :remote-addr`;

	// customer morgan res format
	const loggerResFormat = `res: ":method :url" :status :response-time ms`;

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
