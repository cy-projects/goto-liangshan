import React, { Component } from 'react'
import { Link } from 'react-router'
import { message, Button, Input } from 'antd'
import { findDOMNode} from 'react-dom'

import './index.scss'

import TopPoint from './TopPoint'
import TopOption from './TopOption'
import ShareArticle from './ShareArticle'
import PraisePersons from './PraisePersons'
import OthersComment from './OthersComment'

import { trim, checkStrNum } from 'util/baseFn'

class Article extends Component {
  constructor(...props){
    super(...props)
    this.state = {
      commentDisabled: true
    }
  }
  componentWillMount(){
    console.log('文章详情页', this.props);

  }
  myCommontCommit = () => {
    var val = trim( findDOMNode(this.refs.myCommentText).value )
    if (val == ''){
      message.warn('评论内容不能为空！');
    }

  }

  render(){

    return (
      <div class="article">
        <div className="article-container">
          <h1>[心无界]是一种怎样的生活状态?</h1>
          <div className="top-info">
            <TopPoint />
            <TopOption />
          </div>
          <div className="center clearfix">
            <div className="left">
              <div className="time">2017-11-07</div>
              <div className="author">
                <Link>九千五百岁</Link>
              </div>
            </div>
            <div className="right">
              <div className="template">
                我是文章
              </div>
              <div className="share">
                <div class="bdsharebuttonbox box">
                  <span>分享到：</span>
                  <ShareArticle />
                </div>
              </div>
              <div className="praise" ref="bang">
                <div className="praise-btn">
                  <span >赞赏</span>
                </div>
                <PraisePersons />
              </div>
              <div className="myComment">
                <h3><span>4</span>条评论</h3>
                <div className="myComment-box">
                  {hub.hasToken ? (
                    <Input.TextArea ref="myCommentText" placeholder="最多允许输入200字符" rows="5" onFocus={ (e) => {checkStrNum(e.target, 200)}} onInput={ (e) => {checkStrNum(e.target, 200)}} onPropertychange={ (e) => {checkStrNum(e.target, 200)}}/>
                  ) : (
                    <div className="myComment-box-group">
                      <Link to="/login">登录</Link>
                      <span className="line">|</span>
                      <Link to="/register">注册</Link>
                      <span className="txt">后参与评论</span>
                    </div>
                  )}
                </div>
                <div className="myComment-btn clearfix">
                  <div className="myComment-btn-group">
                    <Button type="primary" size="large" className="add-myCommont" disabled={!hub.hasToken} onClick={this.myCommontCommit}>发表评论</Button>
                  </div>
                </div>
              </div>
              <div className="comment">
                <OthersComment />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Article
