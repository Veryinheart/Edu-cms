import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
// import { StyledLogoutContent } from '../pages/dashboard/index.style';
import { useRouter } from 'next/router';

function Logout() {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem('cms');
    router.push('/login');
  };

  return (
    <Button type="text" onClick={logout}>
      <LogoutOutlined /> Logout
    </Button>
  );
}

export default Logout;
