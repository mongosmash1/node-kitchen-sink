const { addColors, createLogger, format, transports } = require('winston');

const { combine, colorize, json, timestamp, padLevels, printf } = format;

// log file locations
const combinedLogFilePath = './logs/combined.log';
const errorLogFilePath = './logs/error.log';

const noJSONFormat = () => printf(info => `${info.timestamp} ${info.level}: ${info.message}`);

// custom colors
const customLevelsFormat = {
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		verbose: 4,
		debug: 5,
	},
	colors: {
		error: 'italic red',
		warn: 'italic yellow',
		info: 'italic green',
		http: 'italic magenta',
		verbose: 'italic cyan',
		debug: 'italic blue',
	},
};

// define the custom settings for each transport (file, console)
const options = {
	logFile: {
		level: 'verbose',
		filename: combinedLogFilePath,
		handleExceptions: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		format: combine(timestamp(), json()),
	},
	errorFile: {
		level: 'error',
		filename: errorLogFilePath,
		handleExceptions: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		format: combine(timestamp(), json()),
	},
	console: {
		level: 'debug',
		stderrLevels: ['error'],
		consoleWarnLevels: ['warn'],
		handleExceptions: true,
		format: combine(colorize(), timestamp(), padLevels(), noJSONFormat()),
	},
};

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
	levels: customLevelsFormat.levels,
	transports: [new transports.File(options.logFile), new transports.File(options.errorFile)],
	exitOnError: false, // do not exit on handled exceptions
});

// only log to console in development
if (process.env.NODE_ENV !== 'production') {
	logger.add(new transports.Console(options.console));
}

// apply custom colors
addColors(customLevelsFormat.colors);

// create a stream object with a 'write' function that will be used by `morgan`
logger.streamHttp = {
	write: message => {
		// logs 'morgan' output at 'info' level, removes trailing '\n' character that morgan adds
		logger.http(message.substring(0, message.lastIndexOf('\n')));
	},
};

logger.streamErr = {
	write: message => {
		// logs 'morgan' output at 'info' level, removes trailing '\n' character that morgan adds
		logger.error(message.substring(0, message.lastIndexOf('\n')));
	},
};

module.exports = logger;
