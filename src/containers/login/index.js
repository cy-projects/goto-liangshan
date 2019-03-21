import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import './index.scss'

import { Form, Input, Checkbox, Button, Row, Col } from 'antd'
const FormItem = Form.Item;

import { bugCookie, bugStorage, prevent, trim } from 'util/baseFn'
import { rules, phoneReg, easyPwdReg } from 'util/validates'
import { dec } from 'actions'

class Login extends Component {
  constructor(...props){
    super(...props);
    this.state = {
      isLegalOfPhone: false,
      isLegalOfPwd: false,
      submitBtnText: '登录',
    }
  }
  componentDidMount(){
    alert('填写符合验证的手机号和密码，可模拟登陆，查看登陆后的页面。')
  }
  handleSubmit = (e) => {
    prevent(e);

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('ok: ', values);

        let token = 'ssss';
        bugStorage.set('token', token);

        this.context.router.push('/');
      }
    });
  }
  checkPhone = (rule, value, callback) => {
    rules.phone(rule, value, callback);

    let isLegal = phoneReg(value) ? true : false;
    this.setState({
      isLegalOfPhone: isLegal
    })
  }
  checkSinglePwd = (rule, value, callback) => {
    rules.easySinglePwd(rule, value, callback);

    let isLegal = easyPwdReg(value) ? true : false;
    this.setState({
      isLegalOfPwd: isLegal
    })
  }
  render(){
    console.log('登录', this.props);
    const { getFieldDecorator } = this.props.form;


    return (
      <div className="main-login">
        <div className="main-login-box">
          <div className="top">
            <Link className="active" to="/login">登录</Link>
            <span>|</span>
            <Link className="" to="/register">注册</Link>
          </div>
          <div className="form-box">
            <Form layout="" onSubmit={this.handleSubmit} className="login-form">
              <FormItem hasFeedback>
                {getFieldDecorator('userName', {
                  rules: [{validator: this.checkPhone}],
                })(
                  <Input prefix={<i className="iconfont icon-phone1"></i>} placeholder="手机号" autocomplete="off"></Input>
                )}
              </FormItem>

              <FormItem hasFeedback>
                {getFieldDecorator('password', {
                  rules: [{validator: this.checkSinglePwd}],
                })(
                  <Input prefix={<i className="iconfont icon-password"></i>} type="password" placeholder="密码" autocomplete="off"/>
                )}
              </FormItem>
              <FormItem className="login-submit">
                <Button type="primary" htmlType="submit" disabled={!(this.state.isLegalOfPhone && this.state.isLegalOfPwd)} className="btn_gray">{this.state.submitBtnText}</Button>
              </FormItem>
              <FormItem className="login-remeber">
                {getFieldDecorator('remeber',{
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Checkbox>记住密码</Checkbox>

                )}
                <Link to="/find" className="forget">忘记密码？</Link>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

Login.contextTypes = {
  router: PropTypes.object
}

export default Form.create({
  onValuesChange(props, fileds){
    console.log(props, fileds)
  }
})(Login)
