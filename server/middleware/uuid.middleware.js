const { createNamespace } = require('cls-hooked');
const nanoid = require('nanoid');

// create unique namespace
const nsid = `expressReq:${nanoid()}`;
const ns = createNamespace(nsid);

module.exports = {
	setId: ({ useHeader = false, headerName = 'X-Request-Id' } = {}) => (req, res, next) => {
		let requestId;
		if (useHeader) {
			requestId = req.headers[headerName.toLowerCase()];
		}
		// generate a unique request ID if header option is not present
		requestId = requestId || nanoid();
		// // set request ID for Morgan
		// req.id = requestId;
		// set request ID namespace for CLS
		ns.bindEmitter(req);
		ns.bindEmitter(res);
		ns.run(() => {
			ns.set('requestId', requestId);
			next();
		});
	},

	getId: () => ns.get('requestId'),
};
