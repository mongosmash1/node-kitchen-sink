const http = require('http');
const { logger } = require('./config');

logger.info('starting server...');
const serverStartedTime = new Date();

const app = require('./app');

const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port, () => {
	const serverLoadedTime = new Date();
	const serverTimeToLoad = serverLoadedTime - serverStartedTime;
	logger.info(
		`Express server listening on port ${port} in ${app.settings.env} mode...total time to load ${serverTimeToLoad}ms`
	);
});
