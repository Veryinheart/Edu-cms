import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Affix, Layout, Space, Dropdown, Menu, Badge, Avatar, Tabs, List, Skeleton } from 'antd';
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
  TabNavContainer,
} from './index.style';
import { getRole } from '../../utils/service/storage';
import Link from 'next/link';
import { UserId } from '../../utils/service/user/types';
import {
  getMessageStatisticById,
  getMessageData,
  MessageItem,
  MessageStatisticType,
} from '../../utils/service/messages/messagesService';
import { Paginator } from '../../utils/constants/api';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Content, Sider } = Layout;
const { TabPane } = Tabs;

type LayoutProps = {
  userRole?: string;
  userId?: number;
};

// const MessageListItem = ()=>{

// }

const logOutStyle = { color: 'white', fontSize: '20px' };

const Dashboard: React.FC<LayoutProps> = ({ children, userRole, userId }) => {
  const [collapsed, setCollapsed] = useState(false);
  // const [loading,setLoading]=useState<boolean>(false);
  const [messageStatistic, setMessageStatistic] = useState<MessageStatisticType>();
  const [messageList, setMessageList] = useState<MessageItem[]>([]);
  const [messageTotal, setMessageTotal] = useState<number>(0);
  const [notificationTotal, setNotificationTotal] = useState<number>(0);
  const [notificationList, setNotificationList] = useState<MessageItem[]>([]);
  const [messagePaginator, setMessagePaginator] = useState<Paginator>({ page: 1, limit: 10 });
  const [notificationPaginator, setNotificationPaginator] = useState<Paginator>({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const getMessage = async () => {
      const statisticResponse = await getMessageStatisticById(userId);
      const messageListResponse = await getMessageData({
        userId: userId,
        type: 'message',
        ...messagePaginator,
      });
      const notificationResponse = await getMessageData({
        userId: userId,
        type: 'notification',
        ...notificationPaginator,
      });

      if (messageListResponse) {
        console.log('first');
        setMessageTotal(messageListResponse?.data?.total);
        setMessageList((pre) => [...pre, ...messageListResponse?.data?.messages]);
      }
      if (notificationResponse) {
        setNotificationTotal(notificationResponse?.data?.total);
        setNotificationList((pre) => [...pre, ...notificationResponse?.data?.messages]);
      }

      if (statisticResponse) {
        // console.log(statisticResponse);
        setMessageStatistic(statisticResponse?.data);
      }
    };

    getMessage();
  }, [userId, messagePaginator, notificationPaginator]);

  const menu = (
    <Menu>
      <Menu.Item>
        <Logout />
      </Menu.Item>
    </Menu>
  );

  const messageMenu = (
    <div>
      <Tabs
        defaultActiveKey="1"
        renderTabBar={(props, DefaultTabBar) => (
          <TabNavContainer>
            <DefaultTabBar {...props} />
          </TabNavContainer>
        )}
      >
        <TabPane
          tab={`Messages (${messageStatistic?.receive?.message?.unread})`}
          key="notification"
        >
          <div
            id="messageDiv"
            style={{
              height: 400,
              overflow: 'auto',
              padding: '0 16px',
            }}
          >
            <InfiniteScroll
              dataLength={messageList.length}
              next={() => {
                console.log('[ mp ] >');
                setMessagePaginator({ ...messagePaginator, page: messagePaginator.page + 1 });
              }}
              hasMore={messageList.length < messageTotal}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              scrollableTarget="messageDiv"
            >
              <List
                size="small"
                dataSource={messageList}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={item.from.nickname}
                    />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </TabPane>
        <TabPane
          tab={`Notification (${messageStatistic?.receive?.notification?.unread})`}
          key="message"
        >
          <div
            id="notificationDiv"
            style={{
              height: 400,
              overflow: 'auto',
              padding: '0 16px',
            }}
          >
            <InfiniteScroll
              dataLength={notificationList.length}
              next={() => {
                setNotificationPaginator({
                  ...notificationPaginator,
                  page: notificationPaginator.page + 1,
                });
              }}
              hasMore={notificationList.length < notificationTotal}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              scrollableTarget="notificationDiv"
            >
              <List
                size="small"
                dataSource={notificationList}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={item.from.nickname}
                    />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </TabPane>
      </Tabs>
    </div>
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
                        messageStatistic &&
                        messageStatistic?.receive?.message?.unread +
                          messageStatistic?.receive?.notification?.unread
                      }
                      offset={[15, 0]}
                    >
                      <Dropdown
                        overlay={messageMenu}
                        trigger={['click']}
                        overlayStyle={{
                          border: '1px solid rgba(0, 0, 0, 0.06)',
                          borderRadius: '10px',
                          backgroundColor: 'white',
                        }}
                      >
                        <BellOutlined style={logOutStyle} />
                      </Dropdown>
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
