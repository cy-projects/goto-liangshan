import React, { Component } from 'react'
import { Link } from 'react-router'

import './index.scss'

class Article2 extends Component {

  constructor(...props){
    super(...props);
  }

  render(){
    let userId = 1;
    let articleId = 4;

    return (
      <div className="main-forum-article">
        <div className="article-item">
          <h3>
            <Link to={{pathname: `/article/${articleId}`, state: {userId: userId, articleId: articleId}}}>[心无界]是一种怎样的生活状态？</Link>
          </h3>
          <div className="point">
            <span>心无界，方能行无疆。打破常规，抛除定见，才能领悟到世界不为人知的美，捕捉世界的点滴变化。破常规，抛除定见，才能领悟到世界不为人知的美，捕捉世界的点滴变化。</span>
          </div>
          <div className="other clearfix">
            <div className="time">
              <span>2017-11-13 11:20</span>
            </div>
            <div className="opt">
              <Link>评论(<span>20</span>)</Link>
              <span className="line">|</span>
              <Link>分享</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Article2
