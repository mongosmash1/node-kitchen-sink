// sessions *** see documentation for changes once in production
module.exports = function sessionsConfig(Store, db) {
	const config = {
		name: 'NKS_SID', // customer cookie session name to prevent hackers from knowing your session middleware
		secret: process.env.SESSION_SECRET, // pick a random string so generated hash is secure
		cookie: {
			maxAge: 3 * 60 * 60 * 1000, // cookie expiration in milliseconds
			secure: false, // doesn't reject cookie if not using SSL/TLS
			httpOnly: true, // restricts cookie access to protect against XSS
		},
		store: new Store({ mongooseConnection: db }),
		resave: false,
		rolling: true, // resets cookie expiration/maxage countdown on every response
		saveUninitialized: false,
	};
	return config;
};
