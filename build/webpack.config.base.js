const Config = require('../webpack.config');
const path = require('path');
const Utils = require('./utils');
const { VueLoaderPlugin } = require('vue-loader');

// 配置处理资源hash问题，除了开发不需要hash，其余为hash
const assetsHashName = process.env.NODE_ENV === 'development' ? '[name].[ext]' : '[name].[hash:7].[ext]';

module.exports = {
    // webpack 处理打包文件的时候的初始目录
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    output: {
        // 配置输出目录
        path: Config.build.assetsRoot,
        // 配置输出文件名
        filename: '[name].[hash:8].js',
        // 配置资源引用的路径
        publicPath: process.env.NODE_ENV === 'development' ? Config.dev.assetsPublicPath : Config.build.assetsPublicPath
    },
    resolve: {
        // 设置扩展名
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.scss', '.less', '.json'],
        // 设置别名
        alias: {
            'vue$': Utils.resolve('node_modules/vue/dist/vue.min.js'),
            '@': Utils.resolve('src'),
            '@api': Utils.resolve('src/api'),
            '@assets': Utils.resolve('src/assets'),
            '@style': Utils.resolve('src/assets/styles'),
            '@images': Utils.resolve('src/assets/images'),
            '@components': Utils.resolve('src/components'),
            '@utils': Utils.resolve('src/utils')
        }
    },
    module: {
        // 忽略对没采用模块化的模块进行递归解析
        noParse: [/vue\.min\.js/],
        rules: [
            {
                enforce: 'pre',
                test: /\.(jsx?|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                // 处理vue资源
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                // 处理js/jsx资源
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                // 缩小命中范围, 减少构建时间
                include: [
                    Utils.resolve('src'),
                    Utils.resolve('node_modules/webpack-dev-server/client')
                ],
                use: [
                    // 通过cacheDirectory选项开启支持缓存
                    'babel-loader?cacheDirectory',
                    {
                        loader: 'eslint-loader',
                        options: {
                            fix: true
                        }
                    }
                ]
            },
            {
                // 处理svg资源
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                // 排除node_modules资源
                exclude: /node_modules/,
                include: [
                    // 指定目录编译svg资源
                    Utils.resolve('src/assets/svg-icons')
                ],
                options: {
                    symbolId: 'icon-[name]'
                }
            },
            {
                // 处理图片资源
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // 配置资源大小限制，超出则转让base64处理
                    limit: Config.build.base64Limit,
                    // 关闭url-loader中es6模块化解析，转让为commonjs解析
                    esModule: false,
                    // 配置资源命名
                    name: Utils.assetsPath(`image/${assetsHashName}`)
                }
            },
            {
                // 处理音频资源
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: Config.build.base64Limit,
                    name: Utils.assetsPath(`media/${assetsHashName}`)
                }
            },
            {
                // 处理字体资源
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: Config.build.base64Limit,
                    name: Utils.assetsPath(`fonts/${assetsHashName}`)
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};