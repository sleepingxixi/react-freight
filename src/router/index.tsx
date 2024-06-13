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
    path: '/react-freight/',
    element: <Navigate to='/react-freight/welcome' />
  },
  {
    id: 'layout',
    element: <AppLayout />,
    loader: AuthLoader,
    children: [
      {
        path: '/react-freight/welcome',
        element: lazyLoad(React.lazy(() => import('@/pages/welcome')))
      },
      {
        path: '/react-freight/dashboard',
        element: lazyLoad(React.lazy(() => import('@/pages/dashboard')))
      },
      {
        path: '/react-freight/userlist',
        // element: <User />
        element: lazyLoad(React.lazy(() => import('@/pages/system/user/indexHook')))
      },
      {
        path: '/react-freight/deptList',
        element: lazyLoad(React.lazy(() => import('@/pages/system/dept/index')))
      }
    ]
  },
  {
    path: '/react-freight/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Navigate to='/react-freight/404' />
  },
  {
    path: '/react-freight/404',
    element: <NotFound />
  },
  {
    path: '/react-freight/403',
    element: <ForbiddenPage />
  }
];

// export default createBrowserRouter(routers);

export default createBrowserRouter(routers);
