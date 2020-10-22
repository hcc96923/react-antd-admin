const redis = require('redis');
const client = redis.createClient(6379, "127.0.0.1", { password: '123456' });
const session = require('express-session');
const RedisStore = require('connect-redis')(session);


// 服务配置
const serverConfig = {
    port: 5000 
};


// 跨域配置
const corsConfig = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        'Content-Type', 
        'Content-Language', 
        'Accept-Language',
        'Accept', 
        'Authorization',
        'Origin', 
        'Access-Control-Allow-Headers',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
        'X-Requested-With'
    ],
    exposedHeaders: [
        'Cache-Control', 
        'Content-Language',
        'Content-Length',
        'Content-Type',
        'Expires',
        'Last-Modified',
        'Pragma'
    ],
    credentials: true,
    maxAge: 3600,
    preflightContinue: false,
    optionsSuccessStatus: 204
};


// session配置
const sessionConfig = {
    secret :  'sessionKey', // 用来对session id相关的cookie进行签名
    store: new RedisStore({client: client}), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false, // 是否保存未初始化的会话
    resave : false, // 是否每次都重新保存会话，建议false
    cookie : {
        path: '/',
        httpOnly: true, // 设置httpOnly属性可以防止客户端脚本通过document.cookie等方式访问Cookie有助于避免XSS攻击
        sameSite: true, // 可以让Cookie在跨站请求时不会被发送，从而可以组织跨站请求伪造攻击（CSRF）
        secure: false,
        maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
};


// 数据库配置
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'user'
};


// 密钥
const secretKey = 'key';


// 邮箱配置
const emailConfig = {
    qqConfig: {
        service: 'qq',
        host: 'smtp.qq.com',
        secure: true,
        port:465,
        auth: {
            user: '734499162@qq.com',
            pass: 'mmcaswvloekfbaif'
        }
    },
    neteaseConfig: {
        service: 'smtp.163.com',
        host: 'smtp.163.com',
        secure: true,
        port:465,
        auth: {
            user: 'hcc96923@163.com',
            pass: 'SWOPRPIKGKMRWRKU'
        }
    },
    secretKey: 'emailSecretKey'
};


// 图形配置
const imageConfig = {
    captchaConfig: {
        width: 200,
        height: 42,
        size: 4, // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 1, // 干扰线条的数量
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#cc9966' //  验证码图片背景颜色
    },
    secretKey: 'imageSecretKey'
};
module.exports = {
    serverConfig,
    corsConfig,
    sessionConfig,
    dbConfig,
    secretKey,
    emailConfig,
    imageConfig
};