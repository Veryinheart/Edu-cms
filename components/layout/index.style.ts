import { Layout, Breadcrumb } from 'antd';
import styled from 'styled-components';

const { Header } = Layout;

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

export const LogOutWrapper = styled.div`
  font-size: 18px;
  color: 'white';
`;

export const StyledLogo = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
`;

export const Logo = styled.div`
  height: 64px;
  display: inline-flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #fff;
  letter-space: 5px;
  text-shadow: 5px 1px 5px;
  transform: rotateX(45deg);
  font-family: monospace;
`;

export const StyledHeaderLayout = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  top: 0;
  z-index: 10;
`;

export const StyledLogoutContent = styled.div`
  background-color: #fff;
  color: black;
`;

export const StyledContent = styled.div`
  margin: 16px;
  background-color: #fff;
  padding: 16px;
  min-height: auto;
`;

export const StyledBreadcrumbContainer = styled(Breadcrumb)`
  margin: 0 16px;
  padding: 16px;
`;

export const TabNavContainer = styled.div`
  margin-bottom: 0;
  padding: 10px 20px 0 20px;
  .ant-tabs-nav-list {
    width: 100%;
    justify-content: space-around;
  }
`;
