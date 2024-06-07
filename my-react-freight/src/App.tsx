import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import router from './router/index';
import './App.scss';
import './styles/theme.scss';
import { useUserInfo } from './stores';
import { log } from '@/utils/log';
import { useEffect } from 'react';

function App() {
	const { isDark } = useUserInfo();
	useEffect(() => {
		log.info('启动项目', '冲啊');
		log.picture(
			'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0514%2Fd0ea93ebj00sdgx56001xd200u000gtg00hz00a2.jpg&thumbnail=660x2147483647&quality=80&type=jpg'
		);
	}, []);

	return (
		<ConfigProvider
			theme={{
				token: {
					// Seed Token，影响范围大
					colorPrimary: '#fa8c16'
				},
				algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
			}}
		>
			{/* <BrowserRouter>
				<Routers />
			</BrowserRouter> */}
			<RouterProvider router={router} />
		</ConfigProvider>
	);
}

export default App;
