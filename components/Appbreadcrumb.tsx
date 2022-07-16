import React from 'react';
import { useRouter } from 'next/router';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { getRole } from '../utils/service/storage';
import { SideNav } from '../utils/constants/routes';
import { routes } from '../utils/constants/routes';
import { getSideNavNameByPath } from '../utils/common/side-menu';
import { deepSearchRecordFactory } from '../utils/common/deep-search';
// import { Role } from '../utils/service/user/types';
import useRole from './custom-hooks/useRole';

const Appbreadcrumb = ({ userRole }: { userRole: string }) => {
  const router = useRouter();
  const userRole1 = useRole();
  const path = router.pathname;
  const paths = path.split('/').slice(1);
  const root = '/' + paths.slice(0, 2).join('/');
  // console.log(root);

  const role = getRole();
  // console.log(role, '22 app b');
  // console.log(userRole, '23 app b');
  const sideNav = routes.get(userRole1) as SideNav[];
  console.log(sideNav);
  const breadCrumbNames = getSideNavNameByPath(sideNav, path) || [];
  console.log(breadCrumbNames);

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link href={`/dashboard/${role || userRole}`}>{`CMS ${
          role?.toLocaleUpperCase() || userRole
        } SYSTEM`}</Link>
      </Breadcrumb.Item>

      {breadCrumbNames.map((name, index) => {
        // console.log(name);
        if (name === 'Detail') {
          return <Breadcrumb.Item key={index}>Detail</Breadcrumb.Item>;
        }

        const record = deepSearchRecordFactory(
          (nav: SideNav, value: string) => nav.label === value,
          name,
          'subNav'
        )(sideNav);
        // console.log(record);

        const { navs }: { source: SideNav[]; navs: SideNav[] } = record.reduce(
          (acc, cur) => {
            // console.log(acc);
            const item = acc.source[acc.source.length + cur];

            return { source: item.subNav, navs: [...acc.navs, item] };
          },
          { source: sideNav, navs: [] }
        );
        const isText =
          index === breadCrumbNames.length - 1 || navs.every((item) => item.hideLinkInBreadcrumb);
        const subPath = navs
          .map((item) => item.path)
          .reduce((acc, cur) => [...acc, ...cur], [])
          .filter((item) => !!item)
          .join('/');

        return (
          <Breadcrumb.Item key={index}>
            {isText ? name : <Link href={`${root}/${subPath}`}>{name}</Link>}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Appbreadcrumb;
