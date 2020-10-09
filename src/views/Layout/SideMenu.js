import React, { Component } from 'react';
import { Layout, Menu } from "antd";
import {
    HomeOutlined,
    TeamOutlined,
    UserOutlined, 
    BookOutlined,
    KeyOutlined,
    CopyOutlined,
    SettingOutlined,
    ControlOutlined,
    StopOutlined,
    AreaChartOutlined,
    LineChartOutlined,
    BarChartOutlined,
    PieChartOutlined,
    DotChartOutlined,
    HeatMapOutlined,
    FileExclamationOutlined,
    FileOutlined,
    FileExcelOutlined,
    AppstoreOutlined,
    FileZipOutlined,
    FilePdfOutlined,
    FileDoneOutlined,
    FileTextOutlined,
    FileMarkdownOutlined,
    MessageOutlined,
    CopyrightOutlined,
    EyeInvisibleOutlined,
    WarningOutlined,
    IssuesCloseOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import mapMenu from "@/routes/menu";
import './style.less';


class SideMenu extends Component {
    state = {};
    onCollapse = () => {
        this.props.setCollapse({ show: !this.props.collapse.show});
        localStorage.setItem('collapse', JSON.stringify({ show: !this.props.collapse.show}));
    };
    handleRouter = (item) => {
        let breadcrumbData = [];
        const findMenu = mapMenu.find(subMenu => subMenu.key === item.key);

        // 加入面包屑
        breadcrumbData.push(findMenu.name);
        // 加入标签列表
        this.props.addTag(findMenu);

        this.props.history.push(`/${item.key}`);
    };
    render() { 
        const { collapse, theme } = this.props;
        return (  
            <Layout.Sider 
                width={200} 
                theme={theme.type} 
                className="site-layout-background"
                style={{overflowX: "hidden", overflowY: "auto"}}
                collapsible  
                collapsed={collapse.show} 
                onCollapse={this.onCollapse}>
                <Menu
                    mode="inline"
                    style={{height: '100%'}}
                    theme={theme.type}
                    onClick={this.handleRouter}>
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        首页
                    </Menu.Item>

                    <Menu.SubMenu key="user-menu" icon={<UserOutlined  />} title="用户管理">
                        <Menu.Item key="user-list" icon={<TeamOutlined />}>用户列表</Menu.Item>
                        <Menu.Item key="role-list" icon={<UserOutlined />}>角色列表</Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu key="setting-menu" icon={<SettingOutlined />} title="设置管理">
                        <Menu.ItemGroup key="user-setting" title="我的设置">
                            <Menu.Item key="basic-info" icon={<BookOutlined />}>基本资料</Menu.Item>
                            <Menu.Item key="modify-password" icon={<KeyOutlined />}>修改密码</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup key="system-setting" title="系统设置">
                            <Menu.Item key="system" icon={<ControlOutlined />}>系统设置</Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.SubMenu>

                    <Menu.Item key="icon-list" icon={<CopyOutlined  />}>图标</Menu.Item>

                    <Menu.SubMenu key="chart" icon={<AreaChartOutlined />} title="图表">
                        <Menu.Item key="line" icon={<LineChartOutlined />}>折线图</Menu.Item>
                        <Menu.Item key="bar" icon={<BarChartOutlined />}>柱状图</Menu.Item>
                        <Menu.Item key="pie" icon={<PieChartOutlined />}>饼状图</Menu.Item>
                        <Menu.Item key="key-board" icon={<DotChartOutlined />}>键盘图</Menu.Item>
                        <Menu.Item key="mix" icon={<HeatMapOutlined />}>混合图表</Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu key="module" icon={<AppstoreOutlined />} title="组件">
                        <Menu.Item key="excel" icon={<FileExcelOutlined />}>Excel</Menu.Item>
                        <Menu.Item key="zip" icon={<FileZipOutlined />}>Zip</Menu.Item>
                        <Menu.Item key="pdf" icon={<FilePdfOutlined />}>Pdf</Menu.Item>
                        <Menu.Item key="udfile" icon={<FileDoneOutlined />}>上传下载文件</Menu.Item>
                        <Menu.Item key="rich-text" icon={<FileTextOutlined />}>富文本</Menu.Item>
                        <Menu.Item key="mark-down" icon={<FileMarkdownOutlined />}>MarkDown</Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu key="permission" icon={<EyeInvisibleOutlined />} title="权限测试">
                        <Menu.Item key="authority" icon={<WarningOutlined />}>权限切换</Menu.Item>
                        <Menu.Item key="page" icon={<IssuesCloseOutlined />}>权限页面</Menu.Item>
                    </Menu.SubMenu>

                    <Menu.Item key="message" icon={<MessageOutlined />}>消息</Menu.Item>

                    <Menu.SubMenu key="error-page" icon={<StopOutlined />} title="错误页面">
                        <Menu.Item key="401" icon={<FileExclamationOutlined />}>401</Menu.Item>
                        <Menu.Item key="404" icon={<FileOutlined />}>404</Menu.Item>
                        <Menu.Item key="500" icon={<FileExcelOutlined />}>500</Menu.Item>
                    </Menu.SubMenu>

                    <Menu.Item key="about" icon={<CopyrightOutlined />}>关于</Menu.Item>
                </Menu>
            </Layout.Sider>
        )
    };
}


export default withRouter(SideMenu);