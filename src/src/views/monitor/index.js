import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Card, Menu, Icon } from 'antd';
import { fetchConfig } from '../../actions/monitor'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import './index.less'
import MonitorItem from '../../components/monitor/item';

const propTypes = {
    config: PropTypes.array
};

const contextTypes = {
    router: PropTypes.object.isRequired
};

class Monitor extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
        this.props.fetchConfig();
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        var openKeys = ['root'];
        const servicesInfoLoop = data => data.ips.map((item, index) => {
            let key = 'ip_' + index;
            return <Menu.Item key={key}><MonitorItem data={data} ip={item} key={'item_' + index} /></Menu.Item>;
        });
        const servicesLoop = data => data.map((item, index) => {
            let key = 'subm_s_' + index;
            openKeys.push(key);
            if (item.serviceInfo.ips && item.serviceInfo.ips.length) {
                return <SubMenu key={key} title={<span><Icon type="share-alt" />{item.serviceName + '/' + item.domainName}</span>}>{servicesInfoLoop(item.serviceInfo)}</SubMenu>;
            }
            return <SubMenu key={key} title={<span><Icon type="share-alt" />{item.serviceName + '/' + item.domainName}</span>}></SubMenu>;
        });
        const projects = this.props.config.map((item, index) => {
            let key = 'subm_p_' + index;
            openKeys.push(key);
            if (item.services && item.services.length) {
                return <SubMenu key={key} title={<span><Icon type="bars" />{item.projectName}</span>}>{servicesLoop(item.services)}</SubMenu>;
            }
            return <SubMenu key={key} title={<span><Icon type="bars" />{item.projectName}</span>}></SubMenu>;
        });
        return (
            <div className="page2-box" style={{ background: '#ECECEC', padding: '5px' }}>
                <Menu
                    mode="inline" defaultOpenKeys={openKeys}>
                    <SubMenu key="root" title={<span><Icon type="bars" />服务器列表</span>}>
                        {projects}
                    </SubMenu>
                </Menu>

            </div>
        )
    }
}

Monitor.contextTypes = contextTypes;

Monitor.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        config: state.monitor.config
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchConfig: bindActionCreators(fetchConfig, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitor)