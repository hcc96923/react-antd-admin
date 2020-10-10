const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const execDB = require('../utils/connectionDB');
const { secretKey } = require('../utils/config');


/* 
    登录
    login
*/
router.post('/login', (request, response) => {
    const { username, password } = request.body;
    const sqlString = `SELECT id, username, role, avatar FROM user WHERE username = '${username}' AND password = '${password}'`;
    execDB(sqlString)
        .then(result => {
            if (result.length > 0) {
                const user = Object.assign({}, result[0]);
                const token = jwt.sign(user, secretKey, {
                    expiresIn: 60 * 60 * 12 * 24 * 7
                });
                response.send({
                    code: 200,
                    message: '登陆成功',
                    userInfo: user,
                    token
                });
            } else {
                response.send({
                    message: '登陆失败'
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
});
/* 
    注册
    register
*/
router.post('/register', (request, response) => {
    const { username, password } = request.body;
    const sqlString = `SELECT id FROM user WHERE username='${username}' AND password='${password}'`;
    execDB(sqlString)
        .then(result => {
            if (result.length > 0) {
                response.send({
                    code: 200,
                    message: '你已注册，请登录'
                });     
            } else {
                const sqlString = `INSERT INTO user (username, password, gender) VALUES('${username}', '${password}', ${0})`;
                execDB(sqlString)
                    .then(result => {
                        if (result.affectedRows > 0) {
                            response.send({
                                code: 200,
                                message: '注册成功'
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        })
        .catch(error => {
            console.log(error);
        });
});
/* 
    忘记密码
    forget
*/
router.put('/forget', (request, response) => {

});
module.exports = router;