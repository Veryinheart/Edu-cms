import { LogoutOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React from 'react';
// import { StyledLogoutContent } from '../pages/dashboard/index.style';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';

import { QueryPath } from '../utils/constants/api';
import Storage from '../utils/service/storage';
import { API_URL } from '../utils/service/apiConfig';
function Logout() {
  const router = useRouter();
  const token = Storage.token;
  // const { token } = JSON.parse(localStorage.getItem('cms') || '');

  const logout = async () => {
    console.log(`${API_URL}/${QueryPath.logout}`);
    try {
      const response: AxiosResponse = await axios.post(
        `${API_URL}/${QueryPath.logout}`,
        {},
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );
      if (response) {
        Storage.deleteUserInfo;
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
