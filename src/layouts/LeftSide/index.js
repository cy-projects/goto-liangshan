import React, { Component } from 'react'

import NavMenu from './NavMenu'
import './index.scss'

class LeftSide extends Component {


  render(){
    const { current } = this.props;

    return (
      <div className="sidebar">
        <div className="sidebar-logo">
          <a href="">
            <img src="./assets/images/logo.png" alt=""/>
          </a>
          <div className="text">
            this is very niubi de wangzhang welcome
          </div>
        </div>
        <NavMenu current={current} />
      </div>
    )
  }
}

export default LeftSide;
