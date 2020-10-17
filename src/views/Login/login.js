import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { setUserInfo } from "@store/actions/userInfo";
import store from '@store/store';
import CryptoJS from "crypto-js";
import { debounce } from '@utils/optimize';
import './index.less';


const { $http } = React;
const EmailRegexp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
class Login extends Component {
    constructor(props) {
        super(props);
        store.subscribe(this.handleStoreChange)
        this.state = {
            loading: false,
            overlay: {
                isLogin: true,
                step: 100
            },
            registerForm: {
                email: '',
                password: '',
                authcode: ''
            },
            loginForm: {
                email: '',
                password: ''
            },
            verify: false,
            userInfo: store.getState().userInfo,
            imageAuthCode: 'http://localhost:5000/login/getImageAuthCode'
        }
    };
    toggleOverlay(step) {
        this.setState({
            overlay: {
                isLogin: !this.state.overlay.isLogin,
                step
            }
        });
    };
    verifyIsRegistered = (event) => {
        const value = event.target.value;
        if (value && !EmailRegexp.test(value)) {
            message.error('邮箱格式不正确');
        }
        const params = {};
        params.email = value;
        $http.get('/login/findEmail', {params})
            .then(response => {
                const { result } = response;
                if (result.length !== 0) {
                    return message.error('该邮箱已注册，请登录');
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
    handleInputChange = (event, formType, labelName) => {
        const { registerForm, loginForm } = this.state;
        if (formType === 'register') {
            registerForm[labelName] = event.target.value;
            this.setState({ registerForm });
        } else {
            loginForm[labelName] = event.target.value;
            this.setState({ 
                loginForm,
                registerForm: {
                    email: '',
                    password: '',
                    authcode: ''
                } 
            });
        }
    };
    refreshAuthcode = () => {
        $http.get('/login/getImageAuthCode')
            .then(() => {
                this.setState({imageAuthCode: ''});
                this.setState({imageAuthCode: 'http://localhost:5000/login/getImageAuthCode'});
                message.success('刷新验证码成功');
            })
            .catch(error => {
                console.log(error);
                message.error('刷新验证码失败');
            });
    };
    handleAuthcode = () => {
        const { registerForm } = this.state;
        if (!registerForm.email) {
            return message.error('邮箱不能为空');
        }
        if (!registerForm.password) {
            return message.error('密码不能为空');
        }
        debounce(this.refreshAuthcode.bind(this), 1000)();
    };
    handleInputAuthCode = (event) => {
        const params = {};
        params.authText = event.target.value;
        $http.get('/login/getImageAuthCode', {params})
            .then(response => {
                const code = response.code;
                if (!code) {
                    return message.error('验证码错误');
                }
                message.success('验证码正确');
                this.setState({verify: true});
            })
            .catch(error => {
                console.log(error);
            });
    }
    handleRegister = (event) => {
        event.preventDefault();
        const { registerForm } = this.state;
        if (!registerForm.email) {
            return message.error('邮箱不能为空');
        }
        if (!registerForm.password) {
            return message.error('密码不能为空');
        }
        if (!registerForm.authcode) {
            return message.error('验证码不能为空');
        }
        if (!this.state.verify) {
            return message.error('验证码错误');
        }
        // MD5
        let params = JSON.parse(JSON.stringify(registerForm));
        params.password = CryptoJS.MD5(params.password).toString();
        // 请求注册
        this.setState({loading: true});
        $http.post('/login/register', params)
            .then(() => {
                message.loading({content: '注册成功，正在为你登录...', key: 'loading'});
                this.setState({
                    loginForm: registerForm
                }, () => {
                    this.handleLogin(event, params);
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    };
    handleLogin = (event, registeredParams) => {
        if (!registeredParams) {
            event.preventDefault();
        }
        const { loginForm } = this.state
        if (!loginForm.email) {
            return message.error('邮箱不能为空');
        }
        if (!loginForm.password) {
            return message.error('密码不能为空');
        }
        // base64 && md5
        let params = null;
        params = JSON.parse(JSON.stringify(loginForm));
        params.password = CryptoJS.MD5(params.password).toString();
        if (registeredParams) {
            params = registeredParams;
        }

        // 请求登录
        this.setState({loading: true});
        $http.post('/login/login', params)
            .then(response => {
                const { userInfo, token } = response;
                // 使用Redux实现响应式用户基础信息
                const action = setUserInfo(userInfo);
                store.dispatch(action);
                // 缓存信息
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                localStorage.setItem('token', token);
                
                if (registeredParams) {
                    message.destroy('loading');
                }
                
                this.props.history.push('/');
                this.setState({loading: false});
                message.success('登陆成功');
            }).catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    };
    handleStoreChange = () => {
        this.setState({userInfo: store.getState().userInfo});
    };
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    };
    render() {
        const { loading, overlay, loginForm, registerForm, imageAuthCode } = this.state;
        return (
            <div className="login_register">
                <div className="container">
                    <div className="login">
                        <form id="login" onSubmit={this.handleLogin}>
                            <h1 style={{color: '#000', fontWeight: '700'}}>登录</h1>
                            <input 
                                type="text" 
                                name="email" 
                                value={loginForm.email} 
                                onChange={(event) => this.handleInputChange(event, 'login', 'email')}
                                placeholder="邮箱"
                            ></input>
                            <input 
                                type="password" 
                                name="password" 
                                value={loginForm.password} 
                                onChange={(event) => this.handleInputChange(event, 'login', 'password')}
                                placeholder="密码"
                            ></input>
                            <Link to="/forget" style={{margin: '5px 0', color: '#333'}}>忘记密码</Link>
                            <button 
                                type="submit" 
                                className="login_btn"
                                disabled={loading ? true : false}
                            >{loading ? <LoadingOutlined style={{marginRight: '5px'}}/> : null}登录</button>
                        </form>
                    </div>
                    <div className="register">
                        <form id="register" onSubmit={this.handleRegister}>
                            <h1 style={{color: '#000', fontWeight: '700'}}>注册</h1>
                            <input 
                                type="text" 
                                name="email" 
                                value={registerForm.email} 
                                onBlur={this.verifyIsRegistered}
                                onChange={(event) => this.handleInputChange(event, 'register', 'email')}
                                placeholder="邮箱"
                            ></input>
                            <input 
                                type="password" 
                                name="password" 
                                value={registerForm.password} 
                                onChange={(event) => this.handleInputChange(event, 'register', 'password')}
                                placeholder="密码"
                            ></input>
                            <div className="auth_code">
                                <input 
                                    type="text" 
                                    name="authcode" 
                                    value={registerForm.authcode} 
                                    onBlur={this.handleInputAuthCode}
                                    onChange={(event) => this.handleInputChange(event, 'register', 'authcode')}
                                    placeholder="请输入验证码"
                                ></input>
                                <section className="iframe">
                                    <iframe src={imageAuthCode} title='验证码' style={{ width: '100%', height: '100%', border: 'none', marginLeft: '-16px'}}></iframe>
                                    <Button type="primary" onClick={this.handleAuthcode} style={{height: '42px', float: 'right', top: '-62px', padding: '0', fontSize: '14px'}}>刷新验证码</Button>
                                </section>
                            </div>
                            <button type="submit" size="small" className="register_btn">注册</button>
                        </form>
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
export default Login;