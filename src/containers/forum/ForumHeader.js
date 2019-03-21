
import React, { Component } from 'react'
import { Link } from 'react-router'

import './index.scss'

import { Radio } from 'antd';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;


class ForumHeader extends Component {

  constructor(...props){
    super(...props);
  }
  onChange = (e) => {
    this.props.changeValue(e.target.value);
  }
  getRadioData = (data) => {
    return data.map( (info) => (
      <RadioButton key={info.value} value={info.value}>{info.label}</RadioButton>
    ))
  }
  render(){
    const { forumValue } = this.props;

    const options = [
      { value: '1', label: '互联网', },
      { value: '2', label: '技术', },
      { value: '3', label: '产品设计', },
      { value: '4', label: '开发', },
      { value: '5', label: '设计', },
      { value: '6', label: 'UI设计', },
      { value: '7', label: '测试', },
      { value: '8', label: '创意', },
      { value: '9', label: '广告', },
      { value: '10', label: '交互设计', },
    ]

    return (

      <div className="main-forum-header">
        <RadioGroup
          onChange={this.onChange}
          value={forumValue}
          size="large"
        >
          {this.getRadioData(options)}
        </RadioGroup>
      </div>
    )
  }
}

export default ForumHeader
