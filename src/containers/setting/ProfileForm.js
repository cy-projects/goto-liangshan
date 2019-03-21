import React, { Component } from 'react'

import './index.scss'

import { Form, Input, Checkbox, Button, Row, Col, Cascader } from 'antd'
import { cityData } from 'util/city'
const FormItem = Form.Item;

import { bugCookie, bugStorage, prevent, trim } from 'util/baseFn'
import { rules, phoneReg, easyPwdReg } from 'util/validates'

class ProfileForm extends Component {
  constructor(...props){
    super(...props)
  }
  handleSubmit = (e) => {
    prevent(e);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('ok: ', values);

      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };


    return(
      <div className="profile-right-box">
        <Form layout="" onSubmit={this.handleSubmit} className="setting-form profile-form">
          <FormItem {...formItemLayout} label="账号">
            {getFieldDecorator('username', {
              initialValue: '15903620494',
            })(
              <Input autocomplete="off" disabled />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="昵称">
            {getFieldDecorator('nickname', {
              initialValue: 'SeverLi',
              rules: [
                {required: true, message: '昵称不能为空！'},
              ]
            })(
              <Input autocomplete="off" />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="给自己一句话">
            {getFieldDecorator('motto', {
              initialValue: '大风大浪、浪起来',
            })(
              <Input autocomplete="off" />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="所在区域">
            {getFieldDecorator('residence', {
              initialValue: ['北京市', '北京市', '朝阳区'],
            })(
              <Cascader options={cityData} />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="工作职位">
            {getFieldDecorator('jobTitle', {
              initialValue: '设计师',
            })(
              <Input autocomplete="off" />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="手机号码">
            {getFieldDecorator('phone', {
              initialValue: '15903620494',
            })(
              <Input autocomplete="off" disabled />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="星宿">
            {getFieldDecorator('phone', {
              initialValue: '天魁星',
            })(
              <Input autocomplete="off" />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="绰号">
            {getFieldDecorator('phone', {
              initialValue: '及时雨',
            })(
              <Input autocomplete="off" />
            )}
          </FormItem>

          <FormItem className="setting-form-sub">
            <Button type="primary" htmlType="submit">保存</Button>
          </FormItem>

        </Form>
      </div>
    )
  }
}

export default Form.create({
  onValuesChange(props, fileds){
    console.log(props, fileds)
  }
})(ProfileForm)
