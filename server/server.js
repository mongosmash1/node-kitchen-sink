const http = require('http');
require('dotenv-safe').config();
const { logger } = require('./middleware');

logger.info('starting server...');
const serverStartedTime = new Date();

const app = require('./app');

const server = http.createServer(app);
const port = process.env.PORT || 5000;

// starts the server once all DBs
app.on('mongodbReady', () => {
	server.listen(port, () => {
		const serverLoadedTime = new Date();
		const serverTimeToLoad = serverLoadedTime - serverStartedTime;
		logger.info(
			`Express server listening on port ${port} in ${app.settings.env} mode...total time to load ${serverTimeToLoad}ms`
		);
	});
});
