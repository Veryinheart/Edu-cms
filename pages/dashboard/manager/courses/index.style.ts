import { Row } from 'antd';
import styled from 'styled-components';

export const CardItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  margin: 8px 0;
`;

export const SalesItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const SalesItemUp = styled.div`
  color: rgb(115, 86, 241);
  font-size: 24px;
  font-weight: bold;
`;

export const H2 = styled.h2`
  color: #7356f1;
`;

export const H3 = styled.h3`
  margin: 1em 0;
`;

export const StepsRow = styled(Row)`
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  .ant-steps-item-title {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 6em;
  }
`;
