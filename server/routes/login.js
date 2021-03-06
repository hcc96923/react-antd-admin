const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { executeMysql, executeRedis } = require('../utils/database');
const { emailAuthCode, imageAuthCode } = require('../utils/authCode');
const { secretKey } = require('../utils/config');


/* 
    登录
    login
*/
router.post('/login', (request, response) => {
    const { email, password } = request.body;
    const sqlString = `SELECT id, username, role, avatar, last_login_time, last_login_ip FROM user WHERE email = '${email}' AND password = '${password}'`;
    executeMysql(sqlString)
        .then(result => {
            if (result.length > 0) {
                const { id } = result[0];
                const user = Object.assign({}, result[0]);
                const token = jwt.sign(user, secretKey, {
                    expiresIn: 60 * 60 * 12 * 24 * 7
                });
                const sqlString = `UPDATE user SET last_login_time=CURRENT_TIMESTAMP, last_login_ip='${request.ip}' WHERE id=${id}`;
                executeMysql(sqlString)
                    .then(() => {
                        response.send({
                            code: 200,
                            message: '登陆成功',
                            userInfo: user,
                            token
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } else {
                response.send({
                    message: '邮箱或密码错误'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});
/* 
    注册
    register
*/
router.post('/register', (request, response) => {
    const { email, password } = request.body;
    const sqlString = `SELECT id FROM user WHERE email='${email}' AND password='${password}'`;
    executeMysql(sqlString)
        .then(result => {
            if (result.length > 0) {
                response.send({
                    code: 200,
                    message: '你已注册，请登录'
                });     
            } else {
                const sqlString = `INSERT INTO user (email, password, gender) VALUES('${email}', '${password}', ${0})`;
                executeMysql(sqlString)
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
    查询邮箱
    findEmail
*/
router.get('/findEmail', (request, response) => {
    const email = request.query.email;
    const sqlString = `SELECT id FROM user WHERE email ='${email}'`;
    executeMysql(sqlString)
        .then(result => {
            response.send({
                code: 200,
                message: '获取成功',
                result
            });
        })
        .catch(error => {
            console.log(error);
        });
});
/* 
    发送邮箱
    sendEmail
*/
router.get('/sendEmail', (request, response) => {
    const emailString = request.query.email;
    const userAuthCode = emailAuthCode(emailString);
    response.send({
        code: 200,
        message: '发送成功',
        userAuthCode
    });
});
/* 
    忘记密码
    forget
*/
router.put('/resetPassword', (request, response) => {
    const { email, password } = request.body;
    const sqlString = `UPDATE user SET password='${password}' WHERE email='${email}'`;
    executeMysql(sqlString)
        .then(result => {
            if (result.affectedRows > 0) {
                response.send({
                    code: 200,
                    message: '重置成功'
                });
            } else {
                response.send({
                    code: 200,
                    message: '重置失败'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});
/* 
    获取图形验证码
    getImageAuthCode
*/
router.get('/getImageAuthCode', (request, response) => {
    const DataText = imageAuthCode();
    const cookieSessionId = request.cookies.sessionId;
    const inputAuthText = request.query.authText

    if (inputAuthText) {
        executeRedis()
            .then(client => {
                client.get(cookieSessionId, (error, value) => {
                    if (error) {
                        console.log(error.message)
                        return false;
                    }
                    if (inputAuthText !==  value) {
                        response.send({message: '验证码错误'})
                    } else {
                        // 验证正确立即删除这个redis数据
                        client.del(cookieSessionId);
                        response.send({code: 200, message: '验证码正确'});
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
        
    } else {
        executeRedis()
            .then(client => {
                client.set(request.sessionID, DataText.text, 'EX', 3600); // 有效时长3600s
                response.cookie('sessionId', request.sessionID);
                response.send(DataText.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
});
module.exports = router;