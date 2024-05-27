import React, { useEffect, useState } from 'react';
// import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icoxns';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Watermark } from 'antd';
import NavHeader from '@/components/NavHeader';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
	return {
		key,
		icon,
		children,
		label
	} as MenuItem;
}

// const items: MenuItem[] = [
// 	getItem('Option 1', '1', <PieChartOutlined />),
// 	getItem('Option 2', '2', <DesktopOutlined />),
// 	getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5')]),
// 	getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
// 	getItem('Files', '9', <FileOutlined />)
// ];

const AppLayout: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG }
	} = theme.useToken();

	// useEffect(() => {
	// 	// 选择需要观察变动的节点
	// 	const targetNode = document.getElementById('test-id') as HTMLElement;

	// 	// 观察器的配置（需要观察什么变动）
	// 	const config = { attributes: true, childList: true, subtree: true };

	// 	// 当观察到变动时执行的回调函数
	// 	const callback = function (mutationsList: MutationRecord[], observer: MutationObserver) {
	// 		console.log(mutationsList);
	// 		console.log('变化了');
	// 		// Use traditional 'for loops' for IE 11
	// 		for (let mutation of mutationsList) {
	// 			if (mutation.type === 'childList') {
	// 				// 假设在这里监听到删除元素
	// 				// 1. 先停止监听
	// 				observer.disconnect();
	// 				// 2.重新新增元素
	// 				const node = document.createElement('span');
	// 				node.innerText = 'hello';
	// 				targetNode.appendChild(node);
	// 				// 3. 开启监听
	// 				observer.observe(targetNode, config);
	// 			}
	// 		}
	// 	};

	// 	// 创建一个观察器实例并传入回调函数
	// 	const observer = new MutationObserver(callback);
	// 	observer.observe(targetNode, config);
	// }, []);

	return (
		<Watermark content='watermark'>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
					<div className='demo-logo-vertical' />
					菜单区域
					{/* <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} /> */}
				</Sider>
				<Layout>
					<NavHeader />
					<Content style={{ margin: '0 16px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>User</Breadcrumb.Item>
							<Breadcrumb.Item>Bill</Breadcrumb.Item>
						</Breadcrumb>
						<div
							id='test-id'
							style={{
								padding: 24,
								minHeight: 360,
								background: colorBgContainer,
								borderRadius: borderRadiusLG
							}}
						>
							<span id='content-test'>content</span>
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
				</Layout>
			</Layout>
		</Watermark>
	);
};

export default AppLayout;
