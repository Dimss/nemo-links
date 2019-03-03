const linkController = require('../controller/linkController');
const systemController = require('../controller/systemController');
const middleware = require('../common/middlewares');

module.exports = function (router) {
  	router.route('/v1/system/info').get(systemController.getInfo);
	// Users routes and middleware
	router.route('/v1/links').post(middleware.authMiddleware, linkController.addLink);
	router.route('/v1/links').get(middleware.authMiddleware, linkController.getUserLinks);
	router.route('/v1/links/:id').delete(middleware.authMiddleware, linkController.deleteLink);

};
