const mysql = require('mysql');
const { mysqlConfig } = require('./config');


const pool = mysql.createPool({
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database
});


function execDB(sql) {
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
module.exports = execDB;