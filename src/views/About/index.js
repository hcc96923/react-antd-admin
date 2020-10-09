import React from 'react';
import { Card, Divider, Tag, Image } from 'antd';
import {
    GithubOutlined
} from '@ant-design/icons';
import './style.less';
import juejin from '@assets/images/juejin.svg';


function About() {
    return (
        <Card title="React-Antd-Admin">
            <div className="about">
                <div className="description">
                    <span className="content">介绍</span>
                    <section>
                        这是一个后台管理的系统实现了一些常用的功能和组件。
                        面包屑、标签、主题切换、全屏、表格、icon、图表、
                        Excel、Zip、Pdf、富文本、MarkDown、
                        路由守卫、权限切换、系统设置、头像上传、错误页面。
                        <hr style={{border: '1px solid #eee'}} />
                        <span className="tip">由于本人工作中主要技术栈不是react，系统开发时不免存在问题，欢迎各位大佬issue。</span>
                    </section>
                    <span className="front">前端</span>
                    <section>
                        <Tag color="#f5af19">react</Tag>
                        <Tag color="#f12711">antd</Tag>
                        <Tag color="#1E9600">react-router</Tag>
                        <Tag color="#1D2671">redux</Tag>
                        <Tag color="#333333">axios</Tag>
                        <Tag color="#2C7744">echarts</Tag>
                    </section>
                    <span className="back">后端</span>
                    <section>
                        <Tag color="#11998e">node-js</Tag>
                        <Tag color="#093028">express</Tag>
                        <Tag color="#603813">mysql</Tag>
                        <Tag color="#753a88">cors</Tag>
                        <Tag color="#00416A">jsonwebtoken</Tag>
                    </section>
                </div>
                <Divider />
                <section className="link">
                    <span className="github">
                        <a href="https://github.com/hcc96923" target="_blank" rel="noopener noreferrer">
                            <GithubOutlined />
                        </a>
                    </span>
                    <span className="juejin">
                        <a href="https://juejin.im/user/729731453947710" target="_blank" rel="noopener noreferrer">
                            <Image
                                alt="三上悠亚"
                                width={56}
                                src={juejin}
                                preview={false}
                            />
                        </a>
                    </span>
                </section>
            </div>
        </Card>
    );
};
export default About;