import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import './index.scss'

import { Badge, Input } from 'antd'
import { trim, addEvent, removeEvent, prevent, stopPro } from 'util/baseFn'

class Header extends Component {
  constructor(...props){
    super(...props);
    this.state = {
      isOpenSearch: false,
      isOpenPhoto: false,
    }
  }
  // 搜索
  searchForm = (ev) => {
    prevent(ev);

    var value = trim(this.refs.searchIpt.value);

    if (this.state.isOpenSearch == false){
      this.refs.searchIpt.focus();

      this.setState({
        isOpenSearch: true,
      })
    } else if(this.state.isOpenSearch == true){
      if (value.length == 0){
        this.setState({
          isOpenSearch: false,
        })
      } else if (value.length > 0){

      }
    }
  }
  // 头像操作显隐切换
  openPhotoOpt = (ev) => {
    stopPro(ev);
    ev.nativeEvent.stopImmediatePropagation();

    this.setState({
      isOpenPhoto: !this.state.isOpenPhoto,
      isOpenSearch: false,
    })
  }

  // 阻止冒泡
  searchStopPro = (ev) => {
    stopPro(ev);
    ev.nativeEvent.stopImmediatePropagation();

    this.setState({
      isOpenPhoto: false,
    })
  }
  searchBlur = () => {
    this.setState({
      isOpenSearch: false,
      isOpenPhoto: false,
    })
  }
  componentDidMount(){
    addEvent('click', document, this.searchBlur);
  }
  componentWillUnmount(){
    removeEvent('click', document, this.searchBlur);
  }
  render(){
    const { token } = this.props;

    return (
      <div className="header">
        <div className="header-container clearfix">
          <div className="header-right">
            <div className="search" onClick={this.searchStopPro}>
              <form action="" id="search-form" onSubmit="return false;">
                <div className={this.state.isOpenSearch ? "search-box search-box-open" : "search-box"}>
                  <div className="search-static">
                    <Input className="search-ipt" type="text" placeholder="请输入你要查找的内容" autocomplete="off" ref="searchIpt"/>
                  </div>
                  <a href="" className="search-btn"  onClick={this.searchForm} title="搜索">
                    <i className="iconfont icon-sousuo"></i>
                  </a>
                </div>
              </form>
            </div>
            { hub.hasToken ? (
              <div class="header-token">
                <div className="mes">
                  <div className="mes-entry">
                    <Badge count={5} overflowCount={99}>
                      <i class="iconfont icon-mes2" style={{fontSize: "20px", verticalAlign: "top", margin: '3px 0 0 0'}}></i>
                    </Badge>
                  </div>
                </div>
                <div className="photo">
                  <div className="photo-entry" onClick={this.openPhotoOpt}>
                    <img src="./assets/images/userPhotoFang.png" alt=""/>
                  </div>
                  <div className={this.state.isOpenPhoto ? "photo-opt photo-opt-open" : "photo-opt"}>
                    <ul>
                      <li>
                        <Link to={{pathname: "/user/1", state: {id:1, name: 'zhuchaoyang'}}}>
                          <i class="iconfont icon-photo1"></i>
                          <span>个人主页</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/writer">
                          <i class="iconfont icon-edit"></i>
                          <span>写文章</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/setting/profile">
                          <i class="iconfont icon-set"></i>
                          <span>设置</span>
                        </Link>
                      </li>
                      <li>
                        <Link>
                          <i class="iconfont icon-exit"></i>
                          <span>退出</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div class="header-no-token">
                <div className="login" title="登录">
                  <Link to="/login">
                    <span>上山</span>
                  </Link>
                </div>
                <div className="register" title="注册">
                  <Link to="/register">
                    <span>入伙</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

Header.contextTypes = {
  router: PropTypes.object
}

export default Header;
