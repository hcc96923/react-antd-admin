const express = require('express');
const router = express.Router();
const execDB = require('./connectionDB');


/* 
    获取文件列表
    getFileList
*/
router.get('/getDownloadList', (request, response) => {
    const sqlString = `SELECT id, originalname, name, time FROM file`;
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
module.exports = router;