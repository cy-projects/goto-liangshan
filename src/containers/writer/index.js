import React, { Component } from 'react'
import './index.scss'

import { bugStorage, getScroll, addEvent, getViewSize, getPageSize, setScrollTop, removeEvent  } from 'util/baseFn'


import WriterWangeditor from './WriterWangeditor'
// import WriterReactQuill from './WriterReactQuill'
import WriterSimplemde from './WriterSimplemde'

class Writer extends Component {
  constructor(...props){
    super(...props);
    this.state = {
      writerFixedX: '50%',
      writerEditorInitValue: '请在这里输入你的内容...',
      writerProText: bugStorage.get('userWriteProText') || '富文本',
    }
  }
  toggleWriteProText = (err) => {
    this.setState({
      writerProText: err,
    })
  }
  getWriterPro = () => {

    switch(this.state.writerProText){
      case '富文本':
        return (<WriterWangeditor
          writerFixedX={this.state.writerFixedX}
          writerEditorInitValue={ this.state.writerEditorInitValue }
          writerProText={ this.state.writerProText }
          toggleWriteProText={ this.toggleWriteProText }/>);
      // case 'reactQuill':
      //   return (<WriterReactQuill />);
      case 'Markdown':
        return (<WriterSimplemde
          writerFixedX={this.state.writerFixedX}
          writerEditorInitValue={ this.state.writerEditorInitValue }
          writerProText={ this.state.writerProText }
          toggleWriteProText={ this.toggleWriteProText }/>);
      default:
        return (<WriterWangeditor
          writerFixedX={this.state.writerFixedX}
          writerEditorInitValue={ this.state.writerEditorInitValue }
          writerProText={ this.state.writerProText }
          toggleWriteProText={ this.toggleWriteProText }/>);
    }
  }
  componentDidMount(){
    this.getWriterFixedX();
    addEvent('scroll', window, this.getWriterFixedX);
    addEvent('resize', window, this.getWriterFixedX);
  }
  componentWillUnmount(){
    removeEvent('scroll', window, this.getWriterFixedX);
    removeEvent('resize', window, this.getWriterFixedX);
  }
  getWriterFixedX = () => {
    if ( getViewSize().width < 1200 ){
      let viewCha = (1200 - getViewSize().width);
      let scrollLeft = getScroll().left;

      this.setState({
        writerFixedX: parseInt( 600 - (viewCha - scrollLeft )) + 'px',
      })
    } else {
      this.setState({
        writerFixedX: '50%',
      })
    }
  }
  render(){


    return(
      <div className="main-writer">
        { this.getWriterPro() }
      </div>
    )
  }
}

export default Writer
