// 测试生产环境
export let SERVER_ADDRESS;
if (process.env.NODE_ENV === 'development') { 
    SERVER_ADDRESS = 'http://localhost:5000';
} else { 
    SERVER_ADDRESS = 'http://116.62.139.167:5000';
};


// 邮箱验证码密钥
export const EMAIL_KEY = 'emailSecretKey';
