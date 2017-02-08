'use strict';
const monitorJson = require('../../appdata/monitor.json');

/**
 * 服务器监控
 */
exports.index = function(req, res) {

    var result = {
        message: 'ok',
        ok: true
    }

    const data = req.body;


    try {

        //获取数据

    } catch (ex) {
        result.ok = false;
        result.message = ex.message;
    }

    monitorJson.result = result;
    res.status(result.ok ? '200' : '500').json(monitorJson);
};

/**
 * 服务器状态探测
 */
exports.ping = function(req, res) {

    var result = {
        message: 'ok',
        ok: true
    }

    const data = req.body;

    let url = data.url;
    let field = data.field;
    let ip = data.ip;

    try {

        //获取数据

    } catch (ex) {
        result.ok = false;
        result.message = ex.message;
    }

    res.status(result.ok ? '200' : '500').json(result);
};



/**
 * redis管理
 */
exports.redis = function(req, res) {

    var result = {
        message: 'ok',
        ok: true
    }

    const data = req.body;


    try {

        //获取数据

    } catch (ex) {
        result.ok = false;
        result.message = ex.message;
    }

    res.status(result.ok ? '200' : '500').json(result);
};
