const loginRouter = require('./login');
const homeRouter = require('./home');
const userRouter = require('./user');
const messageRouter = require('./message');
const uploadRouter = require('../utils/uploadFile');
const downloadRouter = require('../utils/downloadFile');


module.exports = {
    loginRouter,
    homeRouter,
    userRouter,
    messageRouter,
    uploadRouter,
    downloadRouter
};