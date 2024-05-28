import styles from './index.module.scss';
import { Layout, Watermark } from 'antd';
import NavHeader from '@/components/NavHeader';
import NavFooter from '@/components/NavFooter';
import SideMenu from '@/components/SideMenu';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Api from '@/api';
import { User } from '@/types/api';
import { useUserInfo } from '@/stores';

const { Content, Sider } = Layout;

const AppLayout = () => {
	const state = useUserInfo();
	useEffect(() => {
		getUserInfo();
	}, []);
	const getUserInfo = async () => {
		const data: User.UserInfo = await Api.getUserInfo();
		state.setUserInfo(data);
	};
	return (
		<Watermark content='smilePing'>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider width='256'>
					<SideMenu />
				</Sider>
				<Layout>
					<NavHeader />
					<Content className={styles.content}>
						<div className={styles.wrapper}>
							<Outlet />
						</div>
						<NavFooter />
					</Content>
				</Layout>
			</Layout>
		</Watermark>
	);
};

export default AppLayout;
