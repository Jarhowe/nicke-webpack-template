'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Config = require('../webpack.config');
const Utils = require('./utils');
const Settings = require('../src/settings');
const BaseWebpackConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CommonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader'
];

const prodWebpackConfig = merge(BaseWebpackConfig, {
    mode: 'test',
    output: {
        path: Config.build.assetsRoot,
        filename: Utils.assetsPath('js/[name].[chunkhash:8].js'),
        chunkFilename: Utils.assetsPath('js/[name].[chunkhash:8].js')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...CommonCssLoader]
            },
            {
                test: /\.(sass|scss)?$/,
                use: [...CommonCssLoader, 'sass-loader']
            }
        ]
    },
    // 优化
    optimization: {
        // 提升作用域
        concatenateModules: true,
        // 定义压缩配置
        minimizer: [
            // 压缩js
            new TerserPlugin({
                // 启用文件缓存
                cache: true,
                // 启用多线程提高打包速度
                parallel: true,
                // 额外配置
                terserOptions: {
                    // 使用源映射将错误消息位置映射到模块
                    sourceMap: Config.build.productionSourceMap
                }
            }),
            // 压缩css
            new OptimizeCssAssetsWebpackPlugin({
                cssProcessorOptions: Config.build.productionSourceMap ? {
                    safe: true,
                    map: {
                        inline: false
                    }
                } : {
                    safe: true
                }
            })
        ],
        // 拆包配置 
        splitChunks: {
            chunks: 'all', // 选择哪些块进行优化: initial(初始化) | async(动态加载) | all(全部)
            minSize: 30000, // 大于30k会被webpack进行拆包，默认0
            minChunks: 1, // 被引用次数大于等于这个次数进行拆分，默认1
            maxAsyncRequests: 5, // 最大异步请求数， 默认1
            maxInitialRequests: 5, // 最大初始化请求数，默认1
            name: true,
            automaticNameDelimiter: '.', // 打包分隔符
            cacheGroups: {
                // 所有入口src下公共模块
                commonChunk: {
                    name: 'commonChunk',
                    filename: Utils.assetsPath('js/[name].[chunkhash:8].js'),
                    test(module, chunks) {
                        let res = (
                            module.resource && /\.js$/.test(module.resource) && 
                            module.resource.indexOf(path.join(__dirname, '../src')) === 0 &&
                            chunks.length >= Config.build.minChunks
                        );
                        return res;
                    },
                    chunks: 'all',
                    minSize: 0,
                    enforce: true,
                    minChunks: 1
                },
                // 所有入口node_modules下公共模块
                commonVendor: {
                    name: 'commonVendor',
                    filename: Utils.assetsPath('js/[name].[chunkhash:8].js'),
                    test(module, chunks) {
                        let res = (
                                module.resource && /\.js$/.test(module.resource) &&
                                    module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0 &&
                                        chunks.length >= Config.build.minChunks
                        );
                        return res;
                    },
                    chunks: 'all',
                    minSize: 0,
                    enforce: true,
                    minChunks: 1
                }
            }
        },
        runtimeChunk: {
            name: "manifest"
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: require('../env/test.env')
            }
        }),
        // 清理上一次打包记录
        new CleanWebpackPlugin(),
        // 引入dll动态链接库
        ...(Utils.useDllPlugins()),
        // 压缩html
        new HtmlWebpackPlugin({
            filename: Config.build.index,
            template: 'index.html',
            title: Settings.title || 'Document',
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        }),
        // 拆分css文件
        new MiniCssExtractPlugin({
            filename: Utils.assetsPath('css/[name].[chunkhash:8].css'),
            chunkFilename: Utils.assetsPath('css/[name].[chunkhash:8].css')
        }),
        // 将整个文件复制到构建输出指定目录下
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../static'),
                    to: Config.build.assetsSubDirectory,
                    globOptions: {
                        ignore: ['.*']
                    }
                }
            ]
        }),
        // 保持chunkId不变
        new webpack.NamedChunksPlugin(),
        // 保持moduleID稳定
        new webpack.HashedModuleIdsPlugin()
    ]
});


// 启动gzip压缩
if (Config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');
    prodWebpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + Config.build.productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

// 启动分析模块
if (Config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = prodWebpackConfig;