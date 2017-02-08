'use strict';
const dmJson = require('../../appdata/dm.json');
/**
 * 到面管理
 */
exports.index = function(req, res) {

    var result = {
        message: 'ok',
        ok: true
    }

    const data = req.body;

    let page = data.page || 1;
    let pageSize = data.pageSize || 10;
    let positionId = data.positionId || '';
    let positionName = data.positionName || '';
    let exclude = data.exclude || true;

    try {

        //获取数据

    } catch (ex) {
        result.ok = false;
        result.message = ex.message;
    }

    dmJson.result = result;
    res.status(result.ok ? '200' : '500').json(dmJson);

};
