安装依赖

```
npm i react react-dom @types/react @types/react-dom react-router-dom @types/react-router-dom @ant-design/icons antd redux react-redux @types/react-redux redux-thunk redux-logger @types/redux-logger redux-promise @types/redux-promise connected-react-router classnames @types/classnames react-transition-group @types/react-transition-group express express-session body-parser cors axios --save
```

```
npm i webpack webpack-cli webpack-dev-server html-webpack-plugin babel-loader typescript @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-plugin-import style-loader css-loader postcss-loader less-loader less autoprefixer px2rem-loader lib-flexible eslint @types/eslint --save-dev
```

babel include 和exclude 一般只配一个 如果都配 exclude 优先级更高

importLoaders 要经历多轮处理 是css-loader 的属性 处理导入的less 文件的视频

1rem 对应75 怎么来的 设计稿官渡都是750

lint-staged 可以检查提交的文件