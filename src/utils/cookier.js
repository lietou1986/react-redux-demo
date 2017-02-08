var Cookies = require("cookies");
var moment = require('moment');
moment.locale('zh-cn'); // 使用中文

function Cookier(req, res) {

    var cookies = new Cookies(req, res);

    this.get = function (name) {
        var value = cookies.get(name);
        if (value) {
            return decodeURIComponent(value);
        }
        return null;
    }

    this.getWithType = function (name, t) {
        var value = cookies.get(name);
        if (value) {
            return tools.convert(decodeURIComponent(value), t);
        }
        return t;
    }

    this.set = function (name, value, expireDays, httpOnly) {
        httpOnly = typeof httpOnly === 'boolean' ? httpOnly : true;
        cookies.set(name, encodeURIComponent(value), {
            expires: moment().add(expireDays, 'days').toDate(),
            overwrite: true,
            httpOnly
        });
    }

    this.setWithDomain = function (name, value, domain, expireDays, httpOnly) {
        httpOnly = typeof httpOnly === 'boolean' ? httpOnly : true;
        cookies.set(name, encodeURIComponent(value), {
            domain: domain,
            expires: moment().add(expireDays, 'days').toDate(),
            overwrite: true,
            httpOnly
        });
    }

    this.setWithOptions = function (name, value, options) {

        cookies.set(name, encodeURIComponent(value), options);
    }

    this.clear = function () {

    }

    this.delete = function (name) {
        cookies.set(name, '', {
            expires: moment().add(-1, 'days').toDate()
        });
    }
}

module.exports = Cookier;