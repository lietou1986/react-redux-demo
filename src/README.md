# cms

# *开发约定*：

>es6解释：就是最新的javascript新版本，新标准，新规范，即将正式发布
  
  
> NODE_ENV环境变量设置：  
linux：export NODE_ENV=production  
window:set NODE_ENV=development
查看变量 set NODE_ENV

* 字符串如果不需要特殊处理使用单引号

* 异步处理的方法定义成`Promise`模式（`blurbrid`模块），这是es6标准方便日后迁移，虽然有些许性能损耗但是易读，否则深度嵌套套路太深脑袋不够用会被后人问候老妈

* 换行必加分号结尾，防止代码压缩出错

* 前端js注释采用 `/*注释内容*/` 方式，避免代码压缩出错

* 文件名命名跟require时的大小写统一，全部统一为小写(linux 与 window 不同，linux文件名称区分大小写)

* 静态文件譬如javascript，css，image等最好放到cdn获取其他web服务器上，node不擅长

* 学习`typescript`，以后js通过编写ts脚本来编译生成，方便维护且提高代码安全性

* 为了提高性能，在代码中尽量减少消耗cpu的代码，譬如各类编码或者加密，多了性能急剧下降

* 本地js与css引用最好采用我写的`jsloader`与`cssloder`来加载，这样在系统发布时会通过自动构建合并并压缩多个文件，减少资源请求，例子如下：

    `{@jsloader file="/assets/javascript/core.min.js,/assets/javascript/jquery.ui.autocomplete.js
 ,/assets/javascript/searchChangeV2.js,/assets/javascript/cityautocomplete.js"}{/jsloader}`

    `{@cssloader file="/assets/css/core.min.css,/assets/css/job_search.css,/assets/css/jquery.autocomplete.css,
 /assets/css/alert_new.css"}{/cssloader}`
 
* 能在客户端处理的逻辑尽量在客户端处理，参考排除公司（从服务端迁移到客户端）

* 了解node子进程模块（`child_process`）的使用场景与用法
 
* 资源列表：

>http://krakenjs.com/#getting-started 开发框架官网
https://github.com/krakenjs/kraken-js 开发框架源码
https://npm.taobao.org/ 淘宝npm镜像 
http://www.dustjs.com/ dustjs模板引擎白皮书 
http://www.gruntjs.net/ grunt中文网站
