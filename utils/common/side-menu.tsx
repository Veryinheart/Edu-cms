import { SideNav } from '../constants/routes';
import { memoize } from 'lodash';
import { getRole } from '../service/storage';
import { useRouter } from 'next/router';

const isDetailPath = (path: string): boolean => {
  const paths = path.split('/');
  const length = paths.length;
  const last = paths[length - 1];
  const reg = /\[.*\]/;

  return reg.test(last);
};

const generateFactory = (fn: (data: SideNav, index: number) => string) =>
  function inner(data: SideNav[], current = ''): string[][] {
    const keys = data?.map((item, index) => {
      let key = fn(item, index);

      if (current) {
        key = [current, key].join('/');
      }

      if (item.subNav && !!item.subNav.length) {
        return inner(item.subNav, key).map((item) => item.join('/'));
      } else {
        return [key];
      }
    });

    return keys;
  };

export const generateKey = (data: SideNav, index: number): string => {
  return `${data.label}_${index}`;
};

const generatePath = (data: SideNav): string => {
  return data.path.join('/');
};

const getKeyPathInfo = (data: SideNav[]): { keys: string[]; paths: string[] } => {
  const getPaths = generateFactory(generatePath);

  const userRole = getRole();
  const pathsRes = getPaths(data);
  const temp = pathsRes?.reduce((acc, cur) => [...acc, ...cur], []);
  const paths = temp?.map((item) =>
    ['/dashboard', userRole, item].filter((item) => !!item).join('/')
  );

  const getKeys = generateFactory(generateKey);
  const keys = getKeys(data)?.reduce((acc, cur) => [...acc, ...cur], []);

  return { keys, paths };
};
//cache path
const memoizedGetKeyPathInfo = memoize(getKeyPathInfo, (data) =>
  data?.map((item) => item.label).join('_')
);

export const getSideNavNameByKey = (key: string): string[] => {
  return key?.split('/').map((item) => item.split('_')[0]);
};

export const getSideNavNameByPath = (data: SideNav[], path: string): string[] => {
  console.log(data, 'data');
  const isDetail = isDetailPath(path);

  // const temp = data?.map((item) => item.label).join('_');
  // console.log(temp);

  path = isDetail ? path.split('/').slice(0, -1).join('/') : path;

  const { paths, keys } = memoizedGetKeyPathInfo(data);
  console.log(paths, keys, '76');
  const isEqual = isPathEqual(path);
  const index = paths?.findIndex(isEqual);

  const result = (keys && getSideNavNameByKey(keys[index])) ?? [];
  // console.log(result, 'result');

  return isDetail ? [...result, 'Detail'] : result;
};

const omitDetailPath = (path: string): string => {
  const isDetail = isDetailPath(path);

  return isDetail ? path.slice(0, path.lastIndexOf('/')) : path;
};

//
const isPathEqual = (target: string) => (current: string) => {
  current = current.endsWith('/') ? current.slice(0, -1) : current;

  return current === target;
};

// 获取当前Key

export const getActiveKey = (data: SideNav[]) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  // console.log(data, 'data');
  // console.log(router);
  const activeRoute = omitDetailPath(router.pathname);
  // console.log(activeRoute);
  const { paths, keys } = memoizedGetKeyPathInfo(data);
  // console.log(paths, keys, router.pathname);
  const isEqual = isPathEqual(activeRoute);
  const index = paths?.findIndex(isEqual);
  // console.log(index);

  return keys[index] || '';
};
