import { trim } from 'util/baseFn'

let regPhone = /^[1][34578][\d]{9}$/; //手机号
let regChinese = /[\u4e00-\u9fa5]/; //过滤中文
let regCode = /^[\d]{6}$/;  //6位数字验证码


const errInfo = {
  phone: {
    'empty': '手机号码不能为空！',
    'reg': '请输入正确的手机号！'
  },
  pwd: {
    'empty': '密码不能为空',
    'confirmEmpty': '确认密码不能为空',
    'easy': '密码长度为6-18位，且不能为中文',
    'strict': '6-18位，含有大、小写字母和数字，不能有中文',
    'diff': '两次密码输入不一致'
  },
  validation: {
    'empty': '验证码不能为空',
    'reg': '验证码为 6 个数字'
  },
}

// 手机号
export function phoneReg(value) {
  let str = trim(value);
  return regPhone.test(str);
}

// 验证码
export function codeReg(value){
  let str = trim(value);
  return regCode.test(str);
}

// 简单密码密码（6-18位）
export function easyPwdReg(value) {
  let str = trim(value);

  return !regChinese.test(str)
    && str.length <= 18
    && str.length >=6;
}


export const rules = {
  //手机号码
  phone: (rule, value, callback) => {
    let str = trim(value);

    if (str === '') {
      callback(errInfo.phone.empty);
    } else {
      if (!phoneReg(str)) {
        callback(errInfo.phone.reg);
      }
    }
    callback();
  },

  // 验证码
  code: (rule, value, callback) => {
    let str = trim(value);

    if (str === ''){
      callback(errInfo.validation.empty);
    } else{
      if (!codeReg(str)){
        callback(errInfo.validation.reg);
      }
    }
    callback();
  },

  //单次密码输入校验
  easySinglePwd: (rule, value, callback) => {
    let str = trim(value);

    if (str === ''){
      callback(errInfo.pwd.empty);
    } else{
      if (!easyPwdReg(str)){
        callback(errInfo.pwd.easy);
      }
    }
    callback();
  },
  //二次密码校验
  easyDoublePwd: (rule, value, callback, value1) => {
    let str = trim(value);
    let str1 = trim(value1);

    if (str === ''){
      callback(errInfo.pwd.confirmEmpty);
    } else {
      if (str != str1){
        callback(errInfo.pwd.diff);
      }
    }
    callback();
  }

}
