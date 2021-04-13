import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({showSpinner: false});

Vue.use(Router);

/**
 * 静态路由表
 */
const constantRouter = [
    {
        path: '/',
        name: 'demo',
        component: () => import('@/page/common/demo')
    }
];

const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouter
});

// 路由拦截配置
router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
    NProgress.done();
});

router.afterEach((to, next, from) => {
    NProgress.done();
});

export default router;