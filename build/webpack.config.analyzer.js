const merge = require('webpack-merge');
const prodWebpackConfig = require('./webpack.config.prod');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(prodWebpackConfig, {
  plugins: [
      new BundleAnalyzerPlugin() // 打包分析
  ]
});