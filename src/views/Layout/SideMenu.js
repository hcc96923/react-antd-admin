import React, { Component } from 'react';
import { Layout, Menu } from "antd";
import { withRouter } from 'react-router-dom';
import mapMenu from "@/routes/menu";
import { formatRole, resolveMenuList } from '@utils/formatTool';
import './style.less';


const userInfo = JSON.parse(localStorage.getItem('userInfo'));
class SideMenu extends Component {
    state = {
        menuTreeNode: []
    };
    onCollapse = () => {
        this.props.setCollapse({ show: !this.props.collapse.show});
        localStorage.setItem('collapse', JSON.stringify({ show: !this.props.collapse.show}));
    };
    handleRecursionRouter = (item, children) => {
        return children.find(child => {
            if (!child.children) {
                return child.path === item.key;
            }
            return this.handleRecursionRouter(item, child.children);
        });
    };
    handleRouter = (item) => {
        let breadcrumbData = [];
        let outChild = null;
        mapMenu.find(subMenu => {
            if (!subMenu.children) {
                return outChild = subMenu.path === item.key ? subMenu : null;
            } 
            outChild = this.handleRecursionRouter(item, subMenu.children);
            return outChild;
        });
        
        // 加入面包屑
        breadcrumbData.push(outChild.name);
        // 加入标签列表
        this.props.addTag(outChild);
        this.props.history.push(`/${item.key}`);
    };
    handleRecursionChildren = (item, children) => {
        return (
            <Menu.SubMenu key={item.path} icon={item.icon} title={item.name}>
                {
                    children.map(child => {
                        if (!child.children) {
                            return <Menu.Item key={child.path} icon={child.icon}>{child.name}</Menu.Item>;
                        }
                        return this.handleRecursionChildren(child, child.children);
                    })
                }
            </Menu.SubMenu>
        );
    };
    handleMenuTree = () => {
        const role = formatRole(userInfo.role);
        const menuList = resolveMenuList(mapMenu, role);

        console.log(menuList);
        const menuTreeNode = menuList.map(item => {
            if (!item.children) {
                return <Menu.Item key={item.path} icon={item.icon}>{item.name}</Menu.Item>;
            };
            return this.handleRecursionChildren(item, item.children);
        });
        this.setState({menuTreeNode});
    };
    componentDidMount() {
        this.handleMenuTree();
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
                        {
                            this.state.menuTreeNode.map(item => {
                                return item;
                            })
                        }
                </Menu>
            </Layout.Sider>
        );
    };
};
export default withRouter(SideMenu);