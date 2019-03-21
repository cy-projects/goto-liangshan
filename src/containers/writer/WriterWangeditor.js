import React, { Component } from 'react'
import WriterButton from './WriterButton'
import { Button, message, Input } from 'antd'
import './index.scss'

import { HTMLDecode, beforeUploadImg } from 'util/baseFn'
import Fetch from 'util/fetch'
import E from 'wangeditor'
import xss from 'xss'

class writerWangeditor extends Component {
  constructor(...props){
    super(...props);
    this.state = {
      editorContent: '',
    }
  }
  componentDidMount() {
    var self = this;
    const editor = new E( this.refs.editorElemToolbar, this.refs.editorElemText );

    // 菜单
    editor.customConfig.menus = [
      'head',  // 标题
      'bold',  // 粗体
      'italic',  // 斜体
      'underline',  // 下划线
      // 'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      'emoticon',  // 表情
      'image',  // 插入图片
      'table',  // 表格
      // 'video',  // 插入视频
      'code',  // 插入代码
      // 'undo',  // 撤销
      // 'redo'  // 重复
    ]

    //粘贴文本的格式 是否过滤(true过滤，false不过滤)
    editor.customConfig.pasteFilterStyle = false;
    editor.customConfig.zIndex = 50;

    //上传图片
    editor.customConfig.customUploadImg = function (files, insert) {
      // console.log(files);

      for (let i = 0; i<files.length; i++){
        let aa = files[i];
        if(beforeUploadImg(aa)){
          upl(aa);
        }
      }

      function upl(file){
        new Fetch('/cgi/image/upload', {
          file: file,
          token: '05ef9ae4d02e44b7ae77df6ed7e20b91',
          projectId: 9091
        },function(res){
          // console.log(res);
          insert(res.root.url);
        },function(res){
          // console.log(res)
        }).postFetch();
      }
    }

    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      //白名单过滤
      let filterHtml = xss(html);
      console.log(filterHtml)

      self.setState({
        editorContent: filterHtml
      })
    }

    editor.create();

  }
  writerPublish = () => {

    var div = document.createElement('div');
		div.innerHTML = this.state.editorContent;

    this.refs.editorElemOutput.appendChild(div);

  }
  writerBackup = () => {}
  render(){
    const { writerFixedX, writerEditorInitValue, writerProText, toggleWriteProText } = this.props;

    return(
      <div className="writer-wangeditor">
        <div className="writer-fixed"  style={{ right: writerFixedX }}>
          <div className="writer-opt">
            <WriterButton
              writerProText={ writerProText }
              toggleWriteProText={ toggleWriteProText }
              writerPublish={ this.writerPublish }
            />
          </div>
          <div className="writer-editor-title"><Input placeholder="请输入标题" ref="writerEditorTitle"/></div>
        </div>


        <div className="writer-box">
          <div ref="editorElemToolbar" class="writer-box-toolbar" style={{ right: writerFixedX }}>
          </div>
          <div ref="editorElemText" class="writer-box-text">
            <p>{writerEditorInitValue}</p>
          </div>
        </div>
        <div className="w-e-text" ref="editorElemOutput" style={{minHeight: '0'}}></div>
      </div>
    )
  }
}

export default writerWangeditor
