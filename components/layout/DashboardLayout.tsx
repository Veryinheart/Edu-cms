import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Affix, Layout, Space, Dropdown, Menu, Badge, Avatar, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import Appbreadcrumb from '../Appbreadcrumb';
import Logout from '../Logout';
import SideMenu from '../SideMenu';
import { routes } from '../../utils/constants/routes';
import {
  Logo,
  StyledBreadcrumbContainer,
  StyledCollapsedMenu,
  StyledContent,
  StyledHeaderLayout,
  LogOutWrapper,
} from './index.style';
import { getRole } from '../../utils/service/storage';
import Link from 'next/link';
import { UserId } from '../../utils/service/user/types';
import {
  getMessageStatisticById,
  MessageStatisticType,
} from '../../utils/service/messages/messagesService';

const { Content, Sider } = Layout;

type LayoutProps = {
  userRole?: string;
  userId?: number;
};

const logOutStyle = { color: 'white', fontSize: '20px' };

const Dashboard: React.FC<LayoutProps> = ({ children, userRole, userId }) => {
  const [collapsed, setCollapsed] = useState(false);
  // const [loading,setLoading]=useState<boolean>(false);
  const [messageStatistic, setMessageStatistic] = useState<MessageStatisticType>();

  useEffect(() => {
    const getMessageStatistic = async () => {
      const res = await getMessageStatisticById(userId);
      if (res) {
        console.log(res);
        setMessageStatistic(res?.data);
      }
    };

    getMessageStatistic();
  }, [userId]);

  const menu = (
    <Menu>
      <Menu.Item>
        <Logout />
      </Menu.Item>
    </Menu>
  );

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
            <SideMenu data={routes.get(getRole())} role={getRole()} />
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

              <div>
                <LogOutWrapper>
                  <Space style={{ marginRight: '3rem' }}>
                    <Badge
                      count={
                        messageStatistic?.receive?.message?.unread +
                        messageStatistic?.receive?.notification?.unread
                      }
                      offset={[15, 0]}
                    >
                      <BellOutlined style={logOutStyle} />
                    </Badge>
                  </Space>
                  <Space size="large">
                    <Dropdown overlay={menu} placement="bottomRight">
                      <Avatar icon={<UserOutlined style={logOutStyle} />} />
                    </Dropdown>
                  </Space>
                </LogOutWrapper>
              </div>
            </StyledHeaderLayout>
          </Affix>

          <Content className="contentDiv">
            <StyledBreadcrumbContainer>
              <Appbreadcrumb userRole={userRole} />
            </StyledBreadcrumbContainer>

            <StyledContent>{children}</StyledContent>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;

export async function getServerSideProps(context) {
  // console.log(context);
  const paths = context.resolvedUrl.split('/');
  const role = paths[2];
  const userId = UserId[role];
  // console.log(userId);

  return {
    props: { userId },
  };
}
