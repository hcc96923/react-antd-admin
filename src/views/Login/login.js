import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { setUserInfo } from "@store/actions/userInfo";
import store from '@store/store';
import './index.less';


const { $http } = React;
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
                username: '',
                password: ''
            },
            loginForm: {
                username: '',
                password: ''
            },
            userInfo: store.getState().userInfo
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
                    username: '',
                    password: '',
                    phone: '',
                    email: ''
                } 
            });
        }
    };
    handleLogin = (event, isRegister) => {
        event.preventDefault();
        const { loginForm } = this.state
        if (!loginForm.username) {
            return message.error('用户名不能为空');
        }
        if (!loginForm.password) {
            return message.error('密码不能为空');
        }
        this.setState({loading: true});
        // 请求登录
        $http.post('/login/login', loginForm)
            .then(async response => {
                const { userInfo, token } = response;
                // 使用Redux实现响应式用户基础信息
                const action = setUserInfo(userInfo);
                store.dispatch(action);
                // 缓存信息
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                localStorage.setItem('token', token);
                
                if (isRegister) {
                    message.destroy('loading');
                }
                message.success('登陆成功');
                await this.setState({loading: false});
                this.props.history.push('/home');
            }).catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    };
    handleRegister = (event) => {
        event.preventDefault();
        const { registerForm } = this.state;
        if (!registerForm.username) {
            message.error('用户名不能为空');
        }
        if (!registerForm.password) {
            message.error('密码不能为空');
        }
        this.setState({loading: true});
        $http.post('/login/register', registerForm)
            .then(() => {
                message.loading({content: '注册成功，正在为你登录...', key: 'loading'});

                this.setState({
                    loginForm: JSON.parse(JSON.stringify(this.state.registerForm))
                });

                this.handleLogin(event, true);
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    };
    handleStoreChange = () => {
        this.setState({userInfo: store.getState().userInfo});
    };
    render() {
        const { loading, overlay, loginForm, registerForm } = this.state;
        return (
            <div className="login_register">
                <div className="container">
                    <div className="login">
                        <form id="login" onSubmit={this.handleLogin}>
                            <h1 style={{color: '#000', fontWeight: '700'}}>登录</h1>
                            <input 
                                type="text" 
                                name="username" 
                                value={loginForm.username} 
                                onChange={(event) => this.handleInputChange(event, 'login', 'username')}
                                placeholder="用户名"
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
                                name="username" 
                                value={registerForm.username} 
                                onChange={(event) => this.handleInputChange(event, 'register', 'username')}
                                placeholder="用户名"
                            ></input>
                            <input 
                                type="password" 
                                name="password" 
                                value={registerForm.password} 
                                onChange={(event) => this.handleInputChange(event, 'register', 'password')}
                                placeholder="密码"
                            ></input>
                            <button type="submit" className="register_btn">注册</button>
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