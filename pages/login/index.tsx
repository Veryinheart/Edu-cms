import React from 'react';
import { Form, Row, Col, Radio, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Role, LoginForm } from './types';
import Header from '../../components/Header';
import { useRouter } from 'next/router';
import { StyledLoginTitle } from './index.style';

const Login: React.FC = () => {
  const router = useRouter();

  const onFinish = (values: LoginForm) => {
    // some auth logic
    localStorage.setItem('role', values['role']);
    localStorage.setItem('email', values['email']);
    localStorage.setItem('password', values['password']);

    // redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <>
      <Header />

      <Row justify="center">
        <Col md={8} lg={8} sm={24}>
          <StyledLoginTitle>Course Management Assistant</StyledLoginTitle>
          <Form name="login" onFinish={onFinish} autoComplete="off">
            <Form.Item name="role" initialValue={Role.student}>
              <Radio.Group>
                <Radio.Button value={Role.student}>Student</Radio.Button>
                <Radio.Button value={Role.teacher}>Teacher</Radio.Button>
                <Radio.Button value={Role.manager}>Manager</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Please Input Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  min: 4,
                  max: 16,
                  message: 'password must be between 4 and 16 characters',
                },
              ]}
            >
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
              No Accounts <a href="#/">Sign Up</a>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
