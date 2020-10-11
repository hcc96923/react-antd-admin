import Axios from "axios";
import { message } from "antd";
import { SERVER_ADDRESS } from '@utils/config';

// api地址
const HTTP_API = SERVER_ADDRESS;
const WHITE_API = ['/login', '/register'];

// 创建axios实例
const http = Axios.create({
    baseURL: HTTP_API,
    timeout: 1000 * 5
});

// request 拦截
http.interceptors.request.use(
    config => {
        const { url } = config;
        // 不是白名单API
        if (!WHITE_API.includes(url)) {
            // 是否有进入非白名单的权限
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            };
        };
        return config;
    },  
    error => {
        return Promise.reject(error);
    }
);

// response 拦截
http.interceptors.response.use(
    response => {
        const data = response.data;
        if (data.code === 200) {
            return data;
        } else {
            message.error(data.message || 'Error');
            return Promise.reject(response);
        }
    },
    error => {
        return Promise.reject(error);
    }
);
export default http;