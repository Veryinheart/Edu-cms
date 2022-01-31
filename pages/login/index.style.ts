import styled from 'styled-components';
import { Typography } from 'antd';

const { Title } = Typography;

export const StyledLoginTitle = styled(Title)`
  text-align: center;
  margin: 0.5em 0;
  @media (max-width: 700px) {
    margin-top: 2em;
    font-size: 18px !important;
    padding-bottom: 0;
  }
`;
