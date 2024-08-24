import { IAuthLoader } from '@/router/AuthLoader';
import { searchRoute } from '@/utils';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom';
interface TabsItem {
  key: string;
  label: string;
  closable?: boolean;
}
export default function TabsFC() {
  const { pathname } = useLocation();
  const [tabsList, setTabsList] = useState<TabsItem[]>([
    {
      key: '/welcome',
      label: '首页',
      closable: false
    }
  ]);
  const [activeKey, setActiveKey] = useState<string>('');
  const navigate = useNavigate();
  // 权限判断
  const data = useRouteLoaderData('layout') as IAuthLoader;

  useEffect(() => {
    addTabs();
  }, [pathname]);
  // 动态设置当前要打开的页面标签

  const addTabs = () => {
    if (pathname === '/welcome') {
      setTabsList([...tabsList]);
      setActiveKey(pathname);
      return;
    }
    const route = searchRoute(pathname, data.menuList);
    if (!route) return;
    if (!tabsList.find(item => item.key == route.path)) {
      tabsList.push({
        key: route.path,
        label: route.menuName,
        closable: pathname !== '/welcome'
      });
    }
    setTabsList([...tabsList]);
    setActiveKey(pathname);
  };

  const handleDel = (path: string) => {
    if (pathname === path) {
      tabsList.forEach((item, index: number) => {
        if (item.key != pathname) return;
        const nextTab = tabsList[index + 1] || tabsList[index - 1];
        if (!nextTab) return;
        navigate(nextTab.key);
      });
    }
    setTabsList(tabsList.filter(item => item.key != path));
  };

  const handleChange = (path: string) => {
    navigate(path);
  };
  return (
    <Tabs
      activeKey={activeKey}
      items={tabsList}
      tabBarStyle={{ height: 40, marginBottom: 0, backgroundColor: '#fff' }}
      hideAdd
      type='editable-card'
      onChange={handleChange}
      onEdit={path => {
        handleDel(path as string);
      }}
    />
  );
}
