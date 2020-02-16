const mongoose = require('mongoose');
const { logger } = require('../middleware');
const { mongodbConfig } = require('../config');

const { db, uri, options } = mongodbConfig;

let mongodbConnection;

mongoose.connection.on('connecting', () => logger.verbose(`Connecting to mongoDB - ${db}`));
mongoose.connection.on('connected', () => logger.verbose(`Connected to mongoDB - ${db}`));
mongoose.connection.on('error', err => logger.error(err));
mongoose.connection.on('disconnecting', () => logger.verbose(`Disconnecting from mongoDB - ${db}`));
mongoose.connection.on('disconnected', () => logger.verbose(`Disconnected from mongoDB - ${db}`));

const initMongodb = async app => {
	// if already connected, return connection
	if (mongodbConnection) {
		return;
	}
	try {
		// log loading and add timestamp
		logger.info(`loading mongoDB...`);
		const mongodbLoaderStartedTime = new Date();

		// connect to database and set connection object
		await mongoose.connect(uri, options);
		mongodbConnection = await mongoose.connection;
		if (mongodbConnection) {
			app.emit('mongodbReady');
		}

		// log loading complete with time differential
		const mongodbLoaderLoadedTime = new Date();
		const mongodbLoaderTimeToLoad = mongodbLoaderLoadedTime - mongodbLoaderStartedTime;
		logger.info(`mongoDB loaded...time to load ${mongodbLoaderTimeToLoad}ms`);
	} catch (err) {
		logger.error(err);
		process.exit(1); // Non-zero failure code
	}
};

const closeMongodb = async err => {
	try {
		logger.info('Closing mongodb modules');
		await mongoose.connection.close();
	} catch (e) {
		logger.error(e);
	} finally {
		if (err) {
			process.exit(1); // Non-zero failure code
		} else {
			process.exit(0);
		}
	}
};

const getMongodbConnection = () => mongodbConnection;

module.exports = {
	closeMongodb,
	initMongodb,
	getMongodbConnection,
};
