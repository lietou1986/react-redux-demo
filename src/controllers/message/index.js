'use strict';
var fs = require('fs');
const glzJson = require('../../appdata/glz.json');

/**
 * 橄榄枝消息
 */
exports.index = function (req, res) {

    var result = {
        message: 'ok',
        ok: true
    }

    const data = req.body;

    let page = data.page || 1;
    let pageSize = data.pageSize || 10;
    let date = data.date || '';
    let startTime = data.startTime || '00:00:00';
    let endTime = data.endTime || '23:59:59';
    let topic = data.topic || '*';
    let message = data.message || '';

    try {

        //获取数据

    } catch (ex) {
        result.ok = false;
        result.message = ex.message;
    }

    glzJson.result = result;
    res.status(result.ok ? '200' : '500').json(glzJson);
};

/**
 * 消息发送
 */
exports.send = function (req, res) {

    var result = {
        message: 'ok',
        ok: true
    }

    const data = req.body;

    let type = data.type;
    let message = data.message || '';
    let uploadFile = data.uploadFile || '';

    try {
        if (tools.isNullOrEmpty(type))
            throw '消息类型不能为空';

        if (tools.isNullOrEmpty(message) && tools.isNullOrEmpty(uploadFile))
            throw '请填写消息内容或者上传消息文件';

        if (tools.isNotNullOrEmpty(uploadFile) && !fs.existsSync(uploadFile))
            throw '文件不存在';

        //合并消息
        let messageArr = message.split('\n');
        if (tools.isNotNullOrEmpty(uploadFile)) {
            var fileData = fs.readFileSync(uploadFile, "utf-8");
            messageArr = messageArr.concat(fileData.split('\r\n'));
        }

        for (var v in messageArr) {
            let data = messageArr[v];
            //发送消息
            console.log(data);
        }
        fs.unlinkSync(uploadFile);
        result.message = '已经成功发送消息：' + messageArr.length + '条';
        res.status('200').send(result);
    } catch (ex) {
        result.ok = false;
        result.message = ex.message;
        res.status('500').send(result);
    }
};

/**
 * 重置排队消息
 */
exports.reset = function (req, res) {

    var result = {
        message: 'ok',
        ok: true
    }

    const data = req.body;

    let message = data.message || '';
    let uploadFile = data.uploadFile || '';

    try {

        if (tools.isNullOrEmpty(message))
            throw '请填写数据信息';

        if (tools.isNotNullOrEmpty(uploadFile) && !fs.existsSync(uploadFile))
            throw '消息文件不存在';

        //合并消息
        let messageArr = [];
        if (tools.isNotNullOrEmpty(uploadFile)) {
            var fileData = fs.readFileSync(uploadFile, "utf-8");
            messageArr = messageArr.concat(fileData.split('\r\n'));
        }

        for (var v in messageArr) {
            let data = messageArr[v];
            //发送消息
            console.log(data);
        }
        fs.unlinkSync(uploadFile);
        result.message = '已经成功发送消息：' + messageArr.length + '条';
        res.status('200').send(result);
    } catch (ex) {
        result.ok = false;
        result.message = ex.message;
        res.status('500').send(result);
    }
};