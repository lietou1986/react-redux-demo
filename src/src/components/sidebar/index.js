import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router'
import { getAllMenu, updateNavPath } from '../../actions/home'

const SubMenu = Menu.SubMenu

import './index.less'

const defaultProps = {
    items: [],
    theme:'dark'
}

const propTypes = {
    items: PropTypes.array
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeKey: ""
        }
    }

    componentDidMount() {
        this.props.getAllMenu()
    }

    menuClickHandle(item) {
        this.setState({
            activeKey: 'menu' + item.key
        })
        this.props.updateNavPath(item.keyPath, item.key)
    }

    render() {
        const { items } = this.props
        const { router } = this.context
        let openKeys = []
        let activeKey = this.state.activeKey
        const menu = items.map((item) => {
            openKeys.push('sub' + item.key)
            return (
                <SubMenu
                    key={'sub' + item.key}
                    title={<span><Icon type={item.icon} />{item.name}</span>}
                    >
                    {item.child.map((node) => {
                        if (node.url && router.isActive(node.url, true)) {
                            activeKey = 'menu' + node.key
                        }
                        let url = node.url
                        return (
                            <Menu.Item key={'menu' + node.key}>
                                <Link to={url}>{node.name}</Link>
                            </Menu.Item>
                        )
                    })}
                </SubMenu>
            )
        });
        return (
            <aside className="ant-layout-sider">
                <div className="ant-layout-logo"></div>
                <Menu
                    mode="inline" theme={this.props.theme} openKeys={openKeys}
                    selectedKeys={[activeKey]}
                    onClick={this.menuClickHandle.bind(this)}
                    >
                    {menu}
                </Menu>
            </aside>
        )
    }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;
Sidebar.contextTypes = {
    router: React.PropTypes.object
}

function mapStateToProps(state) {
    return {
        items: state.home.items,
        theme: state.home.theme
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllMenu: bindActionCreators(getAllMenu, dispatch),
        updateNavPath: bindActionCreators(updateNavPath, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
