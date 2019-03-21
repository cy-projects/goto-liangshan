import React, { Component } from 'react'
import { Link } from 'react-router'

import './index.scss'

class Setting extends Component {
  constructor(...props){
    super(...props);
    this.state = {
      settingCurrent: 'setting',
    }
  }
  componentWillMount(){
    let path = (window.location.hash.split("?")[0]).split("/")[2];

    this.setState({
      settingCurrent: path,
    })
  }
  componentWillUpdate(prevProps, prevStates){
    let path = (window.location.hash.split("?")[0]).split("/")[2];

    if (path != prevStates.settingCurrent){
      this.setState({
        settingCurrent: path,
      })
    }
  }
  render(){
    console.log('设置', this.props);

    return (
      <div className="main-setting">
        <div className="setting-header">
          <div className="setting-header-left">
            <Link to="/setting/profile" className={this.state.settingCurrent == 'profile' ? "current": ""}>基本资料</Link>
            <span className="line">|</span>
            <Link to="/setting/account" className={this.state.settingCurrent == 'account' ? "current": ""}>账号设置</Link>
          </div>
        </div>
        <div className="setting-center">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Setting
