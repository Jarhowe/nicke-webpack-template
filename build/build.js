'use strict';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const Config = require('../webpack.config');
const webpackConfig = require('./webpack.config.prod');

const spinner = ora(`现在为${process.env.NODE_ENV}环境building打包构建, 请稍候...`);
spinner.start();

rm(path.join(Config.build.assetsRoot, Config.build.assetsSubDirectory), err => {
  if (err) throw err;
  webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n');
    
    if (stats.hasErrors()) {
      console.log(chalk.red(' ❌  Build failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan(' ✅  Build complete.\n'));
    console.log(chalk.yellow(' [温馨提示]: 请通过HTTP服务进行访问, 直接通过本地文件是无法直接访问.\n'));
  });
});
