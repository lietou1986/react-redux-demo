import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Icon, Menu, Switch, Badge } from 'antd'
import { logout } from '../../actions/user'
import { updateNavPath, switchTheme } from '../../actions/home'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import './index.less'

const contextTypes = {
    router: PropTypes.object.isRequired
};

class Header extends React.Component {
    constructor(props) {
        super(props)

    }

    handleClick(e) {
        switch (e.key) {
            case 'setting:1':
                this.props.updateNavPath();
                this.context.router.replace('/home/my');
                break;
            case 'setting:2':
                this.props.updateNavPath();
                this.context.router.replace('/home/changepwd');
                break;
            case 'setting:3':
                this.props.logout();
                this.context.router.replace('/login');
                break;
            case 'setting:4':
                this.props.updateNavPath();
                this.context.router.replace('/home/help');
                break;
            case 'setting:5':
                this.props.switchTheme('light');
                break;
            case 'setting:6':
                this.props.switchTheme('dark');
                break;
        }
    }

    render() {
        const {user} = this.props
        return (
            <div className='ant-layout-header'>
                <Menu className="header-menu" onClick={this.handleClick.bind(this)}
                    mode="horizontal">
                    <SubMenu title={<span><Icon type="user" />{user.user}</span>}>
                        <Menu.Item key="setting:1">我的信息</Menu.Item>
                        <Menu.Item key="setting:2">修改密码</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="setting:3">注销</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="setting:4">
                        <Icon type="question" />帮助
          </Menu.Item>
                    <SubMenu title={<span><Icon type="windows" />切换主题</span>}>
                        <Menu.Item key="setting:5">白天</Menu.Item>
                        <Menu.Item key="setting:6">黑夜</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

Header.contextTypes = contextTypes;

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch),
        updateNavPath: bindActionCreators(updateNavPath, dispatch),
        switchTheme: bindActionCreators(switchTheme, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
