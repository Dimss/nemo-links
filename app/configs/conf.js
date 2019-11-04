const devConf = {
    db: "mongodb://localhost:27017/links",
    listenPort: 3001,
    jwtSecret: 'secret',

};

const prodConf = {
    db: `mongodb://${env.MONGODB_USER}:${evn.MONGODB_PASSWORD}@mongo-links:27017/${MONGODB_DATABASE}`,
    listenPort: 8080,
    jwtSecret: 'secret',
};
exports.conf = devConf;
if (process.env.PROFILE && process.env.PROFILE === "PROD") exports.conf = prodConf;