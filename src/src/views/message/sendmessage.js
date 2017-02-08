import React, { PropTypes } from 'react'
import { Form, Row, Col, Select, Input, Card, Button, message, Upload, Icon } from 'antd';
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sendMessage } from '../../actions/message'

const Option = Select.Option;
const FormItem = Form.Item;

import './index.less'

const propTypes = {
  sendOver: PropTypes.bool,
  sendResult: PropTypes.object
};

const contextTypes = {
  router: PropTypes.object.isRequired
};

class SendMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadFile: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    var sendResult = nextProps.sendResult;
    if (nextProps.sendOver && !sendResult.ok) {
      message.success('消息发送失败：' + sendResult.message);
    }

    if (nextProps.sendOver && sendResult.ok) {
      message.success('消息发送成功：' + sendResult.message);
    }
  }

  handleReset() {
    this.props.form.resetFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = this.props.form.getFieldsValue();
    if (!data.message && !this.state.uploadFile) {
      message.error('请填写消息内容或者上传消息文件');
      return;
    }
    else {
      this.props.sendMessage(data.type, data.message, this.state.uploadFile);
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
    var messageTypes = ['apply', 'tag', 'directory', 'recommend', 'action', 'job', 'status', 'positionwrite', 'positionrefresh', 'resumewrite', 'talent'];
    var items = [];
    messageTypes.map(function (item) {
      items.push(<Option key={item} value={item}>{item}</Option>);

    })

    return (
      <div className="page2-box" style={{ background: '#ECECEC', padding: '30px' }}>
        <Row>
          <Col span="25">
            <Card bordered={false}>
              <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                请选择消息类型： {getFieldDecorator('type', {
                  initialValue: 'apply'
                })(<Select size="large" style={{ width: 200 }} htmlName="type">
                  {items}
                </Select>)}
                <br /> <br />
                {getFieldDecorator('message')(<Input type="textarea" rows={10} />)} <br /> <br />

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

SendMessage.contextTypes = contextTypes;

SendMessage.propTypes = propTypes;

SendMessage = Form.create()(SendMessage);

function mapStateToProps(state) {
  return { sendOver: state.message.sendOver, sendResult: state.message.sendResult };
}

function mapDispatchToProps(dispatch) {
  return {
    sendMessage: bindActionCreators(sendMessage, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage)