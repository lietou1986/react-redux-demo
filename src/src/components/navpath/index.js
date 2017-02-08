import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { Breadcrumb } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router';

import './index.less'

const defaultProps = {
    navpath: []
}

const propTypes = {
    navpath: PropTypes.array
}

class NavPath extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { navpath } = this.props
        const bread = navpath.map((item) => {
            return (
                <Breadcrumb.Item key={'bc-' + item.key}><Link to={item.url}>{item.name}</Link></Breadcrumb.Item>
            )
        })
        return (
            <div className="ant-layout-breadcrumb">
                <Breadcrumb>
                    <Breadcrumb.Item key='bc-0'> <Link to='/'>首页</Link></Breadcrumb.Item>
                    {bread}
                </Breadcrumb>
            </div>
        )
    }
}

NavPath.propTypes = propTypes;
NavPath.defaultProps = defaultProps;

function mapStateToProps(state) {

    return {
        navpath: state.home.navpath
    }
}

export default connect(mapStateToProps)(NavPath)
