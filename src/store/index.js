import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex);

// 它将自动需要来自模块文件的所有vuex模块
const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});

const store = new Vuex.Store({
    state: {},
    getters: {
        ...getters
    },
    mutations: {},
    actions: {},
    modules
});

export default store;