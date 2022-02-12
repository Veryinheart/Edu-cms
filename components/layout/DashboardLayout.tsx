import {
  BellOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  EditOutlined,
  FileAddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  ProjectOutlined,
  ReadOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Affix, Breadcrumb, Layout, Menu, Space, Tooltip } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import Logout from '../Logout';
import {
  Logo,
  StyledBreadcrumbContainer,
  StyledCollapsedMenu,
  StyledContent,
  StyledHeaderLayout,
} from './index.style';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const Dashboard: React.FC = (props: React.PropsWithChildren<React.ReactNode>) => {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Affix>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={() => {
              setCollapsed(!collapsed);
            }}
            style={{ height: '100vh' }}
          >
            {
              <Logo>
                <Link href="/" passHref={true}>
                  <span style={{ color: '#fff', cursor: 'pointer' }}>CMS</span>
                </Link>
              </Logo>
            }

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                Overview
              </Menu.Item>
              <SubMenu key="sub1" icon={<SolutionOutlined />} title="Student">
                <Link href="/dashboard/manager/students" passHref>
                  <Menu.Item key="abc" icon={<UserOutlined />}>
                    Student List
                  </Menu.Item>
                </Link>
              </SubMenu>
              <SubMenu key="sub2" icon={<DeploymentUnitOutlined />} title="Teacher">
                <Menu.Item key="add" icon={<UserOutlined />}>
                  Teacher List
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<ReadOutlined />} title="Course">
                <Menu.Item key="All-Course" icon={<ProjectOutlined />}>
                  All Course
                </Menu.Item>
                <Menu.Item key="Add-COurse" icon={<FileAddOutlined />}>
                  Add Course
                </Menu.Item>
                <Menu.Item key="Edit-Course" icon={<EditOutlined />}>
                  Edit Course
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="3" icon={<MessageOutlined />}>
                Message
              </Menu.Item>
            </Menu>
          </Sider>
        </Affix>

        <Layout>
          <Affix>
            <StyledHeaderLayout>
              <StyledCollapsedMenu
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </StyledCollapsedMenu>

              <StyledCollapsedMenu>
                <Space size="large">
                  <BellOutlined />

                  <Tooltip placement="bottomRight" title={<Logout />} color={'white'}>
                    <UserOutlined />
                  </Tooltip>
                </Space>
              </StyledCollapsedMenu>
            </StyledHeaderLayout>
          </Affix>

          <Content>
            <StyledBreadcrumbContainer>
              <Breadcrumb.Item>CMS Manager System</Breadcrumb.Item>
              <Breadcrumb.Item>Overview</Breadcrumb.Item>
            </StyledBreadcrumbContainer>

            <StyledContent>{children}</StyledContent>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
