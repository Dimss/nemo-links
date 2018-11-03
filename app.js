const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/route/route');
const middlewares = require('./app/common/middlewares');
const log = require('./app/common/logger').logger;
const conf = require('./app/configs/conf').conf;
const app = express();
const router = express.Router();
const mongoose = require('mongoose');



mongoose.connect("mongodb://localhost:27017/links");
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(middlewares.requestInitializerMiddleware);
app.use(bodyParser.json());
routes(router);
app.use('/', router);
// Default handler to send JSON responses to the client
app.use(middlewares.responseSenderMiddleware);
// Default error handler
app.use(middlewares.errorHandlerMiddleware);
app.listen(conf.listenPort, '0.0.0.0', () => log.info(`Kidi API listening on port ${conf.listenPort}`));
log.info(`Runtime profile: ${process.env.PROFILE}`);