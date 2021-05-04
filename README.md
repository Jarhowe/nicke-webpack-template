<h1 align="center">nicke-webpack-template</h1>

<div align="center">基于webpack4配置Vue+Element开箱即用的单页面前端模板</div>


**索引**

* [特征](#特征)
* [启动](#启动)
* [发布](#发布)
* [规范](#规范)
* [兼容](#兼容)


## 特征
1. 配置多环境变量
2. 支持中/英国际化
3. 支持Element-ui组件
4. Vue-router 路由管理
5. Vuex 状态管理
6. Axios 封装及接口管理
7. 配置Report打包分析
8. 添加git提交代码规范
9. 支持js/ts混合使用(扩展中...)
10. 常用业务组件封装(扩展中...)

## 启动

```
＃克隆该项目
git clone https://github.com/Jarhowe/nicke-Webpack-template.git

# 进入项目目录
cd nicke-Webpack-template

# 安装依赖
yarn install

# 启动服务
yarn start

```

## 发布

```
# 1、使用dll进行分包处理
yarn dll

# 2、预览发布生产环境
yarn build:prod

# 4、构建分析
# 4-1、可单独配置了一个命令进行打包分析:
yarn build:report

# 4-2、可以通过传参数配置集成到prod
yarn build:prod --report

# 5、扩展选项
# 5-1、在项目目录webpack.config.js开启gzip压缩(默认false)即可,
productionGzip: true

# 5-2、开启gzip后，需要在nginx启动gzip模块
gzip on; 
gzip_buffers 4 16k;
gzip_comp_level 5;
gzip_types text/plain application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg  image/gif image/png;

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
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions