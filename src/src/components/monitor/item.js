import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Icon, Menu, Switch, message } from 'antd'
import api from '../../api'
import './item.less'

/**
 * 监控组件(完善输出信息)
 * 
 * @export
 * @class MonitorItem
 * @extends {React.Component}
 */
export default class MonitorItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = { message: 'ping...', loading: true, error: true };
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
        var data = this.props.data;
        delete data.ips;
        data.ip = this.props.ip;
        this.setState({ message: 'ping...', loading: true, error: true });
        this.serverRequest = api._post('/monitor/ping', { data: data }, function (result, error) {
            if (error)
                this.setState({ message: 'error', loading: false, error: true })
            else
                this.setState({ message: result.message, loading: false, error: !result.ok })
        }.bind(this));
    }

    componentDidMount() {
        this.fetchData();
    }

    handleClick(e) {
        this.fetchData();
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {
        return (
            <div>
                <a onClick={this.handleClick.bind(this)}><Icon type="desktop" spin={this.state.loading} />{this.props.ip}</a><span style={{ padding: '0 0 0 50px', color: this.state.error ? 'red' : 'green' }}>{this.state.message}</span>
            </div>
        )
    }
}