const loginRouter = require('./login');
const dashboardRouter = require('./dashboard');
const userRouter = require('./user');
const fileRouter = require('./file');
const cronRouter = require('./cron');
const mapRouter = require('./map');


module.exports = {
    loginRouter,
    dashboardRouter,
    userRouter,
    fileRouter,
    cronRouter,
    mapRouter
};