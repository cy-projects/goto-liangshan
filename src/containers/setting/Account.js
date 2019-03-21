import React, { Component } from 'react'
import { Link } from 'react-router'

import './index.scss'

class Account extends Component {
  constructor(...props){
    super(...props);
  }

  render(){
    return (
      <div className="setting-account">
        <div className="account">
          <div className="account-item clearfix">
            <div className="label">账号：</div>
            <div className="ipt">
              <span className="text">zcy_2013@163.com</span>
            </div>
          </div>
          <div className="account-item clearfix">
            <div className="label">真实姓名：</div>
            <div className="ipt">
              <span className="text">李四</span>
              <span className="opt"><i className="iconfont icon-edit2"></i>编辑</span>
            </div>
          </div>
          <div className="account-item clearfix">
            <div className="label">绑定手机号：</div>
            <div className="ipt">
              <span className="text">15903620494</span>
              <span className="opt"><i className="iconfont icon-edit2"></i>更换</span>
            </div>
          </div>
          <div className="account-item clearfix">
            <div className="label">绑定邮箱：</div>
            <div className="ipt">
              <span className="text">zcy_2013@163.com</span>
              <span className="opt"><i className="iconfont icon-edit2"></i>更换</span>
            </div>
          </div>
          <div className="account-item clearfix">
            <div className="label">修改密码：</div>
            <div className="ipt">
              <span className="text">******</span>
              <span className="opt"><i className="iconfont icon-edit2"></i>更换</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Account
