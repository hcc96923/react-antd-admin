const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '../static'});
const execDB = require('./connectionDB');


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
router.post('/uploadFiles', upload.array('files', 5), (request, response) => {
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
module.exports = router;