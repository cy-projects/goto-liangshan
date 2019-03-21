import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import './index.scss'

import { Form, Input, Checkbox, Button, Row, Col, message } from 'antd'
const FormItem = Form.Item;

import { bugCookie, bugStorage, prevent, trim } from 'util/baseFn'
import { rules, phoneReg, easyPwdReg, codeReg } from 'util/validates'

class Register extends Component {
  constructor(...props){
    super(...props);
    this.state = {
      codeButtonText: '获取验证码',
      isCodeButton: false,
      isLegalOfPhone: false,
      isLegalOfPwd: false,
      isLegalOfCodeNum: false,
      submitBtnText: '注册',
    }
  }
  handleSubmit = (e) => {
    prevent(e);

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('ok: ', values);

        // let token = 'ssss';
        // bugStorage.set('token', token);

        // this.context.router.push('/');
      }
    });
  }
  checkPhone = (rule, value, callback) => {
    rules.phone(rule, value, callback);

    let isLegal = phoneReg(value) ? true : false;
    this.setState({
      isLegalOfPhone: isLegal,
      isCodeButton: isLegal
    })
  }
  checkCode = (rule, value, callback) => {
    rules.code(rule, value, callback);

    let isLegal = codeReg(value) ? true : false;
    this.setState({
      isLegalOfCodeNum: isLegal
    })
  }
  checkSinglePwd = (rule, value, callback) => {
    let form = this.props.form;

    rules.easySinglePwd(rule, value, callback);

    form.validateFields(['confirm'], { force: true });

    this.isPwdPass();
  }
  checkDoublePwd = (rule, value, callback ) => {
    let form = this.props.form;
    let value1 = form.getFieldValue('password');

    rules.easyDoublePwd(rule, value, callback, value1);
    this.isPwdPass();
  }


  isPwdPass = () => {
    let self = this;
    let form = self.props.form;
    let str1 = form.getFieldValue('password');
    let str2 = form.getFieldValue('confirm');

    if (str1 === str2 && easyPwdReg(str1) && easyPwdReg(str2)){
      self.setState({
        isLegalOfPwd: true
      })
    } else {
      self.setState({
        isLegalOfPwd: false
      })
    }
  }

  // 获取验证码
  getCode = () => {
    let self = this;
    let form = self.props.form;

    message.success('发送验证码成功！');

    self.setState({
      isCodeButton: false
    })

    let time = 59;
    let timer = setInterval(function(){
      let text = time + ' s';

      time --;

      if (time < 0){
        clearInterval(timer);
        text = '重新发送';

        self.setState({
          isCodeButton: true
        })
      }
      self.setState({
        codeButtonText: text
      })
    },1000)

  }

  render(){
    console.log('注册', this.props);
    const { getFieldDecorator } = this.props.form;


    return (
      <div className="main-login">
        <div className="main-login-box">
          <div className="top">
            <Link className="" to="/login">登录</Link>
            <span>|</span>
            <Link className="active" to="/register">注册</Link>
          </div>
          <div className="form-box">
            <Form layout="" onSubmit={this.handleSubmit} className="register-form">

              <FormItem hasFeedback>
                {getFieldDecorator('phone', {
                  rules: [{validator: this.checkPhone}],
                })(
                  <Input prefix={<i className="iconfont icon-phone1"></i>} placeholder="手机号" autocomplete="off"></Input>
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('code', {
                  rules: [{validator: this.checkCode}],
                })(
                  <Input prefix={<i className="iconfont icon-check"></i>} placeholder="验证码" autocomplete="off"
                    addonAfter={
                      <div className="get-code-box" onClick={this.getCode}>
                        <Button disabled={!(this.state.isLegalOfPhone && this.state.isCodeButton)}>{this.state.codeButtonText}</Button>
                      </div>
                    }
                  ></Input>
                )}
              </FormItem>

              <FormItem hasFeedback>
                {getFieldDecorator('password', {
                  rules: [{validator: this.checkSinglePwd}],
                })(
                  <Input prefix={<i className="iconfont icon-password"></i>} type="password" placeholder="密码" autocomplete="off"/>
                )}
              </FormItem>

              <FormItem hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [{validator: this.checkDoublePwd}],
                })(
                  <Input prefix={<i className="iconfont icon-password"></i>} type="password" placeholder="确认密码" autocomplete="off"/>
                )}
              </FormItem>

              <FormItem className="login-submit">
                <Button type="primary" htmlType="submit" disabled={!(this.state.isLegalOfPhone && this.state.isLegalOfCodeNum && this.state.isLegalOfPwd)} className="btn_gray">{this.state.submitBtnText}</Button>
              </FormItem>

            </Form>
          </div>
        </div>
      </div>
    )
  }
}

Register.contextTypes = {
  router: PropTypes.object
}

export default Form.create({
  onValuesChange(props, fileds){
    // console.log(props, fileds)
  }
})(Register)
