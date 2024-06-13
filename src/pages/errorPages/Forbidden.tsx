import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const ForbiddenPage = () => {
  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, you are not authorized to access this page.'
      extra={
        <Link to='/react-freight/'>
          <Button type='primary'>返回首页</Button>
        </Link>
      }
    />
  );
};

export default ForbiddenPage;
