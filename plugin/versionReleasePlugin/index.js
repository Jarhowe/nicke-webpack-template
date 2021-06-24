const fs = require('fs');
const path = require('path');
const packageConfig = require('../../package.json');

class SetVersionReleasePlugin {
    constructor(options) {
        const userOptions = options || {};
        const defaultOptions = {
            open: true,
            projectName: userOptions.projectName === undefined ? packageConfig.name : userOptions.projectName,
            versionFilePath: userOptions.versionFilePath === undefined ? 'auto' : userOptions.versionFilePath,
            outputPath: path.resolve(__dirname, '../../dist/version.txt')
        };
        this.processEnv = process.env.NODE_ENV || null;
        this.options = Object.assign(defaultOptions, userOptions);
    }

    apply(compiler) {
        const that = this;
        compiler.hooks.emit.tapAsync('SetVersionReleasePlugin', (compilation, callback) => {
            that.findVersionFile();
            that.buildFileSetVersionBanner(compilation);
            callback();
        });

        compiler.hooks.done.tap('SetVersionReleasePlugin', () => {
            this.writeVersionFile();
        });
    }

    bannerConfig() {
        const config = {
            projectName: this.options.projectName,
            author: packageConfig.author,
            version: this.version,
            createDate: new Date().toLocaleString()
        };
        return config;
    }

    findVersionFile() {
        const getVersionFilePath = this.options.versionFilePath === 'auto' ? path.resolve(__dirname, '../../src/version.json') : this.options.versionFilePath;
        const versionFileConfigMap = this.getVersionFileContent(getVersionFilePath);
        // 读取配置文件版本号
        if (versionFileConfigMap) {
            const getVersionMap = versionFileConfigMap[this.processEnv] || {};
            this.version = getVersionMap.version === undefined ? 'v1.0.0' : getVersionMap.version;
        }
    }

    writeVersionFile() {
        fs.writeFileSync(this.options.outputPath, this.version);
    }

    buildFileSetVersionBanner(compilation) {
        Object.keys(compilation.assets).forEach(fileNameItem => {
            const fileItemExtName = path.extname(fileNameItem);
            const fileItemContent = compilation.assets[fileNameItem];
            if (['.js', '.css'].indexOf(fileItemExtName) > -1) {
                this.injectBanner(fileItemContent, this.bannerConfig());
            }
        });
    }
    
    injectBanner(assets, content = {}) {
        const configTag = 
        '/**\n' + 
        `* Project: ${content.projectName}\n` + 
        `* Author: ${content.author}\n` + 
        `* Version: ${content.version}\n` + 
        `* CreateDate: ${content.createDate}\n` + 
        `*/\n`;
        const source = configTag + assets.source();
        assets.source = () => source;
    }

    getVersionFileContent(filePath) {
        if (!filePath) return '';
        const versionTextSync = fs.readFileSync(filePath);
        const versionResultToString = versionTextSync.toString();
        if (versionResultToString && versionResultToString !== '') {
            return JSON.parse(versionResultToString);
        }
        return '';
    }


};

module.exports = SetVersionReleasePlugin;