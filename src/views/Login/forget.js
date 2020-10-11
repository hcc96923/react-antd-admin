import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { message } from "antd";
import './forget.less';


const { $http } = React;
const EmailRegexp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
class Forget extends Component {
    state = {
        validateForm: {
            email: '',
            code: ''
        },
        form: {
            password: '',
            repeatPassword: ''
        },
        formType: 'validate',
        codeText: '获取验证码', 
        disabled: false
    };
    handleNext = (event) => {
        event.preventDefault();
        const { validateForm } = this.state;
        if (!validateForm.email) {
            return message.error('请输入邮箱');
        }
        if (!validateForm.code) {
            return message.error('请输入验证码');
        }
        this.setState({
            formType: 'password',
            validateForm: {
                ...validateForm,
                code: ''
            }
        });
    };
    handlePrevious = (event) => {
        event.preventDefault();
        this.setState({
            formType: 'validate',
            form: {
                password: '',
                repeatPassword: ''
            }
        });
    };
    handleInputChange = (event, formType, name) => {
        const { validateForm, form } = this.state;
        const value = event.target.value;
        
        if (formType === 'validate') {
            validateForm[name] = value;
            this.setState({ validateForm });
        } else {
            form[name] = value;
            this.setState({ form });
        }
    };
    handleValidate = (event) => {
        const value = event.target.value;
        if (value && !EmailRegexp.test(value)) {
            message.error('邮箱格式不正确');
        }
    };
    handleGetCode = () => {
        if (!this.state.validateForm.email || !EmailRegexp.test(this.state.validateForm.email)) {
            return message.error('请输入正确的邮箱');
        }
        let second = 59;
        let timer = null;
        message.success('验证码已发送到邮箱，请注意查收');
        this.setState({
            disabled: true,
            codeText: `${second}秒后重新获取`
        }, () => {
            timer = setInterval(() => {
                second -= 1;
                this.setState({
                    codeText: `${second}秒后重新获取`
                });
                if (second === 0) {
                    clearInterval(timer);
                    this.setState({
                        codeText: '获取验证码',
                        disabled: false
                    });
                }
            }, 1000);
        });
    };
    handleResetPassword = (event) => {
        event.preventDefault();
        const { form } = this.state;
        if (!form.password) {
            return message.error('请输入密码');
        }
        if (!form.repeatPassword) {
            return message.error('请重新输入密码');
        }
        if (form.password !== form.repeatPassword) {
            return message.error('两次输入的密码不一致');
        }
        // $http.post('/reset/password', {form})
        //      .then(() => {
                message.success('密码重置成功，请到重新登录账号');
                setTimeout(() => {
                    this.props.history.push('/login');
                }, 1500);
            //  })
            //  .catch((error) => {
            //      message.error(error);
            //  });
    };
    render() { 
        const { formType, validateForm, form, disabled, codeText } = this.state;
        return (  
            <div className="forget_password">
                <div className="container">
                    <div className={`validate_container ${formType === 'password' ? 'translate_x' : ''}`}>
                        <form id="validate" onSubmit={this.handleNext}>
                            <h1>忘记密码</h1>
                            <input 
                                name="email"
                                className="input_email"
                                placeholder="请输入邮箱"
                                value={validateForm.email} 
                                onBlur={this.handleValidate} 
                                onChange={(event) => this.handleInputChange(event, 'validate', 'email')}                                
                            ></input>
                            <div className="message_code">
                                <input 
                                    type="text" 
                                    name="code"
                                    value={validateForm.code}
                                    placeholder="邮箱验证码"
                                    onChange={(event) => this.handleInputChange(event, 'validate', 'code')}
                                ></input>
                                <button 
                                    type="button"
                                    disabled={disabled}
                                    className={`message_code_btn ${disabled ? 'code_disabled' : ''}`}
                                    onClick={this.handleGetCode}
                                >{codeText}</button>
                            </div>
                            <button 
                                type="submit" 
                                className="find_password_btn" 
                            >找回密码</button>
                            <Link to="/login" style={{margin: '5px 0', color: '#333'}}>已有账号，去登录</Link>
                        </form>
                    </div>
                    <div className="password_container">
                        <form id="password" onSubmit={this.handleResetPassword}>
                            <h1>设置密码</h1>
                            <input 
                                type="password" 
                                name="password"
                                value={form.password} 
                                placeholder="请输入密码"
                                onChange={(event) => this.handleInputChange(event, 'form', 'password')}
                            ></input>
                            <input 
                                type="password" 
                                name="repeatpassword"
                                value={form.repeatPassword} 
                                placeholder="请确认密码"
                                onChange={(event) => this.handleInputChange(event, 'form', 'repeatPassword')}
                            ></input>
                            <button 
                                type="submit" 
                                className="reset_password_btn"
                            >重置新密码</button>
                            <button 
                                type="submit" 
                                className="prev_btn" 
                                onClick={this.handlePrevious}
                            >上一步</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};
export default Forget;