import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';

import configureStore from './store/configureStore';

import App from './views/app';
import Home from './views/home';
import My from './views/home/my';
import ChangePwd from './views/home/changepwd';
import Login from './views/login';
import Company from './views/company';
import CompanyCore from './views/company/core';
import CompanyRoute from './views/company/route';
import RemoteConfig from './views/remoteconfig';
import DaoMian from './views/dm';
import DaoMianAdjust from './views/dm/adjust';
import Monitor from './views/monitor';
import Redis from './views/monitor/redis';
import GlzMessage from './views/message';
import SendMessage from './views/message/sendmessage';
import ResetLineMessage from './views/message/resetlinemessage';
import Lexicon from './views/se';

import { cookieAccessor } from './utils';

const store = configureStore();

const validate = function (next, replace, callback) {
    const isLoggedIn = !!cookieAccessor('uid');
    if (!isLoggedIn && next.location.pathname != '/login') {
        replace('/login')
    }
    callback()
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" onEnter={validate}>
                <IndexRedirect to="home" />
                <Route component={App}>
                    <Route path="home" component={Home} />
                    <Route path="home/changepwd" component={ChangePwd} />
                    <Route path="home/my" component={My} />
                    <Route path="remoteconfig" component={RemoteConfig} />
                    <Route path="dm" component={DaoMian} />
                    <Route path="dmadjust" component={DaoMianAdjust} />
                    <Route path="company" component={Company} />
                    <Route path="company/core" component={CompanyCore} />
                    <Route path="company/route" component={CompanyRoute} />
                    <Route path="monitor" component={Monitor} />
                    <Route path="monitor/redis" component={Redis} />
                    <Route path="message/glz" component={GlzMessage} />
                    <Route path="message/send" component={SendMessage} />
                    <Route path="message/resetline" component={ResetLineMessage} />
                    <Route path="se/lexicon" component={Lexicon} />
                </Route>
                <Route path="login" component={Login} />
            </Route>
        </Router>
    </Provider>
    ,
    document.getElementById('root')
);
