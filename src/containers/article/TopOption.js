import React, { Component } from 'react'
import { Link } from 'react-router'

import './index.scss'

class TopOption extends Component {
  constructor(...props){
    super(...props)
  }

  render(){

    return(
      <div className="options">
        <ul className="clearfix">
          <li>
            <Link to="">
              <i class="iconfont icon-view"></i>
              <span>144</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <i class="iconfont icon-comment"></i>
              <span>20</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <i class="iconfont icon-bang"></i>
              <span>8</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <i class="iconfont icon-heart"></i>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default TopOption
