import { MailOutlined, PieChartOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const SideMenu = () => {
	const navigate = useNavigate();
	const items: MenuItem[] = [
		{
			key: '1',
			icon: <PieChartOutlined />,
			label: '工作台',
			onClick: () => {
				navigate('/dashboard');
			}
		},
		{
			key: '2',
			label: '系统管理',
			icon: <MailOutlined />,
			children: [
				{ key: '5', label: '图标管理' },
				{ key: '6', label: '人员管理' }
			]
		}
	];

	const handleLogo = () => {
		navigate('/welcome');
	};

	return (
		<div style={{ width: 256 }}>
			<div className={styles['logo-view']} onClick={handleLogo}>
				<img src='/public/imgs/logo.png' alt='图标' className={styles.logo} />
				<div>平平货运</div>
			</div>
			<Menu
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['2']}
				mode='inline'
				theme='dark'
				// inlineCollapsed={collapsed}
				items={items}
			/>
		</div>
	);
};

export default SideMenu;
