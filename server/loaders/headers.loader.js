const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const { logger } = require('../config');

module.exports = app => {
	// log loading and add timestamp
	logger.info('setting http headers...');
	const httpSecurityLoaderStartedTime = new Date();

	// mask details about application stack
	app.disable('x-powered-by');

	// secure http headers
	app.use(helmet());

	// enable cors on all routes
	app.use(cors());

	// res compression
	app.use(compression());

	// log loading complete with time differential
	const httpSecurityLoaderLoadedTime = new Date();
	const httpSecurityLoaderTimeToLoad =
		httpSecurityLoaderLoadedTime - httpSecurityLoaderStartedTime;
	logger.info(`http headers set...time to load ${httpSecurityLoaderTimeToLoad}ms`);

	// pass app back to express
	return app;
};
