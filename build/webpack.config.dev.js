'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Config = require('../webpack.config');
const Utils = require('./utils');
const Settings = require('../src/settings');
const BaseWebpackConfig = require('./webpack.config.base');
const portfinder = require('portfinder');
const ip = require('ip');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HOST = process.env.HOST || Config.dev.host;
const PORT = process.env.PORT && Number(process.env.PORT) || Config.dev.port;

const devWebpackConfig = merge(BaseWebpackConfig, {
    mode: 'development',
    // devServer 配置
    devServer: {
        // 输出日志级别
        clientLogLevel: 'warning',
        // since we use CopyWebpackPlugin.
        contentBase: Utils.resolve('dist'),
        // 启用gzip压缩
        compress: true,
        // HMR
        hot: true,
        // 域名
        host: HOST,
        // 端口
        port: PORT,
        // 启动服务后，是否自动打开浏览器
        open: Config.dev.autoOpenBrowser,
        // 当编译出现错误或警告时，是否在浏览器中显示全屏覆盖
        overlay: Config.dev.errorOverlay ? { warnings: false, errors: true } : false,
        // 配置打包文件可在浏览器中访问路径
        publicPath: Config.dev.assetsPublicPath,
        // 配置代理
        proxy: Config.dev.proxyTable,
        // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台, 和 FriendlyErrorsPlugin 配合食用更佳
        quiet: true,
        // 监控的选项
        watchOptions: {
            // 监听文件变动轮询
            poll: Config.dev.poll,
            // 忽略监控的文件夹(RepExp)
            ignored: /node_modules/,
            // 添加构建延迟时间(防抖)
            aggregateTimeout: 300
        }
    },
    module: {
        rules: [
            {
                // 处理css资源
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(sass|scss)?$/,
                use: [
                    'vue-style-loader',
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            }
        ]
    },
    // 优化
    optimization: {
        // 替代new webpack.NoEmitOnErrorsPlugin()
        noEmitOnErrors: true,
        // 替代new webpack.NamedModulesPlugin()
        //热更新显示文件名
        namedModules: true
    },
    // source-map
    devtool: Config.dev.devtool,
    // plugins
    plugins: [
        // 切换模式
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: require('../env/dev.env')
            }
        }),
        // HMR热更新
        new webpack.HotModuleReplacementPlugin(),
        // 设置模板
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            title: Settings.title || 'Document'
        }),
        // 将整个文件复制到构建输出指定目录下
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../static'),
                    to: Config.dev.assetsSubDirectory,
                    globOptions: {
                        ignore: ['.*']
                    }
                }
            ]
        }),
    ]
});


module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = devWebpackConfig.devServer.port;
    portfinder.getPort((err, port) => {
        console.log('asdsad:', err, port);
        if (err) {
            reject(err);
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;
            // add port to devServer config
            devWebpackConfig.devServer.port = port;
        
            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`App running at:\n - Local:   http://localhost:${port} \n - Local:   http://127.0.0.1:${port} \n - Local:   http://${devWebpackConfig.devServer.host}:${port} \n - NetWork:  http://${ip.address()}:${port}`],
                },
                onErrors: Config.dev.notifyOnErrors ? Utils.createNotifierCallback() : undefined
            }));

            resolve(devWebpackConfig);
        }
    });
});