/**
 * 自动引入svg文件
 */
import Vue from 'vue';
import SvgIcon from './Svg-icon';
Vue.component('svg-icon', SvgIcon);
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('@/assets/svg-icons', true, /\.svg$/);
requireAll(req);