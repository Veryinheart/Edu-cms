import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Affix, Layout, Space, Tooltip } from 'antd';

// import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Appbreadcrumb from '../Appbreadcrumb';
import Logout from '../Logout';
import SideMenu from '../SideMenu';
import { routes } from '../../utils/constants/routes';
import {
  StyledBreadcrumbContainer,
  StyledCollapsedMenu,
  StyledContent,
  StyledHeaderLayout,
} from './index.style';
import { getRole } from '../../utils/service/storage';

const { Content } = Layout;

const Dashboard: React.FC = (props: React.PropsWithChildren<React.ReactNode>) => {
  // const router = useRouter();
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Affix>
          <SideMenu
            data={routes.get(getRole())}
            role={getRole()}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
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
              <Appbreadcrumb />
            </StyledBreadcrumbContainer>

            <StyledContent>{children}</StyledContent>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;

{
  /* <Sider
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

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                Overview
              </Menu.Item>
              <SubMenu key="sub1" icon={<SolutionOutlined />} title="Student">
                <Menu.Item key="2" icon={<UserOutlined />}>
                  <Link href="/dashboard/manager/students" passHref>
                    Student List
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<DeploymentUnitOutlined />} title="Teacher">
                <Menu.Item key="3" icon={<UserOutlined />}>
                  Teacher List
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<ReadOutlined />} title="Course">
                <Menu.Item key="All-Course" icon={<ProjectOutlined />}>
                  All Course
                </Menu.Item>
                <Menu.Item key="Add-Course" icon={<FileAddOutlined />}>
                  Add Course
                </Menu.Item>
                <Menu.Item key="Edit-Course" icon={<EditOutlined />}>
                  Edit Course
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="4" icon={<MessageOutlined />}>
                Message
              </Menu.Item>
            </Menu>
          </Sider> */
}
