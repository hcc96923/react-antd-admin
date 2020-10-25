import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Image, Badge, Avatar, Dropdown, Menu, Button } from "antd";
import { 
    SettingOutlined,
    BellOutlined,
    DownOutlined
} from "@ant-design/icons";
import { withRouter } from 'react-router-dom';
import FullScreen from '@components/FullScreen';
import BasicDrawer from '@components/BasicDrawer';
import { SERVER_ADDRESS } from '@utils/config';
import Logo from '@assets/images/react.svg';


class TopHeader extends Component {
    state = {
        visible: false
    };
    handleOpenSetting = () => {
        this.setState({ visible: true });
    };
    handleCloseSetting = () => {
		this.setState({ visible: false });
    };
    handleChangeTheme = checked => {
        this.props.setTheme({ type: checked ? 'dark' : 'light' });
		this.handleCloseSetting();
    };
    handleChangeBreadCrumb = checked => {
        this.props.setBreadcrumb({ show: checked });
        this.handleCloseSetting();
    };
    handleChangeTag = checked => {
        this.props.setTag({ show: checked });
        this.handleCloseSetting();
    };
    handleMessage = () => {
        this.props.history.push('/message');
    };
    handleMenuClick = (item) => {
        const { key } = item;
        if (key === 'logout') {
            localStorage.clear();
            this.props.history.push('/login');
        } else {
            this.props.history.push(`/${item.key}`);
        }
    };
    componentDidMount() {
        const params = {};
        params.status = 0;
        this.props.setMessage(params);
    };
    render() { 
        const { theme, breadcrumb, tag, message, userInfo } = this.props;
        const userDropdownMenu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="basic-info">基本资料</Menu.Item>
                <Menu.Item key="modify-password">修改密码</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">退出</Menu.Item>
            </Menu>
        );
        return (  
            <Layout.Header className="header" theme={theme.type}>
                {/* logo */}
                <div className="logo">
                    <Image
                        alt="logo"
                        width={48}
                        height={48}
                        src={Logo}
                        className="logo_image"
                    />
                    <span>react-antd-admin</span>
                </div>
                {/* 用户信息 */}
                <div className="header_right">
                    <div className="full_screen">
                        <FullScreen></FullScreen>
                    </div>
                    <div className="setting">
                        <SettingOutlined onClick={this.handleOpenSetting}></SettingOutlined>
                    </div>
                    <div className="message">
                        <Link to="/message">
                            <Badge size="small" count={message.count}>
                                <BellOutlined style={{fontSize: "20px", color: "#fff"}} onClick={this.handleMessage}></BellOutlined>
                            </Badge> 
                        </Link>
                    </div>
                    <div className="user_info">
                        <Avatar className="avatar" src={userInfo.avatar === '' ? '' : SERVER_ADDRESS + '/' + userInfo.avatar}></Avatar>
                        <Dropdown 
                            overlay={userDropdownMenu}
                            trigger="['click']">
                            <Button className="userinfo_btn" type="link">
                                {userInfo.username}<DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                </div>
                {/* 设置 */}
                <BasicDrawer
                    title="系统设置"
                    closable
                    visible={this.state.visible}
                    theme={theme}
                    breadcrumb={breadcrumb}
                    tag={tag}
                    onClose={this.handleCloseSetting} 
                    onChangeTheme={this.handleChangeTheme}
                    onChangeBreadCrumb={this.handleChangeBreadCrumb}
                    onChangeTag={this.handleChangeTag}>
                </BasicDrawer>
            </Layout.Header>
        );
    };
};
export default withRouter(TopHeader);