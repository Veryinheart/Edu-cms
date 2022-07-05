import React from 'react';
import { useRouter } from 'next/router';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { Role } from '../utils/service/user/types';

import { getRole } from '../utils/service/storage';

const Appbreadcrumb = () => {
  const router = useRouter();
  console.log(router);

  const path = router.pathname;
  const paths = path.split('/').slice(1);
  console.log(paths);
  const role = getRole();

  return (
    <Breadcrumb style={{ margin: '0 16px', padding: 16 }}>
      <Breadcrumb.Item>
        <Link href={`/dashboard/${role}`}>{`CMS ${role.toLocaleUpperCase()} SYSTEM`}</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Appbreadcrumb;
