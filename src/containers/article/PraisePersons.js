import React, { Component } from 'react'
import { Link } from 'react-router'

import './index.scss'

class PraisePersons extends Component {
  constructor(...props){
    super(...props)
  }
  getPraisePersons = (data) => {
    return data.map( (info) => (
      <Link to={info.url} title={info.title}>
        <img src={info.src} alt=""/>
      </Link>
    ))
  }
  render(){
    const praisePersons = [
      {url: '', title: '九千九百岁', src: './assets/images/userPhotoFang.png'},
      {url: '', title: '九千九百岁', src: './assets/images/userPhotoFang.png'},
      {url: '', title: '九千九百岁', src: './assets/images/userPhotoFang.png'}
    ]

    return (
      <div className="praise-view">
        { this.getPraisePersons(praisePersons) }

      </div>
    )
  }
}
export default PraisePersons
