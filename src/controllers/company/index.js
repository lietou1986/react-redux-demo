'use strict';
const companyJson = require('../../appdata/company.json');
const companyCoreJson = require('../../appdata/companycore.json');

/**
 * 企业管理
 */
exports.index = function (req, res) {

    var result = {
        message: 'ok',
        ok: true
    }

    const data = req.body;

    let page = data.page || 1;
    let pageSize = data.pageSize || 10;
    let companyId = data.companyId;
    let solrAddress = data.solrAddress || '';
    let coreName = data.coreName || '';

    try {

        //获取数据

    } catch (ex) {
        result.ok = false;
        result.message = ex.message;
    }

    companyJson.result = result;
    res.status(result.ok ? '200' : '500').json(companyJson);

};


/**
 * 服务器管理
 */
exports.core = function (req, res) {

    var result = {
        message: 'ok',
        ok: true
    }

    const data = req.body;

    let page = data.page || 1;
    let pageSize = data.pageSize || 10;
    let source = data.source;

    try {
        //获取数据
    } catch (ex) {
        result.ok = false;
        result.message = ex.message;
    }

    companyCoreJson.result = result;
    res.status(result.ok ? '200' : '500').json(companyCoreJson);

};


/**
 * 公司路由管理
 */
exports.route = function (req, res) {

    var result = {
        message: 'ok',
        ok: true
    }
    res.status('200').send(result);
};
