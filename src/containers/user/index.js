import React, { Component } from 'react'

import UserNav from '../../components/UserNav'

import './index.scss'

class User extends Component {
  constructor(...props){
    super(...props);
    this.state = {
      userCurrent: 'articleNav'
    }
  }
  componentWillMount(){
    let nowPathname = (window.location.hash.split("?")[0]).split("/")[3] || 'articleNav';

    const routerArr = ['articleNav', 'columns', 'answers', 'asks', 'activities', 'collections', 'following'];

    if (routerArr.indexOf(nowPathname) > -1){
      this.setState({
        userCurrent: nowPathname
      })
    }
  }
  componentWillUpdate(prevProps, prevState){
    console.log('用户  componentWillUpdate', prevProps, prevState);
    let newPathname = (window.location.hash.split("?")[0]).split("/")[3] || 'articleNav';

    const routerArr = ['articleNav', 'columns', 'answers', 'asks', 'activities', 'collections', 'following'];


    if (routerArr.indexOf(newPathname) > -1 && newPathname != prevState.userCurrent){
      this.setState({
        userCurrent: newPathname
      })
    }
  }
  render(){
    console.log('个人主页', this.props);
    const userId = this.props.params.userId;

    return(
      <div className="main">
        <div>
          <UserNav
            userId={userId}
            userCurrent={this.state.userCurrent}
            />
        </div>
        <div>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default User
