import { BrowserRouter } from 'react-router-dom';
import Routers from './router/index';
import './App.css';
import { ConfigProvider } from 'antd';

function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					// Seed Token，影响范围大
					colorPrimary: '#fa8c16'
				}
			}}
		>
			<BrowserRouter>
				<Routers />
			</BrowserRouter>
		</ConfigProvider>
	);
}

export default App;
