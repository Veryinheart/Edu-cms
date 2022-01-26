import React from "react";
import { Form, Row, Col, Radio, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { UserType } from "../../utils/constants/userType";

const Login: React.FC = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return <>
        <Row justify="center">
            <Col md={8} lg={8} sm={24}>
                <Form
                    name="login"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item name="userType">
                        <Radio.Group>
                            <Radio.Button value={UserType.student}>Student</Radio.Button>
                            <Radio.Button value={UserType.teacher}>Teacher</Radio.Button>
                            <Radio.Button value={UserType.manager}>Manager</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your email' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Please input Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Please input Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Log in
                        </Button>
                        No Accounts <a href="">Sign Up</a>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    </>;
};


export default Login;