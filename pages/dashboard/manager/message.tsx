import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { getMessageData } from '../../../utils/service/messages/messagesService';
import { MessageHeaderWrapper } from './index.style';
import {
  Typography,
  Dropdown,
  Menu,
  MenuProps,
  Button,
  Space,
  List,
  Skeleton,
  Divider,
} from 'antd';

import { DownOutlined } from '@ant-design/icons';
import { UserId } from '../../../utils/service/user/types';
import { MessageItem } from '../../../utils/service/messages/messagesService';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Title, Text } = Typography;

const Message = ({ userId }: { userId: number }) => {
  const [paginator, setPaginator] = useState({ page: 1, limit: 20 });
  const [messageList, setMessageList] = useState<MessageItem[]>([]);
  const [messageType, setMessageType] = useState<string>('');
  const [total, setTotal] = useState<number>(0);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'all') {
      setMessageType('');
      setMessageList([]);
      setPaginator({ page: 1, limit: 20 });
    } else {
      setMessageType(e.key);
      setMessageList([]);
      setPaginator({ page: 1, limit: 20 });
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'All',
          key: 'all',
        },
        {
          label: 'Notification',
          key: 'notification',
        },
        {
          label: 'Message',
          key: 'message',
        },
      ]}
    />
  );

  useEffect(() => {
    const getMessageList = async () => {
      const params = messageType.length
        ? {
            userId: userId,
            type: messageType,
            ...paginator,
          }
        : { userId: userId, ...paginator };

      const messageRes = await getMessageData(params);

      if (messageRes) {
        console.log(messageRes);
        setTotal(messageRes?.data?.total);
        setMessageList((pre) => [...pre, ...messageRes?.data?.messages]);
      }
    };
    getMessageList();
  }, [userId, messageType, paginator]);

  return (
    <DashboardLayout>
      <MessageHeaderWrapper>
        <Title level={2}>Recent Messages</Title>

        <Dropdown overlay={menu}>
          <Button>
            <Space>
              {messageType.length === 0 ? 'All' : messageType}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        {/* <Dropdown overlay={menu}>{messageType}</Dropdown> */}
      </MessageHeaderWrapper>

      <div id="scrollableDiv" style={{ padding: '0 20px', overflow: 'scroll', maxHeight: '75vh' }}>
        <InfiniteScroll
          dataLength={messageList.length}
          next={() => {
            setPaginator({ ...paginator, page: paginator.page + 1 });
          }}
          hasMore={messageList.length < total}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={messageList}
            renderItem={(item) => (
              <List.Item key={`${Math.random() * item.id}`}>
                <List.Item.Meta title={<Text>{item.createdAt}</Text>} description={item.content} />
                <div>Content</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </DashboardLayout>
  );
};

export default Message;

export async function getServerSideProps(context) {
  // console.log(context);
  const paths = context.resolvedUrl.split('/');
  const role = paths[2];
  const userId = UserId[role];

  return {
    props: { userId },
  };
}
