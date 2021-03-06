const express = require('express');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan  = require('morgan');
const expressJWT = require('express-jwt');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const { serverConfig, corsConfig, sessionConfig, secretKey, whiteList } = require('./utils/config');
const { 
    loginRouter, 
    dashboardRouter,
    userRouter,
    fileRouter,
    cronRouter,
    mapRouter 
} = require('./routes/router');


const app = express();
// 加载中间件
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))
    .use(compression())
    .use(cors(corsConfig))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(express.static(__dirname + "/static"))
    // .use(morgan('combined', {stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })}))
    .use(morgan(':method :url :status :res[content-length] - :response-time ms'))
    .use(expressJWT({
        secret: secretKey, 
        algorithms: ['HS256']
    }).unless({
        path: whiteList
    }))
    .use(cookieParser())
    .use(session(sessionConfig))
    .use((error, request, response, next) => {
        if (error.name === 'UnauthorizedError') {
            response.status(401).send('你的登录已过期,请重新登录');
        }
    });
// 加载路由
app.use('/login', loginRouter)
app.use('/dashboard', dashboardRouter)
    .use('/user', userRouter)
    .use('/file', fileRouter)
    .use('/cron', cronRouter)
    .use('/map', mapRouter)




// 监听服务
app.listen(serverConfig.port, '0.0.0.0', () => {
    console.log('Server is running in http://localhost:' + serverConfig.port);
});