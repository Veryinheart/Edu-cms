import { LogoutOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { deleteUserInfo } from '../utils/service/storage';
import { userLogout } from '../utils/service/user/userService';

function Logout() {
  const router = useRouter();
  const logout = async () => {
    try {
      const res = await userLogout();
      // console.log(response);
      if (res?.code === 201 && res?.msg === 'success') {
        // Storage.deleteUserInfo;
        deleteUserInfo();
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.msg);
      }
    }
  };

  return (
    <Button type="text" onClick={logout}>
      <LogoutOutlined /> Logout
    </Button>
  );
}

export default Logout;
