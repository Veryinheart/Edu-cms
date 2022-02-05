import styled from 'styled-components';

export const StyledCollapsedMenu = styled.div`
  padding: 0 20px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
  color: #fff;
  &:hover {
    color: #1890ff;
  }
`;

export const StyledLogo = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
`;

export const StyledHeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledLogoutContent = styled.div`
  background-color: #fff;
  color: black;
`;
