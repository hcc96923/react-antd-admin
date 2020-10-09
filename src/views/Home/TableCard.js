import React from 'react';
import { Card, Table } from "antd";


function TableCard(props) {
    return (
        <Card title={props.title}>
            <Table
                columns={props.columns}
                dataSource={props.dataSource}
                pagination={false}
            ></Table>
        </Card>
    );
};
export default TableCard;