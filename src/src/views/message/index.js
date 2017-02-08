import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table, Input, Button, Form, TimePicker, DatePicker, Select } from 'antd';
import enUS from 'antd/lib/date-picker/locale/en_US';
import moment from 'moment-timezone/moment-timezone';
const FormItem = Form.Item;
const Option = Select.Option;
import { fetchGlzMessage } from '../../actions/message'

import './index.less'

const propTypes = {
    data: PropTypes.array,
    numFound: PropTypes.number,
    message: PropTypes.string,
    loading: PropTypes.bool
};

const contextTypes = {
    router: PropTypes.object.isRequired
};

class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pagination: this.pagination
        }
        this.fetchData = this.fetchData.bind(this);
    }

    pagination = {
        total: this.props.numFound,
        current: 1,
        pageSize: 10,
        size: "default",
        showSizeChanger: true,
        showQuickJumper: true
    }

    fetchData() {
        const pager = this.state.pagination;
        const data = this.props.form.getFieldsValue();
        this.props.fetchGlzMessage(data.date, data.startTime, data.endTime, data.topic, data.message, pager.current, pager.pageSize);
    }

    componentDidMount() {
        this.fetchData();
    }

    handleReset() {
        this.props.form.resetFields();
    }

    handleSubmit(e) {
        e.preventDefault();
        const pager = this.state.pagination;
        pager.current = 1;
        this.setState({
            pagination: pager,
        });
        this.fetchData();
    }

    handleTableChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({
            pagination: pager,
        });
        this.fetchData();
    }

    render() {
        const columns = [{
            title: 'Topic',
            width: '15%',
            dataIndex: 'topic'
        }, {
            title: 'GroupName',
            width: '20%',
            dataIndex: 'groupName',
        }, {
            title: 'BackupTime',
            width: '15%',
            dataIndex: 'backupTime'
        }, {
            title: 'Message',
            dataIndex: 'message'
        }]


        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form inline onSubmit={this.handleSubmit.bind(this)} className="searchbar">
                    <FormItem>
                        {getFieldDecorator('date', { initialValue: moment().locale('en').utcOffset(0) })(
                            <DatePicker size="large" locale={enUS} />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('startTime', { initialValue: moment('00:00:00', 'HH:mm:ss') })(
                            <TimePicker size="large" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('endTime', { initialValue: moment('23:59:59', 'HH:mm:ss') })(
                            <TimePicker size="large" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('topic', {
                            initialValue: '*'
                        })(<Select size="large" style={{ width: 100 }}>
                            <Option value="*">*</Option>
                            <Option value="apply">apply</Option>
                            <Option value="invite">invite</Option>
                            <Option value="resume">resume</Option>
                        </Select>)}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('message')(
                            <Input placeholder="message" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">搜索</Button>&nbsp;&nbsp;&nbsp;
            <Button onClick={this.handleReset.bind(this)}>重置</Button>
                    </FormItem>
                </Form>
                <Table scroll={{ y: 500 }} onChange={this.handleTableChange.bind(this)} columns={columns} loading={this.props.loading} dataSource={this.props.data} size="middle" pagination={this.state.pagination} />
            </div>
        )
    }
}

Message.contextTypes = contextTypes;

Message.propTypes = propTypes;

Message = Form.create()(Message);

function mapStateToProps(state) {
    return {
        data: state.message.data,
        numFound: state.message.numFound,
        message: state.message.message,
        loading: state.message.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchGlzMessage: bindActionCreators(fetchGlzMessage, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)