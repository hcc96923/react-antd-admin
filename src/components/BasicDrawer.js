import React from 'react';
import { Drawer, Switch } from 'antd';


const styles = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	paddingBottom: '8px'
};
const BasicDrawer = props => {
	return (
		<>
			<Drawer title={props.title} placement="right" closable={props.closable} onClose={props.onClose} visible={props.visible}>
				<p style={styles}>
					<span>主题切换</span>
					<Switch 
						checkedChildren="暗色" 
						unCheckedChildren="亮色" 
						defaultChecked={props.theme.type === 'dark' ? true : false} 
						onChange={props.onChangeTheme}>
					</Switch>
				</p>
				<p style={styles}>
					<span>面包屑</span>
					<Switch 
						checkedChildren="开" 
						unCheckedChildren="关" 
						defaultChecked={props.breadcrumb.show} 
						onChange={props.onChangeBreadCrumb}>
					</Switch>
				</p>
				<p style={styles}>
					<span>标签</span>
					<Switch 
						checkedChildren="开" 
						unCheckedChildren="关" 
						defaultChecked={props.tag.show} 
						onChange={props.onChangeTag}>
					</Switch>
				</p>
			</Drawer>
		</>
	);
};
export default BasicDrawer;
