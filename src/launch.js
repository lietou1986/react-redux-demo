'use strict';

/**
 * 系统启动时执行的操作
 */
exports.boot = function () {

    //初始化全局变量
    global.isDebug = process.env.NODE_ENV !== "production"; //判断环境模式
    global.appSettings = require("./config/" + process.env.NODE_ENV + "/appsettings.json"); //根据环境加载配置文件
    global.Promise = require('bluebird');
    global.cache = require('memory-cache');
    global.logger = require('./utils/logger');
    global.tools = require('./utils/tools');
}