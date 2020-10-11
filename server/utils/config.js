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
module.exports = {
    serverConfig,
    corsConfig,
    dbConfig,
    secretKey
};