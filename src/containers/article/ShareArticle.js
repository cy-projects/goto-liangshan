import React, { Component } from 'react'


class ShareArticle extends Component {
  constructor(...props){
    super(...props)
  }
  render(){
    // let shareUrl = (window.location.href).split("?")[0];
    let shareUrl = 'https://www.bugclose.com/boss/login.html';
    let shareSite = '上梁山'; //site 分享来源
    let shareTitle = '上梁山';   //title 分享标题
    let shareDesc = '默认分享理由'; //默认分享理由
    let shareSummary = '[心无界]是一种怎样的生活状态?'; //summary 分享摘要
    let shareTo = '分享朋友'; //to 分享朋友

    const share = {
      qzone: `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${shareUrl}&site=${shareSite}&title=${shareTitle}&desc=${shareDesc}&summary=${shareSummary}&to=${shareTo}`,
      qq: `http://connect.qq.com/widget/shareqq/index.html?url=${shareUrl}&site=${shareSite}&title=${shareTitle}&desc=${shareDesc}&summary=${shareSummary}&to=${shareTo}`,
      qqWeibo: `http://share.v.t.qq.com/index.php?c=share&a=index&url=${shareUrl}&title=${shareTitle}-${shareSummary}&appkey=801cf76d3cfc44ada52ec13114e84a96`,
      xinlang: `http://service.weibo.com/share/share.php?url=${shareUrl}&title=${shareTitle}-${shareSummary}&appkey=1343713053`,
      // facebook:
    }


    return(
      <div className="share-nav">
        <a target="_blank" href={share.qzone}><img src="./assets/images/share-qzone.png" alt=""/></a>
        <a target="_blank" href={share.qq}><img src="./assets/images/share-qq.png" alt=""/></a>
        <a target="_blank" href={share.qqWeibo}><img src="./assets/images/share-qqWeibo.png" alt=""/></a>
        <a target="_blank" href={share.xinlang}><img src="./assets/images/share-xinlang.png" alt=""/></a>
      </div>
    )
  }
}
export default ShareArticle
