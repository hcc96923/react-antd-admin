import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { message } from "antd";
import './forget.less';

const { $http } = React;
const PhoneRegexp = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;


class Forget extends Component {
    state = {
        validateForm: {
            phone: '',
            imgCode: '',
            code: ''
        },
        form: {
            password: '',
            repeatPassword: ''
        },
        formType: 'validate',
        codeText: '获取验证码', 
        disabled: false
    }
    handleNext = (event) => {
        event.preventDefault();
        const { validateForm } = this.state;
        if (!validateForm.phone) {
            return message.error('请输入手机号码');
        }
        if (!validateForm.imgCode) {
            return message.error('请输入图形验证码');
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
    }
    handlePrevious = (event) => {
        event.preventDefault();
        this.setState({
            formType: 'validate',
            form: {
                password: '',
                repeatPassword: ''
            }
        });
    }
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
    }
    handleValidate = (event) => {
        const value = event.target.value;
        if (value && !PhoneRegexp.test(value)) {
            message.error('手机号码格式不正确');
        }
    }
    handleGetCode = () => {
        if (!this.state.validateForm.phone || !PhoneRegexp.test(this.state.validateForm.phone)) {
            return message.error('请输入正确的手机号');
        }
        let second = 59;
        let timer = null;
        message.success('验证码已发送到手机，请注意查收');
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
                        disabled: true
                    });
                }
            }, 1000);
        });
        // 获取验证码
        // $http.get('send/code', { params: {phone: this.state.validateForm.phone}}).then(res => {
        //     clearInterval(timer)
            this.setState({
                // validateForm: {...this.state.validateForm, code: res.code},
                codeText: '获取验证码',
                disabled: false
            });
        // });
    }
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
    }
    render() { 
        const { formType, validateForm, form, disabled, codeText } = this.state;
        return (  
            <div className="forget_password">
                <div className="container">
                    <div className={`validate_container ${formType === 'password' ? 'translate_x' : ''}`}>
                        <form id="validate" onSubmit={this.handleNext}>
                            <h1>忘记密码</h1>
                            <input 
                                name="phone"
                                className="input_phone"
                                placeholder="请输入手机号码"
                                value={validateForm.phone} 
                                onBlur={this.handleValidate} 
                                onChange={(event) => this.handleInputChange(event, 'validate', 'phone')}                                
                            ></input>
                            <div className="validate_code">
                                <input 
                                    type="text" 
                                    name="imgCode"
                                    value={validateForm.imgCode}
                                    placeholder="图形验证码"
                                    onChange={(event) => this.handleInputChange(event, 'validate', 'imgCode')}
                                ></input>
                                <img src="https://www.oschina.net/action/user/captcha" alt="code" className="img_code" />
                            </div>
                            <div className="message_code">
                                <input 
                                    type="text" 
                                    name="code"
                                    value={validateForm.code}
                                    placeholder="短信验证码"
                                    disabled={disabled}
                                    onChange={(event) => this.handleInputChange(event, 'validate', 'code')}
                                    onClick={this.handleGetCode}
                                ></input>
                                <button 
                                    type="button"
                                    className={`message_code_btn ${disabled ? 'code_disabled' : ''}`}
                                    className="message_code_btn"
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