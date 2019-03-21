//兼容包
require('babel-polyfill')
require('es6-promise').polyfill();

import $ from 'jquery';
import Fetch from 'util/fetch.js';

import React from 'react'
import ReactDOM from 'react-dom'

import './main.scss'

//全局数据
import 'util/hub.js';


import route from './routes'

ReactDOM.render(
  route,
  document.getElementById('app'),
)
