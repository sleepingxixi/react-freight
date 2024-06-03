import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import router from './router/index';
import './App.scss';
import './styles/theme.scss';
import { useUserInfo } from './stores';

function App() {
	const { isDark } = useUserInfo();
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
