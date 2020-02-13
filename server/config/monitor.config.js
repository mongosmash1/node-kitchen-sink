module.exports = {
	monitorOptions: {
		title: 'Express Status', // Default title
		theme: 'default.css', // Default styles
		path: '/status',
		// socketPath: '/socket.io',
		// websocket: existingSocketIoInstance,
		spans: [
			{
				interval: 1, // Every second
				retention: 60, // Keep 60 datapoints in memory
			},
			{
				interval: 5, // Every 5 seconds
				retention: 60,
			},
			{
				interval: 15, // Every 15 seconds
				retention: 60,
			},
		],
		chartVisibility: {
			cpu: true,
			mem: true,
			load: true,
			responseTime: true,
			rps: true,
			statusCodes: true,
		},
		healthChecks: [
			{
				// REST API endpoint
				protocol: 'http',
				host: 'localhost',
				path: '/api',
				port: '5000',
			},
			{
				// GraphQL API endpoint
				protocol: 'http',
				host: 'localhost',
				path: '/graphql',
				port: '5000',
			},

			{
				// React endpoint
				protocol: 'http',
				host: 'localhost',
				path: '/',
				port: '3000',
			},
		],
		ignoreStartsWith: '/admin',
	},
};
