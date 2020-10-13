const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const execDB = require('../utils/connectionDB');
const { secretKey, emailConfig } = require('../utils/config');
const nodemailer = require('nodemailer');


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
router.get('/getAuthCode', (request, response) => {
    const emailString = request.query.email;
    const emailType = emailString.split('@')[1].split('.')[0];
    if (!emailType) {
        return false;
    }

    let config = null;
    switch (emailType) {
        case 'qq':
            config = emailConfig.qqConfig;
            break;
        case '163':
            config = emailConfig.neteaseConfig;
            break;
        default:
            break;
    }

    
    let authCode = Math.floor(Math.random() * 900000) + 100000;
    //创建一个SMTP客户端配置对象
    const transporter = nodemailer.createTransport(config);
    // 创建一个收件人对象
    let htmlString = 
    `<html>
        <head>
            <title>LoveDance</title>
            <meta charset="UTF-8">
        </head>
        <style type="text/css">
            #container {
                position: relative;
                width: 100%;
                height: 100%;
            }
            .content {
                position: relative;
                height: 300px;
                font-weight: bolder;
            }
            .heart {
                position: relative;
                width: 300px;
                height: 300px;
                left: 50%;
                transform: rotate(45deg) translateX(-50%);
                background-color: #d5083b;
            }
            .heart:before,
            .heart:after {
                position: absolute;
                content: '';
                width: 300px;
                height: 300px;
                border-radius: 50%;
                background-color: #d5083b;
            }
            .heart:before {
                left: -50%;
            }
            .heart:after {
                top: -50%;
            }
        </style>
        <body>
            <div id="container">
                <section class="content">您的验证码为：${authCode}, 请妥善保管。</section>
                <div class="heart"></div>
            </div>
        </body>
    </html>`;
    console.log(authCode);
    const addressee = {
        from: `"韩畅畅"<${config.auth.user}>`,
        to: `<${emailString}>`,
        subject: '验证码',
        text: "😊😊😊",
        html: htmlString,
        attachments: [
            {
                filename: '跟随人茫茫.mp3',
                path: '../server/static/music.mp3'
            }
        ]
    };

    transporter.sendMail(addressee, (error, info) => {
        if (error) {
            return console.log(error);
        }
        transporter.close();
        response.send({
            code: 200,
            authCode
        });
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
module.exports = router;