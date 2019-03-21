import React, { Component } from 'react'
import { Link } from 'react-router'

import './index.scss'

class TopPoint extends Component {
  constructor(...props){
    super(...props)
  }
  getPoint = (data) => {
    return data.map( (info) => (
      <li key={info.name}>
        <Link to="">
          <span>{info.name}</span>
        </Link>
      </li>
    ))
  }
  render(){
    const data = [
      { name: '光帆' },
      { name: '突破摘星' }
    ]

    return(
      <div className="points clearfix">
        <ul>
          {this.getPoint(data)}
        </ul>
      </div>
    )
  }
}

export default TopPoint
