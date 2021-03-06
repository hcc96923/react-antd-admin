const express = require('express');
const router = express.Router();
const { executeMysql } = require('../utils/database');


/* 
    获取用户
    getUser
*/
router.get('/getUser', (request, response) => {
    const sqlString = `SELECT id FROM user`;
    executeMysql(sqlString)
        .then(result => {
            const total = result.length;
            const query = request.query;
            let sqlString = `SELECT id, username, gender, phone, email, time, avatar FROM user WHERE 1 = 1`;
            Object.keys(query).forEach(key => {
                switch (key) {
                    case 'username':
                        if (query['username'] !== '') {
                            sqlString += ` AND username = '${query[key]}'`;
                        }
                        break;
                    case 'gender':
                        if (query['gender'] !== '-1') {
                            sqlString += ` AND gender = ${query[key]}`;
                        }
                        break;
                    case 'phone':
                        if (query['phone'] !== '') {
                            sqlString += ` AND phone = '${query[key]}'`;
                        }
                        break;
                    case 'email':
                        if (query['email'] !== '') {
                            sqlString += ` AND email = '${query[key]}'`;
                        }
                        break;
                    default:
                        break;
                }
            });

            // 分页查询
            if (query.pageNum&&query.pageSize) {
                const pageNum = Number(query.pageNum);
                const pageSize = Number(query.pageSize);
                const n = (pageNum - 1) * pageSize;
                sqlString += ` LIMIT ${n}, ${pageSize}`;
            } 
            executeMysql(sqlString)
                .then(result => {
                    response.send({
                        code: 200,
                        message: '获取成功',
                        result,
                        total
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
    创建用户
    addUser
*/
router.post('/addUser', (request, response) => {
    const { username, gender, phone, email } = request.body;
    const sqlString = `SELECT id FROM user WHERE username='${username}' AND gender=${gender} AND phone='${phone}' AND email='${email}'`;
    executeMysql(sqlString)
        .then(result => {
            if (result.length === 0) {
                const sqlString = `INSERT INTO user (username, gender, phone, email) VALUES('${username}', ${gender}, '${phone}', '${email}')`;
                executeMysql(sqlString)
                    .then(result => {
                        if (result.affectedRows > 0) {
                            response.send({
                                code: 200,
                                message: '创建成功'
                            });
                        } else {
                            response.send({
                                message: '创建失败'
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
            } else {
                response.send({
                    message: '用户已存在'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});
/* 
    编辑用户
    editUser
*/
router.put('/editUser', (request, response) => {
    const { id, username, gender, phone, email, avatar } = request.body;
    const sqlString = `UPDATE user SET username='${username}', gender=${gender},phone='${phone}' ,email='${email}', avatar='${avatar}' WHERE id=${id}`;
    executeMysql(sqlString)
        .then(result => {
            if (result.affectedRows > 0) {
                response.send({
                    code: 200,
                    message: '编辑成功'
                });
            } else {
                response.send({
                    code: 200,
                    message: '编辑失败'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});
/* 
    删除用户
    deleteUser
*/
router.delete('/deleteUser', (request, response) => {
    const { id } = request.query;
    const sqlString = `DELETE FROM user WHERE id = ${id}`;
    executeMysql(sqlString)
        .then(result => {
            if (result.affectedRows > 0) {
                response.send({
                    code: 200,
                    message: '删除成功',
                });
            } else {
                response.send({
                    message: '删除失败'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});
/* 
    批量删除
    multipleDelete
*/
router.delete('/multipleDelete', (request, response) => {
    const { ids } = request.query;
    let count = 0;
    ids.forEach(id => {
        const sqlString = `DELETE FROM user WHERE id = ${id}`;
        executeMysql(sqlString)
            .then(() => {
                count++;
                if (count === ids.length) {
                    response.send({
                        code: 200,
                        message: '删除成功',
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    });
});
/* 
    用户详情
    getUserDetail
*/
router.get('/getUserDetail/:id', (request, response) => {
    const { id } = request.params;
    const sqlString = `SELECT id, username, gender, phone, email, avatar, remark FROM user WHERE id=${id}`;
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
    上传文件
    uploadAvatar
*/
router.put('/uploadAvatar', (request, response) => {
    const { id, avatar } = request.body;
    const sqlString = `UPDATE user SET avatar='${avatar}' WHERE id=${id}`;
    executeMysql(sqlString)
        .then(result => {
            if (result.affectedRows > 0) {
                response.send({
                    code: 200,
                    message: '上传成功'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});
/* 
    修改用户
    updateUser
*/
router.put('/updateUser', (request, response) => {
    const { id, username, gender, phone, email, avatar, remark } = request.body;
    const sqlString = `UPDATE user SET username='${username}', gender=${gender}, phone='${phone}', email='${email}', avatar='${avatar}', remark='${remark}' WHERE id=${id}`;
    executeMysql(sqlString)
        .then(result => {
            if (result.affectedRows > 0) {
                response.send({
                    code: 200,
                    message: '修改成功'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});
/* 
    验证密码
    verifyPassword
*/
router.get('/verifyPassword', (request, response) => {
    const { id } = request.user;
    const { password } = request.query;
    const sqlString = `SELECT password FROM user WHERE id=${id}`;
    executeMysql(sqlString)
        .then(result => {
            if (result[0].password === password) {
                response.send({
                    code: 200,
                    message: '当前密码正确'
                });
            } else {
                response.send({
                    message: '当前密码错误'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});
/* 
    updatePassword
    修改密码
*/
router.put('/updatePassword', (request, response) => {
    const { newPassword } = request.body;
    const { id } = request.user;
    const sqlString = `UPDATE user SET password='${newPassword}' WHERE id=${id}`;
    executeMysql(sqlString)
        .then(result => {
            if (result.affectedRows > 0) {
                response.send({
                    code: 200,
                    message: '修改成功'
                });
            } else {
                response.send({
                    message: '修改失败'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});
/* 
    获取角色
    getRole
*/
router.get('/getRole', (request, response) => {
    const sqlString = `SELECT id FROM user`;
    executeMysql(sqlString)
        .then((result) => {
            const total = result.length;
            const query = request.query;
            let sqlString = `SELECT id, username, role FROM user WHERE 1 = 1`;
            Object.keys(query).forEach(key => {
                switch (key) {
                    case "id":
                        if (query["id"] !== '0') {
                            sqlString += ` AND id =  ${Number(query[key])}`;
                        }
                        break;
                    case "username":
                        if (query["username"] !== '') {
                            sqlString += ` AND username = '${query[key]}'`;
                        }
                        break;
                    case "role":
                        if (query["role"] !== '0') {
                            sqlString += ` AND role = ${Number(query[key])}`;
                        }
                        break;
                    default:
                        break;
                }
            });
            // 分页查询
            if (query.pageNum&&query.pageSize) {
                const pageNum = Number(query.pageNum);
                const pageSize = Number(query.pageSize);
                const n = (pageNum - 1) * pageSize;
                sqlString += ` LIMIT ${n}, ${pageSize}`; 
            }
            executeMysql(sqlString)
                .then(result => {
                    // response.header('Cache-Control', 'max-age=31536000');
                    response.send({
                        code: 200,
                        message: '获取成功',
                        result,
                        total
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
    editRole
    编辑角色
*/
router.put('/editRole', (request, response) => {
    const { id, role } = request.body;
    const sqlString = `UPDATE user SET role = ${role} WHERE id=${id}`;
    executeMysql(sqlString)
        .then(result => {
            if (result.affectedRows > 0) {
                response.send({
                    code: 200,
                    message: '编辑成功'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});
module.exports = router;