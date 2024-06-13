import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Link to='/react-freight/'>
          <Button type='primary'>返回首页</Button>
        </Link>
      }
    />
  );
};
export default NotFound;
