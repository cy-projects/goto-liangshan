import React, { Component } from 'react'

import './index.scss'
// import 'react-quill/dist/quill.snow.css';

import ReactQuill from 'react-quill';
import { Button, message, Input } from 'antd'

class WriterReactQuill extends Component {
  constructor(...props){
    super(...props);
    this.state = {
      quillText: '',
    }
  }
  handleChange = (value) => {
    this.setState({
      quillText: value
    })
  }
  writerPublish = () => {

  }
  render(){
    const quillOpt = {
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote', 'code-block'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
          ['link', 'image'],
          ['clean'],
        ],
      },

    };
    const { toggleWritePro } = this.props;

    return (
      <div className="writer-quill">
        <div className="writer-opt">
          <Button
            onClick={ ('mark') => toggleWritePro()}
            type="primary"
            size="large">Markdown</Button>
          <Button
            onClick={this.writerBackup}
            type="primary"
            size="large">存草稿</Button>
          <Button
            onClick={this.writerPublish}
            type="primary"
            size="large">发布</Button>
        </div>
        <div className="writer-editor-title"><Input placeholder="请输入标题" ref="writerEditorTitle"/></div>

        <div className="writer-box">
          <ReactQuill
            value={this.state.quillText}
            placeholder='请在这里输入你的文章...'
            onChange={this.handleChange}
            {...quillOpt}
          />
        </div>
        <div className="w-e-text" ref="editorElemOutput" style={{minHeight: '0'}}>

        </div>
      </div>
    )
  }
}

export default WriterReactQuill;
