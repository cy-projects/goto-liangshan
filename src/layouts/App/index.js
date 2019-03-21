import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LeftSide from '../LeftSide/index'
import Header from '../Header/index'
import Footer from '../Footer/index'

import {fetchGet} from '../../utils/fetch2'

import './index.scss'

import { message } from 'antd'
import {  dec  } from 'actions/index'
import { bugCookie, bugStorage, getScroll, addEvent, getViewSize, getPageSize, setScrollTop } from 'util/baseFn'

class App extends Component {
  constructor(...props){
    super(...props);
    this.state = {
      current: 'home',
      layoutLeftLX: '50%',
      layoutHeaderX: '50%',
    }
  }
  componentWillMount(){
    this.isHasToken();

    const nowPathname = window.location.hash.split("/")[1] || 'home';
    const routeArr = ['home', 'forum', 'sports'];

    if (routeArr.indexOf(nowPathname) > -1){
      this.setState({
        current: nowPathname,
      })
    } else {
      this.setState({
        current: 'home',

      })
    }
    //全局提示 基础配置
    message.config({
      top: 50,
    });

  }

  componentWillUpdate( prevProps, prevState){
    this.isHasToken();

    const newPathname = window.location.hash.split("/")[1] || 'home';

    const routeNavArr = ['home', 'forum', 'sports'];
    const routeOtherArr = ['login', 'register'];

    // if (routeOtherArr.indexOf(newPathname) > -1 && this.state.current != 'home'){
    //   this.setState({
    //     current: 'home',
    //   })
    // } else
    if(routeNavArr.indexOf(newPathname) > -1 && (newPathname != prevState.current)){
      this.setState({
        current: newPathname,
      })
    }



  }

  componentDidMount(){
    this.getlayoutLeftX();
    addEvent('scroll', window, this.getlayoutLeftX);
    addEvent('resize', window, this.getlayoutLeftX);
  }
  componentWillUnmount(){
    removeEvent('scroll', window, this.getlayoutLeftX);
    removeEvent('resize', window, this.getlayoutLeftX);
  }
  getlayoutLeftX = () => {
    if ( getViewSize().width < 1200 ){
      let viewCha = (1200 - getViewSize().width);
      let scrollLeft = getScroll().left;

      this.setState({
        layoutLeftLX: parseInt(- scrollLeft + 600) + 'px',
        layoutHeaderX: parseInt( 600 - (viewCha - scrollLeft )) + 'px',
      })
    } else {
      this.setState({
        layoutLeftLX: '50%',
        layoutHeaderX: '50%',
      })
    }
  }
  // 全局提供token切换 组件的依据
  isHasToken = () => {
    let _nowPathname = window.location.hash.split("/")[1];

    if (_nowPathname == 'login'){
      bugStorage.del('token');
    }

    // 判断token是否存在
    let _hasToken = bugStorage.isExist('token'); //存在，为true

    if (_hasToken && hub.hasToken == false) {
      hub.hasToken = true;
    } else if (!_hasToken && hub.hasToken == true){
      hub.hasToken = false;
    }
  }
  render(){
    // console.log('我是App', this.props);
    // console.log(this.context);
    //
    fetchGet('/api/web/v1/groups/recommend/')


    return (
      <div className="wrapper" >
        <div className="layout-left" style={{"left": `${this.state.layoutLeftLX}`}}>
          <LeftSide current={ this.state.current }/>
        </div>
        <div className="layout-header" style={{"right": `${this.state.layoutHeaderX}`}}>
          <Header token={hub.hasToken} />
        </div>
        <div className="layout-index">
          <div className="container">
            <div className="app">
              <div className="app-container" >
                <div className="app-main">
                  { this.props.children }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="layout-footer">
          <div className="container">
            <Footer />
          </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state){
  // console.log(state)
  const { count } = state;
  return {
    value: count.count
  }
}

App.contextTypes = {
  router: PropTypes.object
}

export default connect(mapStateToProps)(App)
