const path = require('path');
const Config = require('../webpack.config');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const PROCESS_ENV = process.env.NODE_ENV === 'test' ? require('../env/test.env') : require('../env/prod.env');

const webpackConfig = {
    mode: 'production',
    entry: Config.build.dllModule,
    output: {
        // 输出到当前目录下的static目录
        path: path.resolve(__dirname, '../dll'),
        // 分离出来的文件名称，一个占位符+hash.dll.js  [name]对应的是entry的library
        filename: '[name].dll.js',
        //打包后暴露出的库的名字
        library: '[name]_[chunkhash]_dll'
    },
    optimization: {
        // 提升作用域
        concatenateModules: true,
        // 定义压缩配置
        minimizer: [
            //压缩js
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
            })
        ]
    },
    plugins: [
        // 环境模式
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: PROCESS_ENV
            }
        }),
        // 使用DLLPlugin进行分包处理
        new webpack.DllPlugin({
            context: __dirname,
            // 打包后library.json中的name
            path: path.join(__dirname, '../dll', '[name].manifest.json'),
            //打包后生成[name].json的路径
            name: "[name]_[chunkhash]_dll"
        })
    ]
};

module.exports = webpackConfig;