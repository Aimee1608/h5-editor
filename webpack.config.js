const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: path.join(__dirname, 'src/index.tsx'),
  output: {
    path: path.join(__dirname, 'dist'), // 打包后的输出目录
    filename: 'main.js' //打包后的js文件名
  },
  devtool: 'source-map', // 生成单独的完整的source-map,方便调整
  devServer: {
    port: 8080, // 开发服务器的端口号
    hot: true, // 启动热更新
    static: { // static: ['assets']
      directory: path.join(__dirname, 'public')
    },
    // contentBase: path.join(__dirname, 'public'), // 静态文件根目录
    historyApiFallback: { //可能会用到浏览器路由，刷新的时候需要重定向到根文件
      index: './index.html'
    }
  },
  resolve: {
    alias: { // 配置解析的别名， 方便编写引入的路径
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'node_modules')
    }, // 查找模块时候的扩展名
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  module: { // loader
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader', // ts-loader 性能比较差
        options: {
          presets: [
            "@babel/preset-env", // 解析es+
            "@babel/preset-react", // 解析react jsx语法
            "@babel/preset-typescript" // 解析typescript
          ],
          plugins: [ // babel-plugin-import 可以实现按需加载的babel插件
            ['import', { libraryName: 'antd', style: 'css' }]
          ]
        },
        include: path.resolve('src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3 // import 文件要导入之前需要经过几个loader处理
            }
          },
          {
            loader: 'postcss-loader', // 加入厂商的兼容性前缀
            options: {
              postcssOptions: {
                plugin: ['autoprefixer']
              }
            }
          },
          {
            loader: 'px2rem-loader', // 可以把px单位变成rem单位
            options: {
              remUnit: 75, // 1rem对应的是75px
              remPrecesion: 8 // 计算后的小树精度是8位
            }
          },
          "less-loader" // 把less 编译成css
        ]
      },
      {
        test: /\.(jpg|png|gif|svg|jpeg)/,
        type: 'asset' // 以前是url-loader 或者file-loader webpack5之后不需要
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]

}