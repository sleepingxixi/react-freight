import { Outlet } from 'react-router-dom';

const Welcome = () => {
	return (
		<div>
			Welcome to System
			<Outlet></Outlet>
		</div>
	);
};

export default Welcome;
