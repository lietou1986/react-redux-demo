import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Affix } from 'antd'

import NavPath from '../../components/navpath'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import Footer from '../../components/footer'
import { fetchProfile } from '../../actions/user';

//根据环境选择是否展示调试组件
function renderDevTools(store) {
    if (__DEBUG__) {
        let DevTools = require('../tools/devtools');
        return <DevTools />;
    }
    else { return null; }

}

import './index.less';

const propTypes = {
    user: PropTypes.object,
    children: PropTypes.node.isRequired
};

const childContextTypes = {
    router: PropTypes.object.isRequired
};

const contextTypes = {
    router: PropTypes.object.isRequired
};

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    getChildContext() {
        return this.context;
    }

    componentWillMount() {
        const {actions} = this.props;
        actions.fetchProfile();
    }


    render() {
        const {user, actions} = this.props;
        let theme = "ant-layout-content " + this.props.theme
        return (

            <div className="ant-layout-aside">
                <Sidebar />
                <div className="ant-layout-main">
                    <Affix offsetTop={0}>
                        <Header user={user} />
                    </Affix>
                    <NavPath />
                    <div className="ant-layout-container">
                        <div className={theme}>
                            {this.props.children}

                        </div>
                    </div>
                    <Footer />
                    {renderDevTools()}
                </div>

            </div>
        );
    }
}

App.propTypes = propTypes;

App.childContextTypes = childContextTypes;

App.contextTypes = contextTypes;

const mapStateToProps = (state) => {
    const {user, home} = state;
    return {
        user: user ? user : null, theme: home.theme
    };
};

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({ fetchProfile }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
