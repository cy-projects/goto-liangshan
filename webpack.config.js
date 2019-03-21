var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var entryMap = require('./webpack.entry.js');

//区分开发、生产环境
var mode = require('yargs').argv.env;
// console.log(mode);

var rootPath = path.resolve(__dirname, './'); //项目根目录
var node_modules = path.resolve(__dirname, './node_modules'); //依赖目录
var src = path.resolve(__dirname, './src'); //开发目录
var dist = path.resolve(__dirname, './dist'); //打包目录

var getEntries = function() {
  var entries = {};

  // for (var key in entryMap) {
  //   var val = './app/src/scripts/' + entryMap[key];
  //
  //   entries[key] = val;
  // }

  //打包时加上公用的css和js
  entries['main'] = [

    path.join(src, 'main.js')
  ];
  // entries['base'] = [ path.join(src, 'base.js'), path.join(src, 'base.css')];
  entries['vendors'] = [
    "babel-polyfill",
    "es6-promise",
    "xss",
    'axios',
    'react',
    'react-dom',
    'react-router',
    'prop-types',
    'redux',
    'react-redux',
    'redux-thunk',
    'react-router-redux',
    'wangeditor',
    'simplemde',

    path.join(src, 'utils/city.js'),
  ];

  return entries;
}

module.exports = function(mode){
  console.log(mode);
  var config = {
    // 入口文件
    entry: getEntries(),

    // 输出文件
    output: {
      path: dist,
      filename: (mode == 'development') ? '[name].js' : '[name].[chunkHash:8].js',
      // publicPath: './',
    },

    devServer: {
      contentBase: dist,
      historyApiFallback: true,
      // hot: true,
      inline: true,
      stats: {color: true},
      // host: '101.200.156.21',
      // port: '8080',

      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      proxy: {
        '/*': {
          // target: 'https://www.bugclose.com',
          target: 'http://study.zuimeia.com',
          // pathRewrite: {'^/column' : '/column'},
          changeOrigin: true,
          secure: false,
        }
     }
    },

    devtool: "cheap-eval-source-map",
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        // 自定义路径别名
        util: path.join(src, 'utils'),
        actions: path.join(src, 'actions'),
        // ASSET: path.join(src, 'assets'),
        // COMPONENT: path.join(src, 'components'),
        // ROUTE: path.join(src, 'routes'),

      }
    },
    resolveLoader: {
      modules: ['node_modules']
    },

    //定义第三方直接用Script引入而不需要打包的类库
    externals: {
      jquery: "jQuery",
    },

    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(woff|svg|eot|ttf)(\?.*)?$/,
          loader: "url-loader?limit=50000"  // 50000B 以下使用 base64
        },
        {
          test: /\.(png|jpg|gif|jpeg)$/,
          loader: "url-loader?limit=819200"
        }
      ]
    },

    plugins: [
      //提供Vue和$的全局变量
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: "jquery",
        "window.jQuery": "jquery"
      }),

      new HtmlWebpackPlugin({
        title: '上梁山',
        filename: 'index.html',
        template: path.join(src, "index.html")
      }),

      //根据模块相对路径生成hashId来代替模块的数字id
      new webpack.HashedModuleIdsPlugin(),

      //把公用文件单独打包
      //名字会自动使用output的filename
      new webpack.optimize.CommonsChunkPlugin({// 公共代码分离打包
        // name: 'manifest',
        names: ['vendors', 'manifest'],
        minChunks: Infinity
      }),

      new CopyWebpackPlugin([ // 复制高度静态资源
        {
          from: path.join(rootPath, 'static'),
          // to: dist,
        },
      ],{
        ignore: ['*.md']
      }),

      new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        },
        __DEV__: mode === 'development',
        __PROD__: mode === 'production',
      }),
    ],
  };

  if (mode == 'production'){
    config.module.rules = (config.module.rules || []).concat([
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap', 'sass-loader?sourceMap'],
        })
      },
    ])

    config.plugins = (config.plugins || []).concat([
      //清空打包目录(用于在building之前删除你以前build过的文件)
      new CleanWebpackPlugin( dist , {
        root: rootPath,
        verbose: false
      }),

      //每个entry, 打一个包
      //如果使用了异步组件，css还是打一个大包
      //如果是dev环境, css不要打单独的包
      new ExtractTextPlugin({
        filename: '[name].[hash:8].css',
        allChunks: true
      }),

      //清除注释
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: {
      //     warnings: false,
      //     // drop_debugger: true,
      //     // drop_console: true
      //   }
      // }),

    ])
  } else{
    config.module.rules = (config.module.rules || []).concat([
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
      },
    ])

    config.plugins = (config.plugins || []).concat([

    ])
  }

  return config;
}
