const express = require('express');
const router = express.Router();
const execDB = require('../utils/connectionDB');


/* 
    获取消息
    getMessage
*/
router.get('/getMessage', (request, response) => {
    const { status } = request.query;
    const sqlString = `SELECT id, content, time FROM message WHERE status=${status}`;
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
    新增消息
    addNewMessage
*/
router.post('/addNewMessage', (request, response) => {
    const { content } = request.body;
    const sqlString = `INSERT INTO message (content, status) VALUES('${content}', ${0})`;
    execDB(sqlString)
        .then(() => {
            response.send({
                code: 200,
                message: '新增成功'
            });
        })
        .catch(error => {
            console.log(error);
        });
});
/* 
    读取单个消息
    readSingleMessage
*/
router.put('/readSingleMessage', (request, response) => {
    const { id } = request.body;
    const sqlString = `UPDATE message SET status=${1} WHERE id=${id}`;
    execDB(sqlString)
        .then(() => {
            response.send({
                code: 200,
                message: '读取成功'
            });
        })
        .catch(error => {
            console.log(error);
        });
});
/* 
    读取所有消息
    readAllMessage
*/
router.put('/readAllMessage', (request, response) => {
    const { ids } = request.body;
    let count = 0;
    ids.forEach(id => {
        const sqlString = `UPDATE message SET status=${1} WHERE id=${id}`;
        execDB(sqlString)
            .then(() => {
                count++;
                if (count === ids.length) {
                    response.send({
                        code: 200,
                        message: '读取成功'
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    });
});
/* 
    删除单个已读消息
    deleteSingleReadMessage
*/
router.delete('/deleteSingleReadMessage', (request, response) => {
    const { id } = request.query;
    const sqlString = `DELETE FROM message WHERE id=${id}`;
    execDB(sqlString)
        .then(() => {
            response.send({
                code: 200,
                message: '删除成功'
            });
        })
        .catch(error => {
            console.log(error);
        });
});
/* 
    删除所有已读消息
    deleteAllMessage
*/
router.delete('/deleteAllMessage', (request, response) => {
    const { ids } = request.query;
    let count = 0;
    ids.forEach(id => {
        const sqlString = `DELETE FROM message WHERE id=${id}`;
        execDB(sqlString)
        .then(() => {
            count++;
            if (count === ids.length) {
                response.send({
                    code: 200,
                    message: '删除成功'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    });
});
module.exports = router;