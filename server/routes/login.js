const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const redis = require('redis');
const client = redis.createClient(6379, "localhost");
const execDB = require('../utils/connectionDB');
const { secretKey } = require('../utils/config');
const { emailAuthCode, imageAuthCode } = require('../utils/authCode');


/* 
    登录
    login
*/
router.post('/login', (request, response) => {
    const { email, password } = request.body;
    const sqlString = `SELECT id, username, role, avatar FROM user WHERE email = '${email}' AND password = '${password}'`;
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
                    message: '邮箱或密码错误'
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
    const { email, password } = request.body;
    const sqlString = `SELECT id FROM user WHERE email='${email}' AND password='${password}'`;
    execDB(sqlString)
        .then(result => {
            if (result.length > 0) {
                response.send({
                    code: 200,
                    message: '你已注册，请登录'
                });     
            } else {
                const sqlString = `INSERT INTO user (email, password, gender) VALUES('${email}', '${password}', ${0})`;
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
    查询邮箱
    findEmail
*/
router.get('/findEmail', (request, response) => {
    const email = request.query.email;
    const sqlString = `SELECT id FROM user WHERE email ='${email}'`;
    execDB(sqlString)
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
        userAuthCode,
        message: '发送成功'
    });
});
/* 
    忘记密码
    forget
*/
router.put('/resetPassword', (request, response) => {
    const { email, password } = request.body;
    const sqlString = `UPDATE user SET password='${password}' WHERE email='${email}'`;
    execDB(sqlString)
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
        client.get(cookieSessionId, (error, value) => {
            if (error) {
                console.log(error.message)
                return false;
            }
            inputAuthText !==  value ? response.send({message: '验证码错误'}) : response.send({code: 200, message: '验证码正确'});
        });
    } else {
        client.set(request.sessionID, DataText.text);
        response.cookie('sessionId', request.sessionID);
        response.send(DataText.data);
    }
});
module.exports = router;