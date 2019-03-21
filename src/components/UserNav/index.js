import React, { Component } from 'react'
import { Link } from 'react-router'

import { Menu } from 'antd'
let MenuItem = Menu.Item;

import './index.scss'

class UserNav extends Component {
  constructor(...props){
    super(...props);

  }
  getUserNavList = (data) => {
    const userId = this.props.userId;
    const userFirstPathname = (window.location.hash.split("?")[0]).split("/")[1];

    return data.map( (info) => (
      <MenuItem key={info.pathname}>
        <Link to={info.pathname == 'articleNav' ? `/${userFirstPathname}/${userId}` : `/${userFirstPathname}/${userId}/${info.pathname}`}>
          <span>{info.name}</span>
        </Link>
      </MenuItem>
    ))
  }

  render(){
    const { userCurrent } = this.props;

    const data = [
      {name: '文章', pathname: 'articleNav'},
      {name: '专栏', pathname: 'columns'},
      {name: '回答', pathname: 'answers'},
      {name: '提问', pathname: 'asks'},
      {name: '动态', pathname: 'activities'},
      {name: '收藏', pathname: 'collections'},
      {name: '关注', pathname: 'following'},
    ]
// selectedKeys={[this.state.userCurrent]}
    return(
      <div className="main-header">
        <div className="photo">
          <div className="photo-box">
            <span><img src="./assets/images/userPhotoFang.png" alt=""/></span>
          </div>
        </div>
        <div className="name">
          <span className="name-en">SeverLi</span>
          <span className="name-cn">（及时雨·宋江）</span>
        </div>
        <div className="motto">
          <span>程序员创业话题，不要鸡汤，只有真实分享</span>
          <i class="iconfont icon-edit2"></i>
        </div>
        <div className="job">
          <span className="city">北京</span>
          <span className="professional">设计师</span>
        </div>
        <div className="user-nav">
          <div className="user-nav-box">
            <Menu
              className="user-nav-menu"
              mode="horizontal"
              defaultSelectedKeys={['articleNav']}
              selectedKeys={[userCurrent]}
            >
              {this.getUserNavList(data)}
            </Menu>
          </div>
        </div>
      </div>
    )
  }
}

export default UserNav
