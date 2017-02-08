'use strict';

var moment = require('moment');
var uuid = require('node-uuid');
var request = require('request');
var validator = require('validator');
var utility = require('utility');
var util = require('util');

moment.locale('zh-cn'); // 使用中文

// 格式化时间
exports.dateFormat = function (date, friendly, format) {
  date = moment(date);

  if (friendly) {
    return date.fromNow();
  } else {
    if (format)
      return date.format(format);
    return date.format('YYYY-MM-DD HH:mm:ss');
  }
};


String.prototype.dateFormat = function (friendly, format) {
  return exports.dateFormat(this, friendly, format);
}

exports.debug = function (input) {
  console.log(input);
}

/**
 * 数据类型转换
 */
exports.convert = function (data, t) {
  try {
    if (!data) return t;

    switch (typeof t) {
      case 'number': {
        var result = Number(data);
        return isNaN(result) ? t : result;
      }
      case 'boolean':
        return Boolean(data);

      case 'string':
        return exports.trim(data);

      default:
        if (exports.util.isArray(data) && data.length > 0) {
          return data[0];
        }
        return data.toString();
    }
  }
  catch (ex) {
    return t;
  }
}

exports.validator = validator;

/**
 * 导入工具集
 */
exports.utils = utility;

/**
 * 导入基础工具集
 */
exports.util = util;

/**
 * 替换特殊字符
 */
exports.replaceSpecialChar = function (input) {
  var specialChar = ["(", ')', '/', '<', '>', '{', '}', '-', '+', '^', '\\', '*', '~', '&', '!', ',', '|', '?', '[', ']', '\''];
  specialChar.forEach((char) => {
    input = input.replace(new RegExp('[/' + char + '/]', 'gm'), '\\' + char);
  });
  return input;
}


String.prototype.replaceSpecialChar = function () {
  return exports.replaceSpecialChar(this);
}

/**
 * 生成随机整数
 */
exports.random = function (min, max) {
  var range = max - min;
  var rand = Math.random();
  return (min + Math.round(rand * range));
}

/**
 * 字符串截取
 */
exports.subString = function (input, length, placeholder) {
  if (exports.isNullOrEmpty(input) || input.length <= length) {
    return input;
  }
  return input.substring(0, length) + placeholder;
}

String.prototype.subString = function (length, placeholder) {
  return exports.subString(this, length, placeholder);
}

exports.trim = function (input) {
  return input.replace(/(^\s*)|(\s*$)/g, '');
};

String.prototype.trim = function () {
  return exports.trim(this);
}

exports.isNullOrEmpty = function (obj) {
  var flag = false;
  if (obj == null || obj == undefined || typeof (obj) == 'undefined' || obj == '') {
    flag = true;
  } else if (typeof (obj) == 'string') {
    obj = exports.trim(obj);
    if (obj == '') {//为空  
      flag = true;
    } else {//不为空  
      obj = obj.toUpperCase();
      if (obj == 'NULL' || obj == 'UNDEFINED' || obj == '{}') {
        flag = true;
      }
    }
  }
  else {
    flag = false;
  }
  return flag;
};

String.prototype.isNullOrEmpty = function () {
  return exports.isNullOrEmpty(this);
}

exports.isNotNullOrEmpty = function (obj) {
  return !exports.isNullOrEmpty(obj);
};

String.prototype.isNotNullOrEmpty = function () {
  return exports.isNotNullOrEmpty(this);
}

exports.md5 = function (input) {
  return new Buffer(utility.md5(input)).slice(16);
}

String.prototype.md5 = function () {
  return exports.md5(this);
}

exports.guid = function () {
  return uuid.v1();//基于时间戳
  //return uuid.v4(); //随机
}

exports.replaceAll = function (input, find, replace) {
  return input.replace(new RegExp(find, 'gm'), replace);
}

String.prototype.replaceAll = function (find, replace) {
  return exports.replaceAll(this, find, replace);
}

/**
 * 字符串高亮
 */
exports.highlighting = function (input, keyword, safeKeyWords) {

  if (exports.isNullOrEmpty(input) || exports.isNullOrEmpty(keyword)) return input;
  if (!safeKeyWords) safeKeyWords = keyword;
  var isHasSpecialChar = keyword != safeKeyWords;

  var matched = input.match(new RegExp(safeKeyWords, 'gmi'));
  if (!matched) return input;

  matched.forEach(function (m) {
    input = input.replace(new RegExp(isHasSpecialChar ? m.replaceSpecialChar() : m, 'gm'), exports.util.format('<b>%s</b>', m));
  });

  return input;
}

String.prototype.highlighting = function (keyword) {
  return exports.highlighting(this, keyword);
}

exports.sort = function (array, sortBy) {
  sortBy = sortBy || 'desc';
  if (array.length == 0) return [];

  var left = [];
  var right = []
  var pivot = array[0];

  if (sortBy === 'asc') {//升序
    for (var i = 1; i < array.length; i++) {
      array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }
  } else {//降序
    for (var i = 1; i < array.length; i++) {
      array[i] > pivot ? left.push(array[i]) : right.push(array[i]);
    }
  }
  return exports.sort(left, sortBy).concat(pivot, exports.sort(right, sortBy));
}

exports.sortObj = function (array, key, sortBy) {
  key = key || 'id';
  sortBy = sortBy || 'desc';
  if (array.length == 0) return [];

  var left = [];
  var right = [];
  var pivot = array[0][key];//分割值
  var pivotObj = array[0];//存储值

  if (sortBy === 'asc') {//升序
    for (var i = 1; i < array.length; i++) {
      array[i][key] < pivot ? left.push(array[i]) : right.push(array[i]);
    }
  } else {//降序
    for (var i = 1; i < array.length; i++) {
      array[i][key] > pivot ? left.push(array[i]) : right.push(array[i]);
    }
  }
  return exports.sortObj(left, key, sortBy).concat(pivotObj, exports.sortObj(right, key, sortBy));
}

/**
 * 请求远程url
 */
exports.request = function (uri) {
  return new Promise((resolve, reject) => {
    request(uri, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body);
      }
      else {
        logger.error("api request error", uri, error);
        resolve(null);
      }
    });
  });
}

exports.requestJson = function (uri) {
  return new Promise((resolve, reject) => {
    request(uri, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      }
      else {
        logger.error("api request error", uri, error);
        resolve(null);
      }
    });
  });
}

String.prototype.padLeft = function (total, char) {
  if (char != null) {
    return this.padHelper(total, char, false);
  } else {
    return this.padHelper(total, ' ', false);
  }
}

String.prototype.padRight = function (total, char) {
  if (char != null) {
    return this.padHelper(total, char, true);
  } else {
    return this.padHelper(total, ' ', true);
  }

}

String.prototype.padHelper = function (total, char, isRightpadded) {

  if (this.length < total) {
    var paddingString = new String();
    for (var i = 1; i <= (total - this.length); i++) {
      paddingString += char;
    }

    if (isRightpadded) {
      return (this + paddingString);
    } else {
      return (paddingString + this);
    }
  } else {
    return this;
  }
}