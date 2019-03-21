import React, { Component } from 'react'
import WriterButton from './WriterButton'
import { Button, message, Input } from 'antd'
import './index.scss'

import SimpleMDE from 'simplemde';
import 'simplemde/debug/simplemde.css';
import xss from 'xss'

import 'github-markdown-css/github-markdown.css'

import { addClass } from 'util/baseFn'

class WriterSimplemde extends Component {
  constructor(...props){
    super(...props);
    this.state = {
      simplemdeHtml: '',
    }
  }
  handleChange = (value) => {
    this.setState({
      quillText: value
    })
  }
  writerPublish = () => {
    // console.log(this.state.simplemdeHtml);

    var div = document.createElement('div');
    div.innerHTML = this.state.simplemdeHtml;

    this.refs.editorElemOutput.appendChild(div);
  }
  componentDidMount(){
    let self = this;
    let { writerEditorInitValue } = self.props;

    let simplemde = new SimpleMDE({
        element: self.refs.editorEntry, //设置绑定的DOM元素
        autoDownloadFontAwesome: false,  //为true时会网上强制下载FontAwesome字体图标
        autofocus: true,  //自动获取焦点
        status: true,  //为flase时隐藏status bar
        hideIcons: [],  //要隐藏的图标名称数组。 可以用于隐藏默认显示的图标，而不完全自定义工具栏。
        showIcons: [],  //要隐藏的图标名称数组， 可以用于显示默认隐藏的图标，而不完全自定义工具栏。
        // indentWithTabs: true,  //为false时，缩进使用空格而不是制表符，默认值true。
        initialValue: '', //为editor设置了默认值
        placeholder: writerEditorInitValue, //设置editor的占位内容
        // previewRender:  ,//定义解析纯文本Markdown和返回HTML时的自定义函数，在用户预览时使用
        // promptURLs: , //为true时点击链接或图像将显示一个prompt窗口，要求提供链接或图像URL，默认值true。
        // spellChecker:   , //是否启用拼写检查，默认值true。

        toolbar: [
          'bold', 'italic', 'heading', '|',
          'quote', 'unordered-list', 'ordered-list', '|',
          'code', 'link', 'image', 'table', 'horizontal-rule',  '|',
          'preview', 'side-by-side', 'fullscreen', '|',
          'guide',
        ],
    });

    simplemde.codemirror.on("change", function(){
      let testPlain = simplemde.value();
      let testMarkdown = simplemde.markdown(testPlain); //转换为markdown文本
      let testXss = xss(testMarkdown); //白名单

      self.setState({
        simplemdeHtml: testXss
      })
    });


  }
  componentDidUpdate(){
    let simplemdeEditorToolbar = document.getElementsByClassName('editor-toolbar')[0];
    simplemdeEditorToolbar.style.right = this.props.writerFixedX;
  }
  render(){
    const { writerProText, toggleWriteProText, writerFixedX } = this.props;



    return (
      <div className="writer-simplemde">
        <div className="writer-fixed" style={{ right: writerFixedX }}>
          <div className="writer-opt">
            <WriterButton
              writerProText={ writerProText }
              toggleWriteProText={ toggleWriteProText }
              writerPublish={ this.writerPublish }
            />
          </div>
          <div className="writer-editor-title"><Input placeholder="请输入标题" ref="writerEditorTitle"/></div>
        </div>

        <div className="writer-box simplemde">
          <textarea name="field" ref="editorEntry" cols="30" rows="10"></textarea>
        </div>
        <div className="w-e-text markdown-body" ref="editorElemOutput" style={{minHeight: '0'}}>

        </div>
      </div>
    )
  }
}

export default WriterSimplemde;
