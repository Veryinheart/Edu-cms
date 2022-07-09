import React from 'react';
import { useRouter } from 'next/router';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { getRole } from '../utils/service/storage';
import { SideNav } from '../utils/constants/routes';
import { routes } from '../utils/constants/routes';
import { getSideNavNameByPath } from '../utils/common/side-menu';
import { deepSearchRecordFactory } from '../utils/common/deep-search';

const Appbreadcrumb = () => {
  const router = useRouter();
  // console.log(router);

  const path = router.pathname;
  const paths = path.split('/').slice(1);
  const root = '/' + paths.slice(0, 2).join('/');
  console.log(root);
  console.log(path);
  const role = getRole();
  const sideNav = routes.get(role) as SideNav[];
  const breadCrumbNames = getSideNavNameByPath(sideNav, path) || [];
  console.log(breadCrumbNames);

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link href={`/dashboard/${role}`}>{`CMS ${role?.toLocaleUpperCase()} SYSTEM`}</Link>
      </Breadcrumb.Item>

      {breadCrumbNames.map((name, index) => {
        if (name === 'Detail') {
          return <Breadcrumb.Item key={index}>Detail</Breadcrumb.Item>;
        }

        const record = deepSearchRecordFactory(
          (nav: SideNav, value: string) => nav.label === value,
          name,
          'subNav'
        )(sideNav);

        const { navs }: { source: SideNav[]; navs: SideNav[] } = record.reduce(
          (acc, cur) => {
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
