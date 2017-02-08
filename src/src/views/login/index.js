import React, { PropTypes } from 'react'
import { Form, Icon,Input, Button, Row, Col, message } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../../actions/user'

const FormItem = Form.Item

import './index.less'

const propTypes = {
  user: PropTypes.string,
  loggingIn: PropTypes.bool,
  loginErrors: PropTypes.string
};

const contextTypes = {
  router: PropTypes.object.isRequired
};

class Login extends React.Component {

  constructor (props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
      const error = nextProps.loginErrors;
      const isLoggingIn = nextProps.loggingIn;
      const user = nextProps.user

      if (error != this.props.loginErrors && error) {
           message.error('登陆失败：'+error);
      }

      if (!isLoggingIn && !error && user)  {
          message.success('登陆成功，'+'欢迎您 ' + user);
      }

      if (user) {
          this.context.router.replace('/home');
      }
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
    const data = this.props.form.getFieldsValue();
    this.props.login(data.user, data.password);
    });
 
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Row className="login-row" type="flex" justify="space-around" align="middle">
        <Col span="8">
          <Form horizontal className="login-form">
           <Row>
              <Col span='16' offset='9'>
              <h1>用户登陆</h1><br/>
              </Col>
            </Row>
            <FormItem
              label='用户名：'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
            >
              {getFieldDecorator('user', {
            rules: [
              { required: true, message: '请填写用户名', type: 'string' },
            ],
          })(
                <Input addonBefore={<Icon type="user" />} placeholder='admin' />
              )}
            </FormItem>
            <FormItem
              label='密码：'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
            >
              {getFieldDecorator('password',{ rules: [
              { required: true, message: '请填写密码', type: 'string' },
            ],
          })(
                <Input addonBefore={<Icon type="lock" />} type='password' placeholder='123456' />
              )}
            </FormItem>
            <Row>
              <Col span='16' offset='9'>
                <Button type='primary' onClick={this.handleSubmit.bind(this)}>确定</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

    )
  }
}

Login.contextTypes = contextTypes;

Login.propTypes = propTypes;

Login = Form.create()(Login);

function mapStateToProps(state) {
  const {user} = state;
  if (user.user) {
      return {user: user.user, loggingIn: user.loggingIn, loginErrors: ''};
  }

  return {user: null, loggingIn: user.loggingIn, loginErrors: user.loginErrors};
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
