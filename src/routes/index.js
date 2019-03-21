import React from 'react'
import { Router, Route, IndexRoute, hashHistory, browserHistory, Redirect } from 'react-router'
import { Provider } from 'react-redux';

import store from '../redux/store';

import App  from '../layouts/App'

import Home     from '../containers/home'
import Forum    from '../containers/forum'
import Sports   from '../containers/sports'

// 用户登录、注册、修改、设置等页面
import Writer    from '../containers/writer';   //登录页
import Login    from '../containers/login';   //登录页
import Register from '../containers/register';  //注册页
import Setting  from '../containers/setting';  //设置页
import Profile  from  '../containers/setting/Profile';  //基本资料
import Account  from  '../containers/setting/Account';  //账户设置

// 个人主页
import User         from '../containers/user';  //个人主页
import ArticleNav   from '../components/articleNav';  //文章
import Columns      from '../components/columns';  //专栏
import Answers      from '../components/answers';  //回答
import Asks         from '../components/asks';  //提问
import Activities   from '../components/activities';  //动态
import Collections  from '../components/collections';  //收藏
import Following    from '../components/following';  //关注

// 文章详情页
import Article  from '../containers/article'; //文章详情页


export default (
  <Provider store={store}>
    <Router history={ hashHistory }>
      <Redirect from="/" to="/home" />
      <Route path="/" component={App}>
        <Route path="/home" component={Home}>
          <IndexRoute component={ArticleNav} />
        </Route>
        <Route path="/forum" component={Forum} />
        <Route path="/sports" component={Sports} />

        <Route path="/writer" component={Writer} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/setting" component={Setting}>
          <Route path="/setting/profile" component={Profile}/>
          <Route path="/setting/account" component={Account}/>
        </Route>

        <Route path="/article/:id" component={Article}/>

        <Route path="/user/:userId" component={User} >
          <IndexRoute component={ArticleNav} />
          <Route path="/user/:userId/columns" component={Columns}/>
          <Route path="/user/:userId/answers" component={Answers}/>
          <Route path="/user/:userId/asks" component={Asks}/>
          <Route path="/user/:userId/activities" component={Activities}/>
          <Route path="/user/:userId/collections" component={Collections}/>
          <Route path="/user/:userId/following" component={Following}/>
        </Route>

      </Route>
    </Router>
  </Provider>
)

  // <Redirect from="/" to="/home" />
  // <Route path="/people/:username" component={People}>
  //
  // </Route>
