import React, { Component } from 'react';
import { Card, Tabs, Form, Input, List, Button, Space, Modal, Badge, message } from 'antd';
import { NotificationOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { setMessage } from '@/store/actions/setting';
import { formatGMTTime } from '@/utils/formatTool';
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
        adminId: this.props.adminInfo.id,
        messageList: [],
        modalVisible: false,
        modalContent: ''
    };
    formRef = React.createRef();
    handleTabChange = tab => {
        switch (tab) {
            case 'messagelist':
                this.handleGetMessageList(this.state.adminId);
                break;
            default:
                break;
        }
    };
    handleSetMessage = () => {
        const params = { adminId: this.props.adminInfo.id };
        this.props.setMessage(params);
    }
    handleAddMessage = values => {
        values.adminId = this.props.adminInfo.id;
        $http.post('/message/addMessage', values)
            .then(() => {
                message.success('新增成功');
                this.handleSetMessage();
                this.formRef.current.setFieldsValue({ content: '' });
            })
            .catch(error => {
                console.log(error);
            });
    };
    handleGetMessageList = id => {
        const params = { adminId: id };
        $http.get('/message/getMessage', {params})
            .then(response => {
                const { result } = response;
                this.setState({ messageList: result })
            })
            .catch(error => {
                console.log(error);
            });
    };
    hnadleReadAll = () => {
        const ids = this.state.messageList.map(item => item.id);
        const allStatus = this.state.messageList.some(item => item.messageStatus !== 1);
        if(allStatus) {
            $http.put('/message/readAllMessage', {adminId: this.state.adminId, ids})
                .then(() => {
                    this.handleSetMessage();
                    this.handleGetMessageList(this.state.adminId);
                })
                .catch(error => {
                    console.log(error);
            });
        }
    };
    hnadleReadSingle = (adminId, id) => {
        $http.put('/message/readSingleMessage', {adminId, id})
            .then(() => {
                this.handleSetMessage();
                this.handleGetMessageList(this.state.adminId);
            })
            .catch(error => {
                console.log(error);
            });
    };
    hnadleViewMessage = item => {
        this.setState({ 
            modalVisible: true,
            modalContent: item.content
        });
        this.hnadleReadSingle(this.state.adminId, item.id);
    };
    hnadleDeleteMessage = item => {
        Modal.confirm({
            title: '删除消息',
            icon: <ExclamationCircleOutlined />,
            content: '确认删除这条消息吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                const params = {messageId: item.messageId};
                $http.delete('/message/deleteMessage', {params})
                    .then(() => {
                        message.success('删除成功');
                        this.handleGetMessageList(this.state.adminId);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    };
    render() { 
        const { messageList, modalVisible, modalContent } = this.state;
        return (  
            <Card title="消息中心">
                <Tabs
                    defaultActiveKey="addmessage"
                    onChange={this.handleTabChange}>
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
                                    onFinish={this.handleAddMessage}>
                                    <Form.Item
                                        label="消息"
                                        name="content"
                                        rules={[
                                        {
                                            required: true,
                                            message: '请输入消息内容',
                                        },
                                        ]}>
                                        <Input.TextArea allowClear rows={10} placeholder="请输入消息内容" />
                                    </Form.Item>
                                    <Form.Item {...tailLayout}>
                                        <Button type="primary" htmlType="submit">提交</Button>
                                    </Form.Item>
                                </Form>
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab="消息列表"
                            key="messagelist">
                                <Modal
                                    visible={modalVisible}
                                    footer={null}
                                    onCancel={() => this.setState({ modalVisible: false })}>
                                        <p style={{ fontSize: 24, padding: 3 }}>{modalContent}</p>
                                </Modal>
                                <List
                                    size="large"
                                    bordered
                                    footer={
                                        messageList.length > 0 ?
                                        <div>
                                            <Button type="primary" onClick={this.hnadleReadAll}>全部已读</Button>
                                        </div>
                                        :
                                        null
                                    }
                                    dataSource={messageList}
                                    renderItem={item => 
                                        <List.Item key={item.id} className="message">
                                            {
                                                item.messageStatus ?
                                                <span style={{ marginRight: '10px' }}>
                                                    <NotificationOutlined />
                                                </span>
                                                :
                                                <span style={{ marginRight: '10px' }}>
                                                    <Badge dot>
                                                        <NotificationOutlined />
                                                    </Badge>
                                                </span>
                                            }
                                            <span className="content">{item.content}</span>
                                            <span className="time">{formatGMTTime(item.time)}</span>
                                            <Space size={20}>
                                                {
                                                    this.props.adminInfo.authority > 1 ?
                                                    <>
                                                        <Button type="default" onClick={() => this.hnadleViewMessage(item)}>查看</Button>
                                                        <Button type="danger" onClick={() => this.hnadleDeleteMessage(item)}>删除</Button>
                                                    </>
                                                    :
                                                    <Button type="default" onClick={() => this.hnadleViewMessage(item)}>查看</Button>
                                                }
                                            </Space>
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