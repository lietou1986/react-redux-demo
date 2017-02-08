var controller = require('./controllers');
var messageController = require('./controllers/message');
var dmController = require('./controllers/dm');
var companyController = require('./controllers/company');
var monitorController = require('./controllers/monitor');
var remoteconfigController = require('./controllers/remoteconfig');
var seController = require('./controllers/se');
var toolController = require('./controllers/tool');

module.exports = function (router) {
    router.put('/login', controller.login);
    router.post('/logout', controller.logout);
    router.post('/menu', controller.menu);
    router.post('/my', controller.my);

    //消息维护
    router.post('/message', messageController.index);
    router.post('/message/send', messageController.send);
    router.post('/message/reset', messageController.reset);

    //监控
    router.get('/monitor', monitorController.index);
    router.post('/monitor/ping', monitorController.ping);
    router.post('/monitor/redis', monitorController.redis);

    //远程配置

    //搜索引擎

    //到面
    router.post('/dm', dmController.index);

    //公司
    router.post('/company', companyController.index);
    router.post('/company/core', companyController.core);
    router.post('/company/route', companyController.route);

    //工具
    router.post('/tool/upload', toolController.upload);

    router.get('*', controller.index);
};