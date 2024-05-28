import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import Welcome from '@/pages/Welcome';
import NotFound from '@/pages/errorPages/NotFound';
import ForbiddenPage from '@/pages/errorPages/Forbidden';
import Login from '@/pages/Login';
import AppLayout from '@/layout/index';

const routers: RouteObject[] = [
	{
		path: '/',
		element: <Navigate to='/welcome' />
	},
	{
		element: <AppLayout />,
		children: [
			{
				path: '/welcome',
				element: <Welcome />
			}
		]
	},
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '*',
		element: <Navigate to='/404' />
	},
	{
		path: '/404',
		element: <NotFound />
	},
	{
		path: '/403',
		element: <ForbiddenPage />
	}
];

// export default createBrowserRouter(routers);

export default function () {
	return useRoutes(routers);
}
