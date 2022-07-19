import { Col } from 'antd';
import styled from 'styled-components';

export const OverviewIconCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  .anticon {
    background: #fff;
    padding: 25px;
    border-radius: 50%;
    color: #999;
  }
  padding-right: 10px;
`;

export const OverviewCol = styled(Col)`
  color: #fff;
  h3 {
    color: #fff;
  }
  h2 {
    color: #fff;
    font-size: 32px;
    margin-bottom: 0;
  }
`;

export const StyledOverviewCardContainer = styled.div`
  margin-bottom: 20px;
`;

export const StyledGraphicContainer = styled.div`
  display: flex;
`;

export const MessageHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MessageListContainer = styled.div`
  padding: '0 20px';
  overflow: 'scroll';
  max-height: '75vh';
`;
