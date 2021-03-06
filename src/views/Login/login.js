import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Form, Input, Button, message } from 'antd';
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { setToken } from "@/store/actions/token";
import { setUserInfo } from "@/store/actions/userInfo";
import { connect } from 'react-redux';
import CryptoJS from "crypto-js";
import { debounce } from '@/utils/optimize';
import { formatGMTTime } from '@/utils/formatTool';
import { SERVER_ADDRESS } from '@/utils/config';
import './login.less';


const { $http } = React;
const EmailRegexp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 0,
        span: 16,
    },
};
class Login extends Component {
    state = {
        loading: false,
        overlay: {
            isLogin: true,
            step: 100
        },
        loginForm: {
            email: 'hcc96923@gmail.com',
            password: '123456'
        },
        registerForm: {
            email: '',
            password: '',
            authcode: ''
        },
        verifyCode: false,
        imageAuthCode: `${SERVER_ADDRESS}/login/getImageAuthCode`
    };
    toggleOverlay(step) {
        this.setState({
            overlay: {
                isLogin: !this.state.overlay.isLogin,
                step
            }
        });
    };
    handleInputChange = (event, formType, labelName) => {
        const { registerForm, loginForm } = this.state;
        if (formType === 'login') {
            loginForm[labelName] = event.target.value;
            this.setState({ loginForm });
        } else {
            registerForm[labelName] = event.target.value;
            this.setState({ registerForm });
        };
    };
    handleLogin = (values, isRegistered) => {
        this.setState({loginForm: values});
        const params = JSON.parse(JSON.stringify(this.state.loginForm));
        params.password = CryptoJS.MD5(params.password).toString();
        
        // 请求登录
        this.setState({loading: true});
        $http.post('/login/login', params)
            .then(response => {
                const { userInfo, token } = response;
                const { last_login_time, last_login_ip } = userInfo;
                message.info(`上次登陆时间：${formatGMTTime(last_login_time)} 上次登陆IP：${last_login_ip}`, 13);

                // 缓存信息
                this.props.setToken(token);
                this.props.setUserInfo(userInfo);
                // 本地存储
                localStorage.setItem('token', token);
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                
                if (isRegistered) {
                    message.destroy('loading');
                };
                this.props.history.push('/');
                message.success('登陆成功');
                this.setState({loading: false});
            }).catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    };
    handleAuthRegistered = (event) => {
        const params = {};
        params.email = event.target.value;
        $http.get('/login/findEmail', {params})
            .then(response => {
                const { result } = response;
                if (result.length !== 0) {
                    return message.error('该邮箱已注册，请登录');
                };
            })
            .catch(error => {
                console.log(error);
            });
    };
    handleAuthCode = (event) => {
        const params = {};
        params.authText = event.target.value;
        $http.get('/login/getImageAuthCode', {params})
            .then(response => {
                const code = response.code;
                if (!code) {
                    return false;
                };
                this.setState({ verifyCode: true });
            })
            .catch(error => {
                console.log(error);
            });
    };
    handleRefreshCode = () => { 
        $http.get('/login/getImageAuthCode')
            .then(() => {
                this.setState({ imageAuthCode: '' });
                this.setState({ imageAuthCode: `${SERVER_ADDRESS}/login/getImageAuthCode` });
            })
            .catch(error => {
                console.log(error);
            });
    };
    handleOptimizetAuthCode = () => {
        const { registerForm } = this.state;
        if (!registerForm.email) {
            return message.error('邮箱不能为空');
        };
        if (!registerForm.password) {
            return message.error('密码不能为空');
        };
        debounce(this.handleRefreshCode.bind(this), 1000)();
    };
    handleRegister = () => {
        const { registerForm } = this.state;
        if (!this.state.verifyCode) {
            return false;
        };
        const params = JSON.parse(JSON.stringify(registerForm));
        params.password = CryptoJS.MD5(params.password).toString();
        this.setState({loading: true});
        $http.post('/login/register', params)
            .then(() => {
                message.loading({content: '注册成功，正在为你登录...', key: 'loading'});
                this.setState({
                    loginForm: registerForm
                }, () => {
                    delete registerForm.authcode;
                    this.handleLogin(registerForm, true);
                    this.setState({loading: false});
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    };
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    };
    render() { 
        const { loading, overlay, loginForm, registerForm, imageAuthCode } = this.state;
        return (
            <div className="login_register">
                <div className="container">
                    <div className="login">
                        <h1 style={{color: '#000', textAlign: 'center', marginTop: '25%', fontWeight: '700'}}>登录</h1>
                        <Form
                            {...layout}
                            name="basic"
                            className="form"
                            initialValues={loginForm}
                            onFinish={this.handleLogin}>
                                <Form.Item
                                    label="邮箱"
                                    name="email"
                                    className="form_item"
                                    rules={[
                                        {
                                            required: true,
                                            message: '邮箱不能为空!',
                                        },
                                        {
                                            pattern: EmailRegexp,
                                            message: '邮箱格式不正确!',
                                        }
                                    ]}
                                    onChange={(event) => this.handleInputChange(event, 'login', 'email')}>
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="密码"
                                    name="password"
                                    className="form_item"
                                    rules={[
                                        {
                                            required: true,
                                            message: '密码不能为空!',
                                        },
                                        {
                                            min: 6,
                                            message: '密码长度不能少于六位!',
                                        },
                                    ]}
                                    onChange={(event) => this.handleInputChange(event, 'login', 'password')}>
                                    <Input.Password />
                                </Form.Item>
                                <Link to="/forget" style={{margin: '5px 0', color: '#333'}}>忘记密码</Link>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" disabled={loading ? true : false} htmlType="submit">
                                    {loading ? <LoadingOutlined style={{marginRight: '5px'}}/> : null}登录
                                    </Button>
                                </Form.Item>
                        </Form>
                    </div>
                    <div className="register">
                        <h1 style={{color: '#000', textAlign: 'center', marginTop: '25%', fontWeight: '700'}}>注册</h1>
                        <Form
                            {...layout}
                            name="basic"
                            className="form"
                            initialValues={registerForm}
                            onBlur={this.verifyIsRegistered}
                            onFinish={this.handleRegister}>
                                <Form.Item
                                    label="邮箱"
                                    name="email"
                                    className="form_item"
                                    rules={[
                                        {
                                            required: true,
                                            message: '邮箱不能为空!',
                                        },
                                        {
                                            pattern: EmailRegexp,
                                            message: '邮箱格式不正确!',
                                        }
                                    ]}
                                    onChange={(event) => this.handleInputChange(event, 'register', 'email')}
                                    onBlur={this.handleAuthRegistered}>
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="密码"
                                    name="password"
                                    className="form_item"
                                    rules={[
                                        {
                                            required: true,
                                            message: '密码不能为空!',
                                        },
                                        {
                                            min: 6,
                                            message: '密码长度不能小于六位!',
                                        },
                                    ]}
                                    onChange={(event) => this.handleInputChange(event, 'register', 'password')}>
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    label="验证码"
                                    name="authcode"
                                    className="form_item"
                                    style={{marginBottom: 0}}
                                    rules={[
                                        {
                                            required: true,
                                            message: '验证码不能为空!',
                                        }
                                    ]}
                                    onChange={(event) => this.handleInputChange(event, 'register', 'authcode')}
                                    onBlur={this.handleAuthCode}>
                                    <Input />
                                </Form.Item>
                                <div className="auth_code">
                                    <section className="iframe">
                                        <iframe src={imageAuthCode} title='验证码' style={{ width: '100%', height: '100%', border: 'none', marginLeft: '-56px'}}></iframe>
                                        <Button type="primary" onClick={this.handleOptimizetAuthCode} style={{height: '32px', float: 'right', top: '8px', right: '-18px', padding: '0 5px', fontSize: '12px'}}>
                                        {<ReloadOutlined />}刷新
                                        </Button>
                                    </section>
                                </div>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" disabled={loading ? true : false} htmlType="submit">
                                    {loading ? <LoadingOutlined style={{marginRight: '5px'}}/> : null}注册
                                    </Button>
                                </Form.Item>
                        </Form>
                    </div>
                    <div className="overlay" style={{transform: 'translateX('+ overlay.step +'%)', transition: 'ease all 0.5s'}}>
                        {
                            overlay.isLogin ? 
                            <section className="overlay_box_right">
                                <h1>注册新账号！</h1>
                                <p>输入您的个人信息注册账号。</p>
                                <button className="login_btns" onClick={this.toggleOverlay.bind(this, 0)}>注册</button>
                            </section>
                            :
                            <section className="overlay_box_left">
                                <h1>欢迎回来！</h1>
                                <p>请您先登录的个人信息，进行操作。</p>
                                <button className="login_btns" onClick={this.toggleOverlay.bind(this, 100)}>登录</button>
                            </section>
                        }
                    </div>
                </div>
            </div> 
        );
    };
};
const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    setToken: data => {
        dispatch(setToken(data));
    },
    setUserInfo: data => {
        dispatch(setUserInfo(data));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);