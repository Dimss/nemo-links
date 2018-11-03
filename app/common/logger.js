const log4js = require('log4js');
log4js.configure({
	appenders: {
		out: {
			type: 'stdout', layout: {
				type: 'pattern',
				pattern: '[%d] [%[%p%]] [%X{path}] [%X{user}:%X{clientIp}:%X{rid}] %m%n',
			}
		}
	},
	categories: {default: {appenders: ['out'], level: 'info'}}
});
const logger = log4js.getLogger();
logger.level = 'debug';

exports.logger = logger;