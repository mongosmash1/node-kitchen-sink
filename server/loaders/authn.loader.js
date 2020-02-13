const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const { logger } = require('../config');
// const passport = require("./server/passport");
// const { passport } = require('./server/middleware');
const { sessionsConfig } = require('../config');

module.exports = (app, mongodb) => {
	// log loading and add timestamp
	logger.info('setting sessions and authentication...');
	const authnLoaderStartedTime = new Date();

	// session config and open connection to Mongodb
	app.use(session(sessionsConfig(MongoStore, mongodb), (req, res, next) => next()));

	// log loading complete with time differential
	const authnLoaderLoadedTime = new Date();
	const authnLoaderTimeToLoad = authnLoaderLoadedTime - authnLoaderStartedTime;
	logger.info(`sessions and authentication set...time to load ${authnLoaderTimeToLoad}ms`);

	// pass app back to express
	return app;
};
