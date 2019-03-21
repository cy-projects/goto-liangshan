import React, { Component } from 'react'
import { Link } from 'react-router'
import UploadMyPhoto from './UploadMyPhoto'
import ProfileForm from './ProfileForm'

import { message } from 'antd'

import './index.scss'

class Profile extends Component {
  constructor(...props){
    super(...props);
  }

  render(){

    return (
      <div className="setting-profile">
        <div className="profile-left">
          <UploadMyPhoto />
        </div>
        <div className="profile-right">
          <ProfileForm />
        </div>
      </div>
    )
  }
}

export default Profile
