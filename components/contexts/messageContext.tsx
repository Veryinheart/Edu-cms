import { createContext, useContext, useReducer, ReactNode } from 'react';

interface MessageStore {
  total: number;
  notification: number;
  message: number;
}

type MessageType = 'message' | 'notification';

export type Dispatch = (action: MessageAction) => void;

const MessagesStatisticContext = createContext(undefined);

const store: MessageStore = {
  total: 0,
  notification: 0,
  message: 0,
};

export type ActionType = 'increment' | 'decrement' | 'reset';

type MessageAction = {
  type: ActionType;
  payload?: { count: number; type: MessageType };
};

export const Action = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  RESET: 'reset',
};

const messageReducer = (state, action: MessageAction) => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        [action.payload.type]: state[action.payload.type] + action.payload.count,
        total: state.total + action.payload.count,
      };
    case 'decrement':
      return {
        ...state,
        [action.payload.type]: state[action.payload.type] - action.payload.count,
        total: state.total - action.payload.count,
      };
    case 'reset':
      return { ...state };
    default:
      return { ...state };
  }
};

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(messageReducer, store);

  return (
    <MessagesStatisticContext.Provider value={{ state, dispatch }}>
      {children}
    </MessagesStatisticContext.Provider>
  );
}

export function useMessageStatistic() {
  const context = useContext(MessagesStatisticContext);

  if (!context) throw new Error('useMessagesStatistic error');
  return context;
}
