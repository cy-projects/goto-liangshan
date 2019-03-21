import { message } from 'antd'

// 删除首尾空格
export function trim(str){
  if (str == '' || str == undefined){
    return '';
  } else{
    return str.replace(/(^\s*)|(\s*$)/g,'')
  }

}
//跨浏览器添加事件
export  function addEvent(type, obj, fn){
  if(obj.addEventListener){
    obj.addEventListener(type, fn, false);
  } else if (obj.attachEvent){
    obj.attachEvent('on'+ type, fn);
  }
}
//跨浏览器移除事件
export  function removeEvent(type, obj, fn){
  if (obj.removeEventListener){
    obj.removeEventListener(type, fn, false);
  } else if (obj.detachEvent){
    obj.detachEvent('on'+ type, fn);
  }
}
//阻止默认行为
export function prevent(event){
	var e = event || window.event;
	if (typeof e.preventDefault != 'undefined'){ //W3C
		e.preventDefault();
	} else {  //IE
		e.returnValue = false;
	}
}
//阻止冒泡
export function stopPro(event) {
  var e = event || window.event;
  if (typeof e.stopPropagation != 'undefined') {
      e.stopPropagation();
  } else {
      e.cancelBubble = true;
  }
}

//判断class是否存在
export function hasClass(element, className){
	// return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	return new RegExp('(\\s|^)' + className + '(\\s|$)').test(element.className);
}
//添加一个class
export function addClass(element, cName){
	if ( !hasClass(element, cName) ) {
		element.className += ' ' + cName;
	}
}
//移除一个class
export function removeClass(element, cName){
	if ( hasClass(element, cName) ){
		element.className = element.className.replace(new RegExp( '(\\s|^)' + cName + '(\\s|$)' ), ' ');
	}
}

//获取数据类型
export function getType(item){
  if(item === null) return "null";
  if(item === undefined) return "undefined";

  var str = Object.prototype.toString.call(item);
  return str.slice(8, -1).toLowerCase();
}

//限制字符串个数
export function checkStrNum(th, num, ){
    var val = th.value;
    if (val.length > num){
        message.warn('最多允许输入' + num + '个字符');
        th.value = val.substr(0,num);
        return false;
    }else{
        th.value = val;
    }
}

// cookie
export const bugCookie = {
  set: function (name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
  },
  get: function (name) {
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
  },
  del: function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=this.getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
  }
};
// localStorage
export const bugStorage = {
  set: function(name,value){
    if(window.localStorage){
      let type = getType(value);
    	let isStringifyType = ['object', 'array'];
    	let normalType = ['string', 'number'];

      if ( isStringifyType.indexOf(type) > -1 ){
        localStorage.setItem(name, JSON.stringify(value));
      } else if ( normalType.indexOf(type) > -1 ){
        localStorage.setItem(name, value);
      } else {
        localStorage.setItem(name, value);
      }
    }else{
      message.msg('您的浏览器版本过低，暂不支持本地存储，请使用高版本浏览器');
    }
  },
  get: function(name){
    return localStorage.getItem(name);
  },
  del: function(name){
    localStorage.removeItem(name);
  },
  clearItem: function(){
    return localStorage.clear();
  },
  isExist : function(name){
    if(localStorage.getItem(name))
        return true;
    else
        return false;
  }

};

