import React, { Component } from 'react'
import { Button } from 'antd'
import './index.scss'

import { bugStorage  } from 'util/baseFn'

class WriterButton extends Component {
  constructor(...props){
    super(...props);
  }
  handleChange = () => {
    let { writerProText, toggleWriteProText } = this.props;

    if (writerProText == '富文本'){
      toggleWriteProText('Markdown');
      bugStorage.set('userWriteProText', 'Markdown');
    } else if(writerProText == 'Markdown'){
      toggleWriteProText('富文本');
      bugStorage.set('userWriteProText', '富文本');
    }
  }
  render(){
    const { writerPublish, writerProText } = this.props;

    return(
      <div>
        <Button
          onClick={ this.handleChange }
          type="primary"
          size="large"
          title="点击切换编辑器">{ writerProText }</Button>
        <Button
          type="primary"
          size="large">存草稿</Button>
        <Button
          onClick={writerPublish}
          type="primary"
          size="large">发布</Button>
      </div>
    )
  }
}

export default WriterButton;

// <Button
//   onClick={ () => toggleWritePro('mark') }
//   type="primary"
//   size="large">Markdown</Button>
// <Button
//   type="primary"
//   size="large">存草稿</Button>
// <Button
//   onClick={this.writerPublish}
//   type="primary"
//   size="large">发布</Button>
