import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import Welcome from '@/pages';
import NotFound from '@/pages/errorPages/NotFound';
import ForbiddenPage from '@/pages/errorPages/Forbidden';
import Login from '@/pages/Login';

const routers: RouteObject[] = [
	{
		path: '/',
		element: <Welcome />,
		children: [
			{
				path: 'vite',
				element: <div>vite</div>
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
