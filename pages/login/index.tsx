import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Radio, Row } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { AES } from 'crypto-js';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Header from '../../components/Header';
import { API_URL, QueryPath } from '../../utils/constants/api';
import { ValidateMessages } from '../../utils/constants/messages';
import Storage from '../../utils/service/storage';
import { StyledLoginTitle } from './index.style';
import { LoginFormValues, Role } from './types';

const Login: React.FC = () => {
  const router = useRouter();

  const login = async ({ password, ...rest }: LoginFormValues) => {
    //login request
    try {
      const res: AxiosResponse = await axios.post(`${API_URL}/${QueryPath.login}`, {
        password: AES.encrypt(password, 'cms').toString(),
        ...rest,
      });

      Storage.setUserInfo(res?.data.data);
      router.push('/dashboard/manager/students');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response);
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
            onFinish={login}
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
