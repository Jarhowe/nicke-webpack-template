import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from '@/store';

// --- style ---
import "@/assets/styles";

// --- Global / plugin ---
import '@/components/svg';
import i18n from '@/i18n';

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app');