const user = process.env.MONGODB_USER;
const pass = process.env.MONGODB_PASS;
const host = process.env.MONGODB_URL;
const port = process.env.MONGODB_PORT;
const db = process.env.MONGODB_DB;

module.exports = {
	db,
	uri: `mongodb://${user}:${pass}@${host}:${port}/${db}`,
	options: {
		useNewUrlParser: true, // to avoid deprecation warnings
		useCreateIndex: true, // to avoid deprecation warnings
		useUnifiedTopology: true, // use new MongoDB driver new connection management engine
		poolSize: 10, // number of connections in the pool
		authSource: 'admin',
	},
};
