'use strict';
const path = require('path');
const Config = require('../webpack.config');

// 资源输出路径处理函数，方便其他地方调用
exports.assetsPath = function(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'development' ? Config.dev.assetsSubDirectory : Config.build.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
};

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
}