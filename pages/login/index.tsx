import React from 'react';
import { Form, Row, Col, Radio, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Role, LoginForm } from './types';
import Header from '../../components/Header';

const Login: React.FC = () => {
  const onFinish = (values: LoginForm) => {
    console.log('Success:', values);
  };
  //   const a = 1;
  return (
    <>
      <Header />
      <Row justify="center">
        <Col md={8} lg={8} sm={24}>
          <Form name="login" onFinish={onFinish} autoComplete="off">
            <Form.Item name="role" initialValue={Role.student}>
              <Radio.Group>
                <Radio.Button value={Role.student}>Student</Radio.Button>
                <Radio.Button value={Role.teacher}>Teacher</Radio.Button>
                <Radio.Button value={Role.manager}>Manager</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true, type: 'email', message: '' }]}>
              <Input prefix={<UserOutlined />} placeholder="Please Input Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, min: 0, max: 16, message: 'Please input your Password!' }]}
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
              No Accounts <a href="#/">Sign Up</a>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
