const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const { authn, logger } = require('../middleware');
const { authnConfig } = require('../config');
const { getMongodbConnection } = require('./mongodb.loader.js');

module.exports = app => {
	// log loading and add timestamp
	logger.info('setting sessions and authentication...');
	const authnLoaderStartedTime = new Date();

	// once mongoDB is loaded, set session config
	app.on('mongodbReady', () => {
		// add mongo store to session config
		authnConfig.store = new MongoStore({ mongooseConnection: getMongodbConnection() });
		// if (app.get('env') === 'production') {
		// 	app.set('trust proxy', 1); // trust first proxy
		// 	authnConfig.cookie.secure = true; // serve secure cookies
		// }
		app.use(session(authnConfig), (req, res, next) => next());

		// Passport
		app.use(authn.initialize());
		app.use(authn.session());

		// log loading complete with time differential
		const authnLoaderLoadedTime = new Date();
		const authnLoaderTimeToLoad = authnLoaderLoadedTime - authnLoaderStartedTime;
		logger.info(`sessions and authentication set...time to load ${authnLoaderTimeToLoad}ms`);

		// pass app back to express
		return app;
	});
};
