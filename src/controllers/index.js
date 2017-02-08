'use strict';

const path = require('path');
const menuJson = require('../appdata/menu.json');
var Cookier = require('../utils/cookier');

exports.index = function (req, res) {

    res.sendFile(path.resolve(__dirname, '..', 'index.html'))
};

exports.login = function (req, res) {
    var result = {
        message: 'ok',
        ok: true
    }
    const data = req.body;
    try {

        if (data.user !== 'admin' || data.password !== '123456')
            throw '用户名或密码错误';

        var cookier = new Cookier(req, res);
        cookier.set(appSettings.cookies.uid, 1, 30, false);
        result.data = {
            'user': data.user,
            'role': 'ADMIN',
            'uid': 1
        };

    } catch (ex) {
        result.ok = false;
        result.message = ex.message;
    }
    res.status(result.ok ? '200' : '500').json(result);
};


exports.menu = function (req, res) {
    res.json(menuJson);
};

exports.my = function (req, res) {
    res.json({
        'user': 'admin',
        'role': 'ADMIN',
        'uid': 1
    });
};

exports.logout = function (req, res) {
    var result = {
        message: 'ok',
        ok: true
    }

    var cookier = new Cookier(req, res);
    cookier.delete(appSettings.cookies.uid);
    res.json(result);
};