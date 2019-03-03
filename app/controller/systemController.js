const appError = require("../common/appErrors").appError;
const jwt = require("jsonwebtoken");
const log = require("../common/logger").logger;
const conf = require("../configs/conf").conf;
const Link = require("../model/link");
const MongoClient = require("mongodb").MongoClient;
const os = require("os");

exports.getInfo = function(req, res, next) {
  log.info(req.body);
  res.payload = {
    version: "0.2",
    hostname: os.hostname()
  }
  next();
};
