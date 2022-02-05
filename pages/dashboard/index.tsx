import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Tooltip } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SolutionOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  UserOutlined,
  MessageOutlined,
  ReadOutlined,
  FileAddOutlined,
  EditOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import { StyledCollapsedMenu, StyledLogo, StyledHeaderLayout } from './index.style';
import Logout from '../../components/Logout';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    console.log(collapsed);
  }, [collapsed]);

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible trigger={null} collapsed={collapsed}>
          <StyledLogo />

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              Overview
            </Menu.Item>
            <SubMenu key="sub1" icon={<SolutionOutlined />} title="Student">
              <Menu.Item key="abc" icon={<UserOutlined />}>
                Student List
              </Menu.Item>
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

        <Layout>
          <Header>
            <StyledHeaderLayout>
              <StyledCollapsedMenu>
                {collapsed ? (
                  <MenuUnfoldOutlined
                    onClick={() => {
                      setCollapsed(!collapsed);
                    }}
                  />
                ) : (
                  <MenuFoldOutlined
                    onClick={() => {
                      setCollapsed(!collapsed);
                    }}
                  />
                )}
              </StyledCollapsedMenu>
              <StyledCollapsedMenu>
                <Tooltip placement="bottomRight" title={<Logout />} color={'white'}>
                  <UserOutlined />
                </Tooltip>
              </StyledCollapsedMenu>
            </StyledHeaderLayout>
          </Header>

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>CMS Manager System</Breadcrumb.Item>
              <Breadcrumb.Item>Overview</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              something with chart, map, table
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;

// {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
//   className: 'trigger',
//   onClick: () => {
//     setCollapsed(!collapsed);
//   },
// })}
