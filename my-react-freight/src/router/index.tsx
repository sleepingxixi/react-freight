import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import Welcome from '../pages';
import NotFound from '../pages/errorPages/NotFound';
import ForbiddenPage from '../pages/errorPages/Forbidden';

const router: RouteObject[] = [
	{
		path: '/',
		element: <Welcome />,
		children: [
			{
				path: 'vite',
				element: <div>vite</div>,
			},
		],
	},
	{ path: '*', element: <Navigate to='/404' /> },
	{ path: '/404', element: <NotFound /> },
	{ path: '/403', element: <ForbiddenPage /> },
];

export default createBrowserRouter(router);
