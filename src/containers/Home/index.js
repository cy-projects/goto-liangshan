import React, { Component } from 'react'

import './index.scss'

class Home extends Component {

  render(){

    return (
      <div className="main">
        {this.props.children}
      </div>
    )
  }
}

export default Home;
