import axios from 'axios';
import router from '@/router';
import Config from '@/settings';
import {isNull} from '@/utils';

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
    let errorMsg = null;
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
            errorMsg = '请求错误';
            break;
        case 403:
            router.push('/401');
            break;
        case 404:
            errorMsg = `请求地址出错: ${error.response.config.url}, 请联系管理员`;
            break;
        case 408:
            errorMsg = '请求超时, 请稍后再试';
            break;
        case 500:
            errorMsg = '服务器开小差, 请稍后再试';
            break;
        case 501:
            errorMsg = '服务未实现, 请联系管理员';
            break;
        case 502:
            errorMsg = '网关错误, 请稍后再试';
            break;
        case 503:
            errorMsg = '服务不可用, 请联系管理员';
            break;
        case 504:
            errorMsg = '网关超时, 请稍后再试';
            break;
        case 505:
            errorMsg = 'HTTP版本不受支持, 请联系管理员';
            break;
        default:
            const error_res = error.response;
            if(error_res.data && error_res.data.message) {
                errorMsg = error.message;
            }
            break;
    }
    if (!isNull(errorMsg)) Notification.error({title: '提示信息', message: errorMsg});
    return Promise.reject(error);
});


export default service;