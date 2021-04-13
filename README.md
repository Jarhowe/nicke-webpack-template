<h1 align="center">nicke-webpack-template</h1>

<div align="center">基于webpack4配置Vue+Element开箱即用的单页面前端模板</div>


**索引**

* [安装](#安装)
* [使用](#使用)
* [架构](#架构)


## 安装

```
＃克隆该项目
git clone https://github.com/Jarhowe/nicke-Webpack-template.git

# 安装依赖关系
yarn install

# 编译开发环境
yarn start

```

## 使用

```
# 1、使用dll进行分包处理
yarn dll

# 2、构建生产环境
yarn build:prod

# 3、构建分析
# 3-1、可单独配置了一个命令进行打包分析:
yarn build:report

# 3-2、可以通过传参数配置集成到prod
yarn build:prod --report

# 4、扩展选项
# 4-1、开启gzip压缩
productionGzip: true
# 4-2、开启gzip后，需要在nginx启动gzip模块
gzip on; 
gzip_buffers 4 16k;
gzip_comp_level 5;
gzip_types text/plain application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg  image/gif image/png;

# 5、生成version日志
yarn version

```

## 架构

在大型单页面开发中推荐以下目录架构：
```bash
src
    ├── README.md
    ├── assets                  // 全局资源目录
    │    ├── images             // 图片资源
    │    ├── styles             // 样式配置
    │    ├── svg-icons          // svg图标
    │    └── fonts              // 自定义字体文件
    ├── components              // 公共组件目录
    │    ├── Svg-icon           // svg图标组件
    │    ├── plugins            // 自定义插件
    │    └── index.js           // 组件入口
    ├── i18n                    // 国际化
    │    ├── index.js           // 入口文件
    │    ├── modules
    │       ├── zh.js
    │       └── en.js
    ├── router                  
    │    ├── routers            // 绑定路由组件名字及组件路径
    │    └── index.js           // 路由入口及拦截
    ├── store                   // 状态管理
    │    ├── index.js        
    │    ├── getters.js
    │    └── modules            
    ├── page                    // 页面视图
    │    ├── common
    │    │    └── ...
    │    ├── modules
    │    │    └── ...
    │    └── ...
    ├── App.vue                 // 默认程序入口
    ├── settings.js             // 默认配置
    └── main.js
```
