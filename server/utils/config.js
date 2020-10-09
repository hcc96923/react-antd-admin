// 服务配置
const serverConfig = {
    port: 5000 
};


// 跨域配置
const corsConfig = {
    origin: '*',
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization']
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