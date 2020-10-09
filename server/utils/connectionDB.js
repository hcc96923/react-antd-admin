const mysql = require('mysql');
const { dbConfig } = require('./config');


const pool = mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
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