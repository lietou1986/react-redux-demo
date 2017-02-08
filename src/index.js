'use strict';

require('babel-register')

var express = require('express');

var kraken = require('kraken-js');

var launch = require('./launch');

const webpack = require('webpack');
const config = require('./webpack.config');
var options, app;



/*

 * Create and configure application. Also exports application instance for use by tests.

 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.

 */

options = {

    onconfig: function (config, next) {

        /*

         * Add any additional config setup or overrides here. `config` is an initialized

         * `confit` (https://github.com/krakenjs/confit/) configuration object.

         */

        next(null, config);

    }

};



/**

 * 系统启动时执行的操作

 */

launch.boot();



app = module.exports = express();

app.use(kraken(options));

// Webpack developer

if (global.isDebug) {

    const compiler = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {

        publicPath: config.output.publicPath,

        noInfo: true

    }));


    app.use(require('webpack-hot-middleware')(compiler));

}



app.on('start', function () {

    console.log('Application ready to serve requests.');

    console.log('Environment: %s', app.kraken.get('env:env'));

    console.log('Host:%s', appSettings.host);

});