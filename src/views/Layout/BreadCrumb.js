import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom';
import mapMenu from "@/routes/menu";


class BreadCrumb extends Component {
    state = {};
    createBreadCrumb = (location, mapMenu) => {
        const breadcrumbData = [];
        mapMenu.forEach(item => {
            if (location.pathname === `/${item.key}`) {
                breadcrumbData.push(item.name);
                if (item.parentKey) {
                    breadcrumbData.push(item.parentName);
                }
                breadcrumbData.reverse();
            }
        });
        return breadcrumbData;
    }
    render() { 
        const { location } = this.props;
        const breadcrumbData = this.createBreadCrumb(location, mapMenu);
        return (  
            <Breadcrumb style={{marginTop: "14px"}}>
                {
                    breadcrumbData.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)
                }
            </Breadcrumb>
        );
    };
};
export default withRouter(BreadCrumb);