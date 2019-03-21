import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import './index.scss'

class ArticleNav extends Component {
  constructor(...props){
    super(...props)
  }
  componentWillMount(){
    console.log('文章预览页', this.props);
  }
  render(){
    let pathname = this.props.location.pathname;
    let thisParentPath = pathname.split('/')[1];
    let userId = 1;
    let articleId = 4;

    return (
      <div class="main-article">
        <div className="article-preview-container">
          <div className="preview-nav">
            <div className="preview-item clearfix">
              <div className="left">
                <h3>
                  <Link to={{pathname: `/article/${articleId}`, state: {userId: userId, articleId: articleId}}}>[心无界]是一种怎样的生活状态？</Link>
                </h3>
                <div className="desc">心无界，方能行无疆。打破常规，抛除定见，才能领悟到世界不为人知的美,捕捉世界的点滴变化。</div>
                <div className="info">
                  <Link to=""><span>九千九百岁</span></Link>
                  <span className="line">|</span>
                  <span>1分钟前</span>
                </div>
              </div>
              <div className="right">
                <div>
                  <img src="./assets/images/1.jpg" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ArticleNav.contextTypes = {
  router: PropTypes.object
}
export default ArticleNav
