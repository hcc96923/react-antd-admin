import React, { Component } from 'react';
import { Card, Tabs, Form, Input, List, Button, message } from 'antd';
import { setMessage } from '@store/actions/setting';
import { connect } from 'react-redux';
import { formatTime } from '@utils/formatTool';
import "./style.less";


const { $http } = React;
const layout = {
    labelCol: {
        span: 0,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 1,
        span: 16,
    },
};
class Message extends Component {
    state = {
        unreadMessage: [],
        readMessage: []
    };
    formRef = React.createRef();
    onTabChange = (key) => {
        switch (key) {
            case 'unread':
                this.getUnreadMessage();
                break;
            case 'read':
                this.getReadMessage();
                break;
            default:
                break;
        }
    };
    onFinish = (values) => {
        $http.post('/message/addNewMessage', values)
            .then(() => {
                message.success('新增成功');
                this.formRef.current.setFieldsValue({
                    content: ''
                });

                const params = {};
                params.status = 0;
                this.props.setMessage(params);
            })
            .catch(error => {
                console.log(error);
            });
    };
    getUnreadMessage = () => {
        const params = {};
        params.status = 0;
        $http.get('/message/getMessage', {params})
            .then(response => {
                const { result } = response;
                this.setState({
                    unreadMessage: result
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
    onMarkRead = (id) => {
        $http.put('/message/readSingleMessage', {id})
            .then(() => {
                message.success('标记成功');
                this.getUnreadMessage();

                const params = {};
                params.status = 0;
                this.props.setMessage(params);
            })
            .catch(error => {
                console.log(error);
            });
    };
    onMarkAllRead = () => {
        const ids = this.state.unreadMessage.map(item => {
            return item.id;
        });
        $http.put('/message/readAllMessage', {ids})
            .then(() => {
                message.success('标记成功');
                this.getUnreadMessage();

                const params = {};
                params.status = 0;
                this.props.setMessage(params);
            })
            .catch(error => {
                console.log(error);
            })
    };
    getReadMessage = () => {
        const params = {};
        params.status = 1;
        $http.get('/message/getMessage', {params})
            .then(response => {
                const { result } = response;
                this.setState({
                    readMessage: result
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
    onDeleteMessage = (id) => {
        const params = {id};
        $http.delete('/message/deleteSingleReadMessage', {params})
            .then(() => {
                message.success('删除成功');
                this.getReadMessage();
            })
            .catch(error => {
                console.log(error);
            });
    };
    onDeleteAllMessage = () => {
        const ids = this.state.readMessage.map(item => {
            return item.id;
        });
        const params = {ids};
        $http.delete('/message/deleteAllMessage', {params})
            .then(() => {
                message.success('删除成功');
                this.getReadMessage();
            })
            .catch(error => {
                console.log(error);
            });
    };
    render() { 
        return (  
            <Card title="消息中心">
                <Tabs
                    defaultActiveKey="addmessage"
                    onChange={this.onTabChange}>
                    <Tabs.TabPane
                        tab="新增消息"
                        key="addmessage">
                            <Form
                                {...layout}
                                name="basic"
                                ref={this.formRef}
                                initialValues={{
                                    content: ''
                                }}
                                onFinish={this.onFinish}>
                                <Form.Item
                                    label="消息"
                                    name="content"
                                    rules={[
                                    {
                                        required: true,
                                        message: '请输入消息内容',
                                    },
                                    ]}>
                                    <Input.TextArea allowClear rows={5} placeholder="请输入消息内容" />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">提交</Button>
                                </Form.Item>
                            </Form>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab="未读消息"
                        key="unread">
                            <List
                                size="large"
                                bordered
                                footer={
                                    <div>
                                        <Button type="primary" onClick={this.onMarkAllRead}>全部已读</Button>
                                    </div>
                                }
                                dataSource={this.state.unreadMessage}
                                renderItem={item => 
                                    <List.Item key={item.id} className="message">
                                        <span className="content">{item.content}</span>
                                        <span className="time">{formatTime(item.time)}</span>
                                        <Button type="default" onClick={this.onMarkRead.bind(this, item.id)}>标为已读</Button>
                                    </List.Item>}>
                            </List>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab="已读消息"
                        key="read">
                            <List
                                size="large"
                                bordered
                                footer={
                                    <div>
                                        <Button type="danger" onClick={this.onDeleteAllMessage}>删除全部</Button>
                                    </div>
                                }
                                dataSource={this.state.readMessage}
                                renderItem={item => 
                                    <List.Item key={item.id} className="message">
                                        <span className="content">{item.content}</span>
                                        <span className="time">{formatTime(item.time)}</span>
                                        <Button type="danger" onClick={this.onDeleteMessage.bind(this, item.id)}>删除</Button>
                                    </List.Item>}>
                            </List>
                    </Tabs.TabPane>
                </Tabs>
            </Card>
        );
    };
};
const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    setMessage: data => {
        dispatch(setMessage(data));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Message);