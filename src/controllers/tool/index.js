'use strict';

var fs = require('fs');
var path = require('path');

exports.upload = function (req, res) {
    var type = req.param('type') || 'normal';
    var uploadDir = "./assets/upload/" + type + '/';

    //创建目录
    if (!fs.existsSync(uploadDir))
        fs.mkdirSync(uploadDir);

    var inputFile = req.files.file;
    var uploadedPath = inputFile.path;
    var dstPath = uploadDir + tools.guid() + path.extname(inputFile.name);;

    fs.rename(uploadedPath, dstPath, function (err) {
        if (err) {
            logger.error('upload rename error: ' + err);
        } else {
            res.status('200').send(dstPath);
        }
    });
}