const path = require('path');

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // proxyTable
        proxyTable: {},
        // Dev Server settings
        host: '0.0.0.0',
        // Port
        port: 8080,
        // 是否自动打开浏览器
        autoOpenBrowser: false,
        // source maps
        devtool: 'cheap-module-eval-source-map',
        // 是否显示错误通知
        notifyOnErrors: true,
        // 是否显示编译错误
        errorOverlay: true,
        poll: false
    },
    build: {
        // Template for index.html
        index: path.resolve(__dirname, './dist/index.html'),
        // build Paths
        assetsRoot: path.resolve(__dirname, './dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // 设置限制资源大小，让资源转base64处理
        base64Limit: 8 * 1024,  // 8kb
        // source Maps
        productionSourceMap: false,
        devtool: '#source-map',
        // Gzip
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // 是否引入dll文件
        dllEnable: true,
        // 选择要打包到dll模块
        dllModule: {
            vendor: ['vue/dist/vue.min.js', 'vue-router'],
            lodash: ['lodash'],
            jquery: ['jquery'],
            axios: ['axios'],
            dayjs: ['dayjs']
        }
    },
    // 启动版本
    versionEnable: true
};