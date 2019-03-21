import React, { Component } from 'react'

import './index.scss'

import ForumHeader from './ForumHeader'
import Article2 from './Article2'

class Forum extends Component {
  constructor(...props){
    super(...props);
    this.state = {
      forumValue: '1',
    }
  }
  changeValue = (val) => {
    this.setState({
      forumValue: val
    })
  }
  componentWillMount(){
    // console.log(this.state)
  }
  render(){
    return (
      <div className="main">
        <div>
          <ForumHeader
            forumValue={this.state.forumValue}
            changeValue={this.changeValue}/>
        </div>
        <div>
          <Article2 />
        </div>
      </div>
    )
  }
}

export default Forum;
