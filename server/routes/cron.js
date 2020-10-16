const express = require('express');
const router = express.Router();
const CronJob = require('cron').CronJob;
const { emailAuthCode } = require('../utils/authCode');

/* 
    定时消息
    regularMessage
*/
router.get('/regularMessage', (request, response) => {
    const job = new CronJob(
        '59 * * * * *',
        () => {
            const code = emailAuthCode('2305079951@qq.com');
            if (code) {
                console.log('邮件已发送');
            }
        },
        null,
        true
    );
    job.start();
    response.end();
});
module.exports = router;