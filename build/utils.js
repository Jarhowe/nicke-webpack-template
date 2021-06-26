'use strict';
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const Config = require('../webpack.config');

const setAssetsFilePath = (_path) => {
    const assetsSubDirectory = process.env.NODE_ENV === 'development' ? Config.dev.assetsSubDirectory : Config.build.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
};

// 资源输出路径处理函数，方便其他地方调用
exports.assetsPath = (_path) => setAssetsFilePath(_path);

// 创建错误弹窗提示
exports.createNotifierCallback = () => {
    const notifier = require('node-notifier');
    return (severity, errors) => {
        if (severity !== 'error') return;
    
        const error = errors[0];
        const filename = error.file && error.file.split('!').pop();
    
        notifier.notify({
            title: '错误提示',
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'Error.png')
        });
    };
};

// 从工作目录下找路径
exports.resolve = function(dir) {
    return path.resolve(__dirname, '..', dir);
};


// 引入dll插件
exports.useDllPlugins = function() {
    // 读取当前命令行目录
    const cwd  = process.cwd();
    let plugins = [];
    if (Config.build.dllEnable) {
        const targetAir = path.join(cwd, 'dll');
        const dllFilesExists = fs.existsSync(targetAir);
        if (!dllFilesExists) {
            console.log(chalk.red('您未打包第三方库依赖库, 已跳过此步.\n'));
        }
        // 存在dll目录
        if (dllFilesExists) {
            const dllFiles = (fs.readdirSync(path.resolve(__dirname, '../dll'))) || [];
            dllFiles.forEach(fileNameItem => {
                if (/.*\.dll.js$/.test(fileNameItem)) {
                    plugins.push(new AddAssetHtmlPlugin({
                        filepath: path.resolve(__dirname, '../dll', fileNameItem),
                        outputPath: setAssetsFilePath('library'),
                        publicPath: setAssetsFilePath('library'),
                        includeSourcemap: false,
                        hash: true
                    }));
                }
                if (/.*\.manifest.json$/.test(fileNameItem)) {
                    plugins.push(new webpack.DllReferencePlugin({
                        manifest: path.resolve(__dirname, '../dll', fileNameItem)
                    }));
                }
            });
        }
    }
    return plugins;
};