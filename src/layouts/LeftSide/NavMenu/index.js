import React, { Component } from 'react'
import { Link } from 'react-router'

import { Menu } from 'antd'

import './index.scss'

class NavMenu extends Component {

  getMenuItems(data){
    return data.map( (info) => (
      <Menu.Item key={info.name}>
        <Link to={ info.name == 'home' ? "/" : `/${info.name}`}>
          <i className="iconfont  ">·</i>
          <span className="nav-text">{ info.text }</span>
        </Link>
      </Menu.Item>
    ))
  }


  render (){
    const data = [
      { name: 'home', text: '精选',   },
      { name: 'forum', text: '论坛',  },
      { name: 'sports', text: '活动', },
    ]
    const { current } = this.props;

    return (
      <Menu
        className="sidebar-nav"
        mode="inline"
        defaultSelectedKeys={['home']}
        selectedKeys={[current]}>
        { this.getMenuItems(data) }
      </Menu>
    )
  }
}

export default NavMenu;
