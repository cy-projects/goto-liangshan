import React, { Component } from 'react'

import './index.scss'

export default class Footer extends Component {
  render(){
    return (
      <div class="footer">
        <div className="footer-container clearfix">
          <div className="contact">
            <ul>
              <li>
                <a href="mailto:support@bugclose.com">
                  <i className="iconfont icon-email"></i>
                  <span>support@bugclose.com</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0);">
                  <i className="iconfont icon-message"></i>
                  <span>25231582 QQ群号</span>
                </a>
              </li>
              <li>
                <a href="tel:13833335555">
                  <i className="iconfont icon-phone"></i>
                  <span>13833335555</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="link">
            <ul>
              <li>
                <a href="">关于我们</a>
              </li>
              <li>
                <a href="">商务合作</a>
              </li>
              <li>
                <a href="">联系我们</a>
              </li>
            </ul>
          </div>
          <div className="kf">
            <ul>
              <li>客服电话</li>
              <li>10058009（周一到周五9:00-18:00）</li>
            </ul>
          </div>
          <div className="qr">
            <div>
              <ul class="clearfix">
                <li>
                  <div>
                    <img src="./assets/images/qr-weibo.jpg" alt=""/>
                  </div>
                  <p>微博</p>
                </li>
                <li class="weixin">
                  <div>
                    <img src="./assets/images/qr-weixin.jpg" alt=""/>
                  </div>
                  <p>微信公众号</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          <span>©2017 迅猛龙网络 京ICP备ISO59008号-1</span>
        </div>
      </div>
    )
  }
}
