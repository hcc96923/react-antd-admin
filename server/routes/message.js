const express = require('express');
const router = express.Router();
const { executeMysql } = require('../utils/database');


/* 
    新增消息
    addMessage
*/
router.post('/addMessage', (request, response) => {
    const { adminId, content } = request.body;
    const sqlString = `INSERT INTO message (adminId, content) VALUES(${adminId}, '${content}')`;
    executeMysql(sqlString)
        .then(result => {
            const messageId = result.insertId; // 插入的消息的id
            const adminSqlString = `SELECT id FROM admin`; 
            executeMysql(adminSqlString)
                .then(result => {
                    // 遍历所有的管理员
                    result.forEach((admin, index, array) => {
                        // 为每一个管理员都插入一条相同的未读消息
                        const adminMessageSqlString = `INSERT INTO adminmessage (adminId, messageId, messageStatus) VALUES(${admin.id}, ${messageId}, ${0})`; 
                        executeMysql(adminMessageSqlString)
                            .then(result => {
                                if (admin.id === adminId) {
                                    const id = result.insertId;
                                    // 添加消息的管理员默认已读
                                    const sqlString = `UPDATE adminmessage SET messageStatus=${1} WHERE id=${id}`;
                                    executeMysql(sqlString)
                                        .then(() => {
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        });
                                }
                                if ((index+1) === array.length) {
                                    response.send({
                                        code: 200,
                                        message: '新增成功'
                                    });
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
            console.log(error);
        });
});
/* 
    获取消息
    getMessage
*/
router.get('/getMessage', (request, response) => {
    const { adminId } = request.query;
    const sqlString = `SELECT DISTINCT(adminmessage.id), message.messageId, message.content, message.time, adminmessage.messageStatus FROM message JOIN adminmessage ON message.messageId=adminmessage.messageId AND adminmessage.adminId=${adminId}`;
    executeMysql(sqlString)
        .then(result => {
            response.send({
                code: 200,
                message: '获取成功',
                result,
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
    const { adminId, id } = request.body;
    const sqlString = `UPDATE adminmessage SET messageStatus=${1} WHERE adminId=${adminId} AND id=${id}`;
    executeMysql(sqlString)
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
    const { adminId, ids } = request.body;
    let count = 0;
    ids.forEach(id => {
        const sqlString = `UPDATE adminmessage SET messageStatus=${1} WHERE adminId=${adminId} AND id=${id}`;
        executeMysql(sqlString)
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
    删除消息
    deleteMessage
*/
router.delete('/deleteMessage', (request, response) => {
    const { messageId } = request.query;
    const sqlString = `DELETE FROM message WHERE messageId=${messageId}`;
    executeMysql(sqlString)
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


module.exports = router;