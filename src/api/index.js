import axios from 'axios';
import router from '@/router';
import Config from '@/settings';

import { Notification } from 'element-ui';


// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    timeout: Config.timeout // 设置请求超时时间
});


// request拦截器
service.interceptors.request.use(config => {
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});


// response 拦截器
service.interceptors.response.use(response => {
    return Promise.resolve(response);
}, error => {
    let responseCode = 0;
    
    try {
        responseCode = error.response.status;
    } catch (e) {
        if (error.toString().indexOf('Error: timeout') !== -1) {
            Notification.error({
                title: '网络请求超时',
                duration: 5000
            });
            return Promise.reject(error);
        }
    }
    switch (responseCode) {
        case 400:
            error.message = '请求错误';
            Notification.error({title: '提示信息', message: error.message});
            break;
        case 401:
            // 退出登录
            break;
        case 403:
            router.push('/401');
            break;
        case 404:
            error.message = `请求地址出错: ${error.response.config.url}, 请联系管理员`;
            Notification.error({title: '提示信息', message: error.message});
            break;
        case 408:
            error.message = '请求超时, 请稍后再试';
            Notification.error({title: '提示信息', message: error.message});
            break;
        case 500:
            error.message = '服务器开小差, 请稍后再试';
            Notification.error({title: '提示信息', message: error.message});
            break;
        case 501:
            error.message = '服务未实现, 请联系管理员';
            Notification.error({title: '提示信息', message: error.message});
            break;
        case 502:
            error.message = '网关错误, 请稍后再试';
            Notification.error({title: '提示信息', message: error.message});
            break;
        case 503:
            error.message = '服务不可用, 请联系管理员';
            Notification.error({title: '提示信息', message: error.message});
            break;
        case 504:
            error.message = '网关超时, 请稍后再试';
            Notification.error({title: '提示信息', message: error.message});
            break;
        case 505:
            error.message = 'HTTP版本不受支持, 请联系管理员';
            Notification.error({title: '提示信息', message: error.message});
            break;
        default:
            const error_res = error.response;
            if(error_res.data && error_res.data.message) {
                Notification.error({title: '提示信息', message: error.message});
            }
            break;
    }
    return Promise.reject(error);
});


export default service;