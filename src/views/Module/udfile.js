import React, { Component } from 'react';
import { Card, Tabs, List, Upload, Button, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { formatGeneralTime } from '@/utils/formatTool';
import { SERVER_ADDRESS } from '@/utils/config';
import "./udfile.less";


const { $http } = React;
class UDFile extends Component {
    state = {
        uploading: false,
        uploadFileList: [],
        downloadFileList: []
    };
    onTabChange = (key) => {
        if (key === 'download') {
            this.getDownloadList();
        };
    };
    handleUpload = () => {
        const { uploadFileList } = this.state;
        const formData = new FormData();
        uploadFileList.forEach(file => {
            formData.append('files', file);
        });

        this.setState({uploading: true});
        $http.post('/file/uploadFiles', formData)
            .then(() => {
                this.setState({
                    uploading: false,
                    uploadFileList: []
                });
                message.success('上传成功');
            })
            .catch(error => {
                console.log(error);
                message.success('上传失败');
            });
    };
    getDownloadList = () => {
        this.setState({loading: true});
        $http.get('/file/getDownloadList')
            .then(response => {
                const { result } = response;
                this.setState({
                    loading: false, 
                    downloadFileList: result
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
    handleDownloadSingle = (file) => {
        this.setState({loading: true});
        window.open(`${SERVER_ADDRESS}/${file.name}`);
        this.setState({loading: false});
    };
    handleDownloadAll = () => {
        const fileList = this.state.downloadFileList;
        this.setState({loading: true});
        fileList.forEach(file => {
            const name = file.name;
            window.open(`${SERVER_ADDRESS}/${name}`);
        });
        this.setState({loading: false});
    };
    render() { 
        const { uploading, uploadFileList } = this.state;
        const uploadProps = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.uploadFileList.indexOf(file);
                    const newUploadFileList = state.uploadFileList.slice();
                    newUploadFileList.splice(index, 1);
                    return {
                        uploadFileList: newUploadFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    uploadFileList: [...state.uploadFileList, file],
                }));
                return false;
            },
            multiple: true,
            progress: {
                strokeColor: {
                    '0%': '#87d068',
                    '100%': '#1DA57A',
                },
                strokeWidth: 3,
                format: percent => `${parseFloat(percent.toFixed(2))}%`,
            },
            uploadFileList
        };
        return (  
            <Card title="支持多种类型文件的上传与下载">
                <Tabs
                    defaultActiveKey="upload"
                    onChange={this.onTabChange}>
                        <Tabs.TabPane
                            tab="上传文件"
                            key="upload">
                                <section>
                                    <Upload.Dragger {...uploadProps} name="files" style={{width: '280px'}}>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">支持拖拽上传和点击上传</p>
                                    </Upload.Dragger>
                                </section>
                                <section>
                                    <Button
                                        type="primary"
                                        onClick={this.handleUpload}
                                        disabled={uploadFileList.length === 0}
                                        loading={uploading}
                                        style={{ marginTop: 16 }}>
                                        {uploading ? '上传中...' : '上传'}
                                    </Button>
                                </section>
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab="下载文件"
                            key="download">
                                <List
                                    size="large"
                                    bordered
                                    footer={
                                        <div>
                                            <Button type="primary" onClick={this.handleDownloadAll}>下载全部</Button>
                                        </div>
                                    }
                                    dataSource={this.state.downloadFileList}
                                    renderItem={item => 
                                        <List.Item key={item.id} className="download">
                                            <span className="originalname" onClick={this.handleDownloadSingle.bind(this, item)}>{item.originalname}</span>
                                            <span className="time">{formatGeneralTime(item.time)}</span>
                                            <Button type="default" onClick={this.handleDownloadSingle.bind(this, item)}>下载</Button>
                                        </List.Item>}>
                                </List>
                        </Tabs.TabPane>
                </Tabs>
            </Card>
        );
    };
};
export default UDFile;