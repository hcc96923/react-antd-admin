import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom';


class BreadCrumb extends Component {
    state = {};
    render() { 
        const { breadCrumb } = this.props;
        return (  
            <Breadcrumb style={{marginTop: "14px"}}>
                {
                    breadCrumb.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)
                }
            </Breadcrumb>
        );
    };
};
export default withRouter(BreadCrumb);