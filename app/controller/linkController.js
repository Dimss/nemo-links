const appError = require("../common/appErrors").appError;
const jwt = require("jsonwebtoken");
const log = require("../common/logger").logger;
const conf = require("../configs/conf").conf;
const Link = require("../model/link");
const MongoClient = require("mongodb").MongoClient;

exports.addLink = function(req, res, next) {
  log.info(req.body);
  let link = new Link({
    userId: req.userIdentity.sub,
    link: req.body.link,
    title: req.body.title
  });

  link.save(function(err) {
    if (err) {
      log.error(err);
      next(appError("Unabel create new link", 400));
    }
    res.payload = "New link created successfully";
    next();
  });
};

exports.getUserLinks = function(req, res, next) {
  Link.find({ userId: req.userIdentity.sub }, "link title", (err, docs) => {
    if (err) {
      next(appError("Unabel create new link", 400));
    } else {
      res.payload = docs;
      next();
    }
  });
};

exports.deleteLink = function(req, res, next) {
  Link.findByIdAndDelete(req.params.id, err => {
    if (err) next(appError("Unabel delete link", 400));
    else next();
  });
};
