const http = require('http');

const app = require('./app');
const { logger } = require('./config');

const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port, () => {
	logger.verbose(`🍻  Express server listening on port ${port} in ${app.settings.env} mode`);
});
