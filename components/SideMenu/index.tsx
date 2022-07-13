import { Menu } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { routes, SideNav } from '../../utils/constants/routes';
import { Role } from '../../utils/service/user/types';
import { getRole } from '../../utils/service/storage';
import { generateKey, getActiveKey } from '../../utils/common/side-menu';
import Link from 'next/link';

const SideMenu = ({
  data,
  role,
}: {
  data: SideNav[];
  role: Role;
  // collapsed: boolean;
  // setCollapsed: (value: React.SetStateAction<boolean>) => void;
}) => {
  const [sideMenuItems, setSideMenuItem] = useState<JSX.Element[]>();

  // const sideNavMenu = routes.get(getRole());
  // console.log(sideNavMenu);

  const renderSideMenu = useCallback((data: SideNav[], parent = ''): JSX.Element[] => {
    const userRole = getRole();

    return data.map((item, index) => {
      // console.log(item, index);
      const key = generateKey(item, index);

      if (item.subNav && !!item.subNav.length) {
        return (
          <Menu.SubMenu key={key} title={item.label} icon={item.icon}>
            {renderSideMenu(item.subNav, item.path.join('/'))}
          </Menu.SubMenu>
        );
      } else {
        return item.hide ? null : (
          <Menu.Item key={key} title={item.label} icon={item.icon}>
            {!!item.path.length || item.label.toLocaleLowerCase() === 'overview' ? (
              <Link
                href={['/dashboard', userRole, parent, ...item.path]
                  .filter((item) => !!item)
                  .join('/')}
                replace
              >
                {item.label}
              </Link>
            ) : (
              item.label
            )}
          </Menu.Item>
        );
      }
    });
  }, []);

  const getMenuConfig = (
    data: SideNav[]
  ): { defaultSelectedKeys: string[]; defaultOpenKeys: string[] } => {
    const key = getActiveKey(data);
    const defaultSelectedKeys = [key.split('/').pop()];
    const defaultOpenKeys = key.split('/').slice(0, -1);

    return { defaultSelectedKeys, defaultOpenKeys };
  };
  const { defaultOpenKeys, defaultSelectedKeys } = getMenuConfig(routes.get(getRole()));

  useEffect(() => {
    const res = renderSideMenu(data);
    setSideMenuItem(res);
  }, [role, data, renderSideMenu]);

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={defaultSelectedKeys}
    >
      {sideMenuItems}
    </Menu>
  );
};

export default SideMenu;
