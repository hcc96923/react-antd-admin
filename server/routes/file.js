const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'static'});
const execDB = require('../utils/connectionDB');


/* 
    上传头像
    uploadAvatar
*/
router.post('/uploadAvatar', upload.single('avatar'), (request, response) => {
    const file = request.file;
    const fileTypeName = file.originalname.split('.')[1];

    fs.renameSync(file.path, 'static/' + (file.filename + '.' + fileTypeName));
    file.path = (file.filename + '.' + fileTypeName);
    response.send({
        code: 200,
        file
    });
});
/* 
    上传多个文件
    uploadFiles
*/
router.post('/uploadFiles', upload.array('files', 10), (request, response) => {
    const files = request.files;
    const fileList = [];


    // 先处理所有文件
    files.forEach(file => {
        const fileTypeName = file.originalname.split('.')[1];
        fs.renameSync(file.path, 'static/' + (file.filename + '.' + fileTypeName));
        file.path = (file.filename + '.' + fileTypeName);


        // 写入数据库
        let count = 0;
        const sqlString = `INSERT INTO file (originalname, name) VALUES('${file.originalname}', '${file.path}')`;
        execDB(sqlString)
            .then(() => {
                count++;
                fileList.push(file);
                if (fileList.length === count) {
                    response.send({
                        code: 200,
                        fileList
                    });
                };
            })
            .catch(error => {
                console.log(error);
            });
    });
});
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