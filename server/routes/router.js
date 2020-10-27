const loginRouter = require('./login');
const homeRouter = require('./home');
const userRouter = require('./user');
const messageRouter = require('./message');
const fileRouter = require('./file');
const cronRouter = require('./cron');


module.exports = {
    loginRouter,
    homeRouter,
    userRouter,
    messageRouter,
    fileRouter,
    cronRouter
};