const mysql = require('mysql');
const redis = require('redis');
const { mysqlConfig, redisConfig } = require('./config');


const pool = mysql.createPool({
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database
});
/* 
    封装mysql
    executeMysql
*/
function executeMysql (sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                reject(error);
            };
            connection.query(sql, (error, result) => {
                if (error) {
                    reject(error);
                };
                resolve(result);
                connection.release();
            });
        });
    });
};
/* 
    封装redis
    executeRedis
*/
function executeRedis () {
    return new Promise((resolve, reject) => {
        const client = redis.createClient(redisConfig);
        client.on('error', error => {
            reject(error);
        });
        resolve(client);
    });
};
module.exports = {
    executeMysql,
    executeRedis
};