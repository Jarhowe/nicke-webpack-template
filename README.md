<h1 align="center">nicke-webpack-template</h1>

<div align="center">基于webpack4配置Vue+Element开箱即用的单页面前端模板</div>


## 目录

* [一、特征](#特征)
* [二、启动](#启动)
* [三、发布](#发布)
* [四、规范](#规范)
* [五、兼容](#兼容)


## 特征
1. 区分development、test、production环境, 可自由选择并进行开发
2. 支持中/英国际化
3. 支持按需引入Element-ui组件
4. Vue-router 路由管理
5. Vuex 状态管理
6. Axios 封装及接口管理
7. 支持DLL动态链接库，提升打包速度
8. 支持Report打包分析
9. 添加git提交代码规范
10. 增加版本号，并通过轮询检测版本更新，做到更新提示
## 启动

```
＃克隆该项目
git clone https://github.com/Jarhowe/nicke-Webpack-template.git

# 进入项目目录
cd nicke-webpack-template

# 安装依赖
npm install/yarn install

# 启动服务
npm install/yarn start

```

## 打包

```
# 1、启动DLL动态链接库优化打包速度，可webpack.config.js配置下dllEnable选择为true即可【推荐使用，减少模块不能再次被打包】
yarn dll

# 打包到测试环境
yarn test

# 打包到生产环境
yarn build:prod
```

## 规范

```
# 1、生成version日志
yarn version

# 2、提交代码到git代码仓库
yarn commit
```

## 兼容

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions