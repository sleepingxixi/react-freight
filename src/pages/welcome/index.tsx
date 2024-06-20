// import { useEffect } from 'react';
// import { Button } from 'antd';
// import { Outlet } from 'react-router-dom';
// import request from '@/utils/request';
import styles from './index.module.scss';

const Welcome = () => {
  // useEffect(() => {
  // 	request.get('/user').catch(err => {
  // 		console.error(err);
  // 	});
  // });

  return (
    <div className={styles['welcome-container']}>
      <div className={styles.content}>
        <div className={styles.title}>欢迎体验</div>
        <div className={styles['sub-title']}>React18通用后台管理系统</div>
        <div className={styles.desc}>React18+ReactRouter6.0+AntD5.17+Typescript5.0+Vite实现通用后台</div>
      </div>
      <div className={styles.img}></div>
    </div>
  );
};

export default Welcome;