//获取某一个元素到最外层顶点的距离
export function getPos(ele){
  var left = ele.offsetLeft;
  var top  = ele.offsetTop;
  var parent = ele.offsetParent;

  while (parent != null){
    left += parent.offsetLeft;
    top  += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return {
    left:left,
    top:top
  }
}

//获取视口大小,相当于 $(window).width()
export function getViewSize(){
  let de = document.documentElement;
	let db = document.body;
	let viewW = (de.clientWidth == 0 ? db.clientWidth : de.clientWidth);
	let viewH = (de.clientHeight == 0 ? db.clientHeight : de.clientHeight);

	return {
    width: viewW,
    height: viewH
  };
}

//获取页面大小
export function getPageSize(){
  var a = document.body;
	var f = document.documentElement;
	var d = document.compatMode == "BackCompat" ? a : f;

  return {
    width: Math.max(a.scrollWidth, f.scrollWidth, d.clientWidth),
    height: Math.max(a.scrollHeight, f.scrollHeight, d.clientHeight)
  }
}

// 获取滚动条位置
export function getScroll() {
		return document.body.scrollTop ? {
			left: document.body.scrollLeft,
			top: document.body.scrollTop
		} : {
			left: document.documentElement.scrollLeft,
			top: document.documentElement.scrollTop
		}
	}

// 设置滚动条位置
export function setScrollTop(value){
	document.documentElement.scrollTop = value;
	document.body.scrollTop = value;
}
export function setscrollLeft(value){
	document.documentElement.scrollLeft = value;
	document.body.scrollLeft = value;
}

// 检查是否滚动到了底部
export function isScrollBottom(){
  var h1 = getViewSize().height + getScroll().top;
  var h2 = getPageSize();

  return (h1 == h2);
}


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

// 图片上传限制
export function beforeUploadImg(file){
  console.log('上传限制', file);

  let allow = ['jpeg', 'jpg', 'bmp', 'gif', 'png'];
  let allowSize = 2;
  let arr = file.name.split(".");
  let imgSize = file.size / 1024 /1024;

  const isNameOk = function(){
    if (arr.length > 1){
      let arrLast = (arr[arr.length-1]).toLowerCase();

      if (allow.indexOf(arrLast) > -1) return true;
      return false;
    }
    return false;
  }

  if (!isNameOk()){
    message.error('上传图片格式不正确！');
  }

  const isSizeOk = imgSize < allowSize;

  if (!isSizeOk){
    message.error('上传图片不能超过2M！')
  }

  return isNameOk() && isSizeOk
}


//返回双数
export function toDouble(n) {
  return n < 10 ? '0' + n : n;
};

// 传入毫秒数
// hasTime为true得到yy-mm-dd HH:ii
// hasTime为false得到yy-mm-dd
// 不传默认为true
export function getTimeString(t, hasTime, sep){
  let d = new Date(t);
  let dateArr = [], timeArr = [];

  sep = sep ? sep : '-';

  dateArr[0] = d.getFullYear();
  dateArr[1] = toDouble( d.getMonth()+1 );
  dateArr[2] = toDouble( d.getDate() );

  timeArr[0] = toDouble( d.getHours() );
  timeArr[1] = toDouble( d.getMinutes() );

  if (arguments.length < 2 || hasTime){
    return dateArr.join(sep) + ' ' + timeArr.join(':');
  } else{
    return dateArr.join(sep);
  }
}

//html 转义
export function HTMLEncode(str) {
  if(typeof str == 'undefined')
      str = '';
  str = str.replace(/\</g,'&lt;');
  str = str.replace(/\>/g,'&gt;');
  str = str.replace(/\n/g,'<br/>');
  // str = str.replace(/\&/g,'&amp;');
  str = str.replace(/\"/g,'&quot;');
  str = str.replace(/\'/g,'&#39;');
  str = str.replace(/\ /g,'&nbsp;');
  str = str.replace(/\    /g,'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
  return str;
}
export function HTMLDecode(str) {
  var s = '';
  if (str.length == 0) return '';
  s = str.replace(/&amp;/g, 	'&');
  s = s.replace(/&lt;/g, 		'<');
  s = s.replace(/&gt;/g, 		'>');
  s = s.replace(/&#39;/g, 	"\'");
  s = s.replace(/&quot;/g, 	'\"');
  s = s.replace(/<br>;/g, 	'\n');
  s = s.replace(/<br\/>;/g, 	'\n');
  s = s.replace(/&nbsp;/g, 	' ');
  return s;
}
