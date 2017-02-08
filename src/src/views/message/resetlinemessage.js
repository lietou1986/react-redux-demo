import React, { PropTypes } from 'react'
import { Form, Row, Col, Select, Input, Card, Button, message, Upload, Icon } from 'antd';
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { resetMessage } from '../../actions/message'

const Option = Select.Option;
const FormItem = Form.Item;

import './index.less'

const propTypes = {
    resetOver: PropTypes.bool,
    resetResult: PropTypes.object
};

const contextTypes = {
    router: PropTypes.object.isRequired
};


class ResetMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadFile: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        var resetResult = nextProps.resetResult;
        if (nextProps.resetOver && !resetResult.ok) {
            message.success('消息重置失败：' + resetResult.message);
        }

        if (nextProps.resetOver && resetResult.ok) {
            message.success('消息重置成功：' + resetResult.message);
        }
    }

    handleReset() {
        this.props.form.resetFields();
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.props.form.getFieldsValue();
        if (!data.message) {
            message.error('请填写消息内容');
            return;
        }
        else if (!this.state.uploadFile) {
            message.error('请上传消息文件');
            return;
        }
        else {
            this.props.resetMessage(data.message, this.state.uploadFile);
        }
    }

    beforeUpload(file) {
        const isTxt = file.type === 'text/plain';
        if (!isTxt) {
            message.error('只允许上传txt文件');
        }
        return isTxt;
    }

    handleChange(info) {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
            this.setState({
                uploadFile: info.file.response
            })
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败.`);
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;


        return (
            <div className="page2-box" style={{ background: '#ECECEC', padding: '30px' }}>
                <Row>
                    <Col span="25">
                        <Card bordered={false}>
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                {getFieldDecorator('message')(<Input type="textarea" rows={10} placeholder="请输入公司id和职位id,中间用,隔开 多条数据用换行隔开" />)} <br /> <br />

                                <Upload
                                    multiple={false}
                                    showUploadList={true}
                                    action="/tool/upload"
                                    beforeUpload={this.beforeUpload.bind(this)}
                                    onChange={this.handleChange.bind(this)}
                                    >
                                    <Button type="ghost">
                                        <Icon type="upload" /> 上传文件

    </Button>
                                </Upload>
                                <br /> <br />
                                <Button type="primary" htmlType="submit">发送</Button>&nbsp;&nbsp;&nbsp;
     <Button onClick={this.handleReset.bind(this)}>重置</Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>

        )
    }
}

ResetMessage.contextTypes = contextTypes;

ResetMessage.propTypes = propTypes;

ResetMessage = Form.create()(ResetMessage);

function mapStateToProps(state) {
    return { resetOver: state.message.resetOver, resetResult: state.message.resetResult };
}

function mapDispatchToProps(dispatch) {
    return {
        resetMessage: bindActionCreators(resetMessage, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetMessage)