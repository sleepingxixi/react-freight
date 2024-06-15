import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import NotFound from '@/pages/errorPages/NotFound';
import ForbiddenPage from '@/pages/errorPages/Forbidden';
import Login from '@/pages/login';
import AppLayout from '@/layout/index';
// import User from '@/pages/system/user';

import AuthLoader from './AuthLoader';
import React from 'react';
import { lazyLoad } from './LazyLoad';

const routers: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    id: 'layout',
    element: <AppLayout />,
    loader: AuthLoader,
    children: [
      {
        path: '/welcome',
        element: lazyLoad(React.lazy(() => import('@/pages/welcome')))
      },
      {
        path: '/dashboard',
        element: lazyLoad(React.lazy(() => import('@/pages/dashboard')))
      },
      {
        path: '/userlist',
        // element: <User />
        element: lazyLoad(React.lazy(() => import('@/pages/system/user/indexHook')))
      },
      {
        path: '/deptList',
        element: lazyLoad(React.lazy(() => import('@/pages/system/dept/index')))
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

export default createBrowserRouter(routers);
