import React, { Component } from 'react'
import { Link } from 'react-router'

import './index.scss'

class OthersComment extends Component {
  constructor(...props){
    super(...props);
    this.state = {
      bangActive: false
    }
  }
  firstBang = () => {
    this.setState({
      bangActive: !this.state.bangActive
    })
  }
  getCommentTotal = (data) => {
    return data.map( (info) =>(
      <div className="comment-item">
        <div className="first">
          <div className="clearfix">
            <div className="first-left"><Link to=""><img src={info.first.photoUrl} alt=""/></Link></div>
            <div className="first-right">
              <div className="top">
                <Link>{info.first.name}</Link>
                <span className="time">{info.first.time}</span>
              </div>
              <div className="text">{info.first.text}</div>
            </div>
          </div>
          <div className="opt clearfix">
            <div className="opt-box">
              <Link className="tot">举报</Link>
              <span className="report">回复</span>
              <span className={this.state.bangActive ? "bang bangActive" : "bang"} onClick={this.firstBang}>赞<i className='iconfont icon-bang'></i></span>
            </div>
          </div>
        </div>
      </div>
    ))
  }
  render(){
    const commentTotalData = [
      {
        first: {
          userId: '',
          photoUrl: './assets/images/userPhotoCircle.png',
          name: '马江涛',
          time: '2015-09-06 16:02',
          text: '可是，感觉那个杂志还挺酷的',
        }
      },
      {
        first: {
          userId: '',
          photoUrl: './assets/images/userPhotoCircle.png',
          name: 'H不归',
          time: '2015-08-31 11:51',
          text: '啊啊！把我要写的先写了',
        }
      },
      {
        first: {
          userId: '',
          photoUrl: './assets/images/userPhotoCircle.png',
          name: '甜兜兜',
          time: '2015-09-06 16:02',
          text: '豆瓣早就不是以前的豆瓣了，说是文艺青年的聚集地很多文艺青年该不愿意了吧',
        }
      }
    ]


    return(
      <div className="comment-box">
        {this.getCommentTotal(commentTotalData)}
      </div>
    )
  }
}
export default OthersComment
