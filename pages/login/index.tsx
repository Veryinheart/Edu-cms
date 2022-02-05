import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';
import { Form, Row, Col, Radio, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AES } from 'crypto-js';

import { Role, LoginFormValues } from './types';
import Header from '../../components/Header';
import { StyledLoginTitle } from './index.style';
import { ValidateMessages } from '../../utils/constants/messages';

import { API_URL } from '../../utils/constants/api';

const Login: React.FC = () => {
  const router = useRouter();

  const onFinish = async ({ password, ...rest }: LoginFormValues) => {
    //login request
    try {
      const res: AxiosResponse = await axios.post(`${API_URL}/login`, {
        password: AES.encrypt(password, 'cms').toString(),
        ...rest,
      });

      localStorage.setItem('cms', JSON.stringify(res?.data.data));

      router.push('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data.msg);
      }
    }
  };

  return (
    <>
      <Header />

      <StyledLoginTitle>Course Management Assistant</StyledLoginTitle>

      <Row justify="center">
        <Col md={8} sm={24}>
          <Form
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            validateMessages={ValidateMessages}
          >
            <Form.Item name="role" initialValue={Role.student} rules={[{ required: true }]}>
              <Radio.Group>
                <Radio.Button value={Role.student}>Student</Radio.Button>
                <Radio.Button value={Role.teacher}>Teacher</Radio.Button>
                <Radio.Button value={Role.manager}>Manager</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="email" rules={[{ type: 'email' }, { required: true }]}>
              <Input prefix={<UserOutlined />} placeholder="Please Input Email" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true }, { min: 4, max: 16 }]}>
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Please Input Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Log in
              </Button>
            </Form.Item>

            <Form.Item>
              No Accounts <Link href="/">Sign Up</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
