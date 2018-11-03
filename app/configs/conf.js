
const devConf = {
	listenPort: 3001,
	jwtSecret: 'secret',

};

const prodConf = {
	listenPort: 8080,
	jwtSecret: 'secret',
};
exports.conf = devConf;
if (process.env.PROFILE && process.env.PROFILE === "PROD") exports.conf = prodConf;