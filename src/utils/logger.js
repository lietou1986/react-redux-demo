'use strict';

var log4js = require('log4js');
log4js.configure('./config/log4js.json')

var logger = log4js.getLogger('log');
logger.setLevel('DEBUG')

module.exports = logger;
