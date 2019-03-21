import React, { Component } from 'react'

import { Upload, message } from 'antd'
const Dragger = Upload.Dragger;
import { beforeUploadImg } from 'util/baseFn'

import './index.scss'

class UploadMyPhoto extends Component {
  constructor(...props){
    super(...props);
  }
  handleChange = (info) => {
    console.log(info)
    console.log(info.file.response)
  }
  render(){
    const url = '/cgi/user/uploadHeadImage';
    const token = 'd4b610def11140dfaad5e892bdc8cd24';
    const id = ""

    const avatarProps = {
      name: 'file',
      action: url,
      onChange: this.handleChange,
      showUploadList: false,
      beforeUpload: beforeUploadImg,
      data: {
        token: token
      }
    }
    const UploadDefaultButton = (
      <div class="avatar-uploader-trigger">
        <i className="iconfont icon-plus"></i>
        <span>编辑头像</span>
      </div>
    )

    return (
      <div className="avatar">
        <Dragger { ...avatarProps } className="avatar-uploader">
          {UploadDefaultButton}
        </Dragger>
      </div>
    )
  }
}

export default UploadMyPhoto
