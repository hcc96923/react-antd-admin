import React, { Component } from 'react';
import { HashRouter } from "react-router-dom";
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { setUserInfo } from '@store/actions/userInfo';
import { setCollapse, setTheme, setBreadcrumb, setTag, setMessage } from '@store/actions/setting';
import { addTag, removeTag } from '@store/actions/tagList';
import TopHeader from "./TopHeader";
import SideMenu from "./SideMenu";
import MainContent from "./MainContent";
import BottomFooter from "./BottomFooter";
import TagList from './TagList';
import BreadCrumb from "./BreadCrumb";
import './style.less';


class LayoutContainer extends Component {
    // 数据和方法由各个组件独自维护
    state = { visible: false };
    render() { 
        // 父组件向子组件分发数据和方法
        const { collapse, theme, userInfo, location, breadcrumb, tag, tagList, message } = this.props;
        const { setCollapse, setTheme, setBreadcrumb, setTag, setMessage, setUserInfo, addTag, removeTag } = this.props;
        return (
            <HashRouter>
                <div className="layout">
                    <Layout style={{ height: '100vh'}}>
                        {/* 通栏头部 */}
                        <TopHeader
                            theme={theme}
                            breadcrumb={breadcrumb}
                            tag={tag}
                            message={message}
                            userInfo={userInfo}
                            setUserInfo={setUserInfo}
                            setTheme={setTheme}
                            setBreadcrumb={setBreadcrumb}
                            setTag={setTag}
                            setMessage={setMessage}>
                        </TopHeader>
                        <Layout>
                            {/* 侧边栏 */}
                            <SideMenu
                                collapse={collapse}
                                theme={theme}
                                setCollapse={setCollapse}
                                setBreadcrumb={setBreadcrumb}
                                addTag={addTag}>
                            </SideMenu>
                            <Layout style={{ padding: '0 12px' }}>
                                {/* 面包屑 */}
                                { 
                                    breadcrumb.show ? 
                                    <BreadCrumb
                                        location={location}
                                        setBreadcrumb={setBreadcrumb}>
                                    </BreadCrumb>
                                    : 
                                    <div style={{padding: '0'}}></div>
                                }

                                {/* 标签 */}
                                { 
                                    tag.show ?
                                    <TagList 
                                        tagList={tagList}
                                        removeTag={removeTag}>
                                    </TagList>
                                    :
                                    <div style={{padding: '0'}}></div>
                                }

                                {/* 内容 */}
                                <MainContent
                                    renderRoutes={this.props.route.routes}>
                                </MainContent>
                                
                                {/* 底部 */}
                                <BottomFooter></BottomFooter>
                            </Layout>
                        </Layout>
                    </Layout>
                </div>
            </HashRouter>  
        );
    }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = dispatch => ({
	setCollapse: data => {
		dispatch(setCollapse(data));
	},
	setUserInfo: data => {
		dispatch(setUserInfo(data));
	},
	setTheme: data => {
		dispatch(setTheme(data));
	},
	setBreadcrumb: data => {
		dispatch(setBreadcrumb(data));
	},
	setTag: data => {
		dispatch(setTag(data));
    },
    setMessage: data => {
        dispatch(setMessage(data));
    },
	addTag: data => {
		dispatch(addTag(data));
    },
    removeTag: data => {
        dispatch(removeTag(data));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);