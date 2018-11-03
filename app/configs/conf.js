
const devConf = {
	db: "mongodb://localhost:27017/links",
	listenPort: 3001,
	jwtSecret: 'secret',

};

const prodConf = {
	db: "mongodb://mongo-links:27017/links",
	listenPort: 8080,
	jwtSecret: 'secret',
};
exports.conf = devConf;
if (process.env.PROFILE && process.env.PROFILE === "PROD") exports.conf = prodConf;