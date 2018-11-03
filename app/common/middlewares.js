

const appErrors = require('./appErrors');
const log = require('./logger').logger;
const jwt = require('jsonwebtoken');
const conf = require('../configs/conf').conf;
const uuidv1 = require('uuid/v1');

exports.responseSenderMiddleware = function (req, res, next) {
	/*
		This is default JSON response, only the data object is changed
		depending on controller needs. The data passed to this middleware by res.payload object
	 */
	let resPayload = {
		status: "ok",
		message: "Successfully done",
		data: res.payload
	};
	res.send(resPayload);
};

exports.requestInitializerMiddleware = function (req, res, next) {
	/*
	This is a request initializer which is responsible to setup
	all request context based variables, for logging,
	create empty payload object, etc...
	 */
	// Set log context
	log.addContext('user', '-');
	log.addContext('path', req.originalUrl);
	log.addContext('clientIp', req.ip);
	log.addContext('rid', uuidv1().split("-")[0]);
	// Create empty response payload
	res.payload = {};
	next();
};

exports.errorHandlerMiddleware = function (err, req, res, next) {
	/*
	Default error handler middleware
	 */
	log.error(err.message);
	// Check if error is actually a custom Kidi  error defined in ./appErrors.js
	if (err.hasOwnProperty('linkCustomError')) {
		let payload = {
			status: 'error',
			message: err.message,
			data: err.data
		};
		res.status(err.httpErrorCode).send(payload);
	}
	else {
		log.error(err.stack);
		res.status(500).send({status: 'error', message: 'error'})
	}

};

exports.authMiddleware = function (req, res, next) {
    if (!req.headers.hasOwnProperty('x-nemo-auth')) {
        log.error(`Access to private resource without X-NEMO-AUTH header.`);
        next(appErrors.appError('Access forbidden', 401));
        return;
    }
    let token = req.headers["x-nemo-auth"];
    jwt.verify(token, conf.jwtSecret, (err, userIdentity)=> {
        if (err) {
            log.error("Not valid token, err: " + err);
            next(appErrors.appError('Access forbidden', 401));
            return;
        }
        else {
            req.userIdentity = userIdentity;
            next()
        }
    });
};
