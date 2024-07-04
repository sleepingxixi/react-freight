import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import NotFound from '@/pages/errorPages/NotFound';
import ForbiddenPage from '@/pages/errorPages/Forbidden';
import Login from '@/pages/login';
import AppLayout from '@/layout/index';
// import User from '@/pages/system/user';

import AuthLoader from './AuthLoader';
import React from 'react';
import { lazyLoad } from './LazyLoad';
import BeforeCheck from './BeforeCheck';

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
        element: <BeforeCheck>{lazyLoad(React.lazy(() => import('@/pages/welcome')))}</BeforeCheck>
        // element: lazyLoad(React.lazy(() => import('@/pages/welcome')))
      },
      {
        path: '/dashboard',
        element: <BeforeCheck>{lazyLoad(React.lazy(() => import('@/pages/dashboard')))}</BeforeCheck>
        // element: lazyLoad(React.lazy(() => import('@/pages/dashboard')))
      },
      {
        path: '/userlist',
        // element: <User />
        element: <BeforeCheck>{lazyLoad(React.lazy(() => import('@/pages/system/user/indexHook')))}</BeforeCheck>
        // element: lazyLoad(React.lazy(() => import('@/pages/system/user/indexHook')))
      },
      {
        path: '/deptList',
        element: <BeforeCheck>{lazyLoad(React.lazy(() => import('@/pages/system/dept/index')))}</BeforeCheck>
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

const router = createBrowserRouter(routers);
// 路由变化时执行
// router.beforeEach(async (to, from, next) => {
//   await versionCheck() // 版本比对
//   next()
// });

// // 版本比对，全局缓存的版本 与 版本号文件读取结果 不同时，说明有新版本，5秒后自动刷新
// const versionCheck = async () => {
//   if (process.env.NODE_ENV === 'development') return
//   const response = await axios.get('version.json')
//   if (__APP_VERSION__ !== response.data.version) {
//       // 有新版本，刷新页面
//       console.log('有新版本，5秒后自动刷新页面');
//       setTimeout(() => {
//           window.location.reload()
//       }, 5000)
//   }
// }

// export default createBrowserRouter(routers);

export default router;
