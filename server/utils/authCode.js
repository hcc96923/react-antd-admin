const nodemailer = require('nodemailer');
const CryptoJS  = require('crypto-js');
const svgCaptcha = require('svg-captcha');
const { emailConfig, imageConfig } = require('./config');


/* 
    emailAuthCode
    生成邮箱验证码
*/
const emailAuthCode = (emailString) => {
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
    // 如果同时有多个用户来请求验证码，第一个用户来说服务端内存里的验证码已经改变
    let userAuthCode = CryptoJS.AES.encrypt(authCode.toString(), emailConfig.secretKey).toString();
    
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
            console.log(error);
        }
        transporter.close();
    });
    return userAuthCode;
};
/* 
    imageAuthCode
    生成图形验证码
*/
const imageAuthCode = () => {
    const captcha = svgCaptcha.create(imageConfig.captchaConfig);
    return captcha;
};
module.exports = {
    emailAuthCode,
    imageAuthCode
};