import { LogoutOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React from 'react';
// import { StyledLogoutContent } from '../pages/dashboard/index.style';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';

import { API_URL } from '../utils/constants/api';

function Logout() {
  const router = useRouter();

  const { token } = JSON.parse(localStorage.getItem('cms') || '');

  const logout = async () => {
    try {
      const response: AxiosResponse = await axios.post(
        `${API_URL}/logout`,
        {},
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );
      if (response) {
        localStorage.removeItem('cms');
        router.push('/login');
      }
    } catch (error) {
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
