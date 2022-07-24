import { QueryPath } from '../../constants/api';
import { getParamRequest, putRequest } from '../request';
import { API_URL, IResponse } from '../apiConfig';
import { getUserId } from '../storage';

const path = QueryPath.messages;

export interface MessageStatisticType {
  sent: Receive;
  receive: Receive;
}

export interface Receive {
  notification: Message;
  message: Message;
}

export interface Message {
  total: number;
  unread: number;
  read: number;
}

export interface MessageItem {
  createdAt: Date;
  id: number;
  content: string;
  status: number;
  type: string;
  from: From;
}

export interface From {
  id: number;
  role: string;
  nickname: string;
}

interface MessageListResponse {
  messages: MessageItem[];
  paginator: { page: number; limit: number };
  total: number;
}

interface SuccessResponse {
  data: true;
}

export const getMessageStatisticById = (
  id: number | string | string[] | undefined
): Promise<IResponse<MessageStatisticType> | undefined> => {
  return getParamRequest<IResponse<MessageStatisticType> | undefined>(`${path}/statistics`, {
    userId: id,
  });
};

export const getMessageData = ({
  userId,
  page,
  limit,
  type,
}: {
  userId: number;
  page: number;
  limit: number;
  type?: string;
}): Promise<IResponse<MessageListResponse> | undefined> => {
  return getParamRequest<IResponse<MessageListResponse> | undefined>(path, {
    userId: userId,
    page: page,
    limit: limit,
    type: type,
  });
};

export const updateMessageAsRead = (
  ids: number[]
): Promise<IResponse<SuccessResponse> | undefined> => {
  return putRequest<IResponse<SuccessResponse> | undefined>(path, {
    ids: ids,
    status: 1,
  });
};

export function messageEvent(): EventSource {
  const userId = getUserId();

  return new EventSource(`${API_URL}/${path}/subscribe?userId=${userId}`, {
    withCredentials: true,
  });
}
