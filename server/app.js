const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan  = require('morgan');
const expressJWT = require('express-jwt');


const { serverConfig, corsConfig, secretKey } = require('./utils/config');
const { 
    loginRouter, 
    homeRouter,
    userRouter,
    messageRouter,
    uploadRouter,
    downloadRouter 
} = require('./routes/router');


const app = express();
// 加载中间件
app.use(cors(corsConfig))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(express.static(__dirname + "/static"))
    //.use(morgan('combined', {stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })}))
    .use(morgan(':method :url :status :res[content-length] - :response-time ms'))
    .use(expressJWT({
        secret: secretKey, 
        algorithms: ['HS256']
    }).unless({
        path: [
            '/login/login',  
            '/login/register', 
            '/login/findEmail', 
            '/login/sendEmail', 
            '/login/getImageAuthCode', 
            '/login/resetPassword', 
            '/upload/uploadAvatar', 
            '/upload/uploadFiles'
        ]
    }))
    .use((error, request, response, next) => {
        if (error.name === 'UnauthorizedError') {
        response.status(401).send('你的登录已过期,请重新登录');
        }
    });
// 加载路由
app.use('/login', loginRouter)
app.use('/home', homeRouter)
    .use('/user', userRouter)
    .use('/message', messageRouter)
    .use('/upload', uploadRouter)
    .use('/download', downloadRouter)



app.listen(serverConfig.port, () => {
    console.log('Server is running in http://localhost:' + serverConfig.port);
});