import { SideNav } from '../constants/routes';

type PredicateFn<T> = (data: T, value: string) => boolean;

export const fn: PredicateFn<SideNav> = (data: SideNav, value: string) =>
  (data.path as unknown) === value;

export const deepSearchFactory = <T>(predicateFn: PredicateFn<T>, value: string, key: string) => {
  return function deepSearch(data: T[]): T {
    const headNode = data.slice(0, 1)[0]; // 一个更小的范围
    const restNodes = data.slice(1); // 缩减搜索条件

    // 当前节点已经被判定为符合指定条件的值，直接返回
    if (predicateFn(headNode, value)) {
      return headNode;
    }

    // 当前节点上还有子节点，优先在子节点上进行搜索
    if (headNode[key]) {
      const res = deepSearch(headNode[key]);

      if (res) {
        return res; // 搜索到符合条件的值，返回
      }
    }

    // 继续在剩下的节点中进行搜索
    if (restNodes.length) {
      const res = deepSearch(restNodes);

      if (res) {
        return res; // 搜索到符合条件的值，返回
      }
    }

    return null; // 遍历完成后没有找到返回null
  };
};

export const deepSearchRecordFactory = <T>(
  predicateFn: PredicateFn<T>,
  value: string,
  key: string
) => {
  return function search(data: T[], record = []): number[] {
    const headNode = data.slice(0, 1)[0];
    const restNodes = data.slice(1);

    //路径位置为 剩余数组长度-1
    record.push(-restNodes.length - 1); // 节点位置入栈 push

    if (predicateFn(headNode, value)) {
      return record;
    }

    if (headNode[key]) {
      const res = search(headNode[key], record);

      if (res) {
        return record;
      } else {
        record.pop(); // 节点出栈
      }
    }

    if (restNodes.length) {
      record.pop(); // 节点出栈

      const res = search(restNodes, record);

      if (res) {
        return record;
      }
    }

    return null;
  };
};

export const getTargetByRecorder = <T>(data: T[], paths: number[], key: string): T => {
  if (!paths) {
    return null;
  }
  // 实际位置为 数组长度加 之前的路径长度
  const getNode = (d: T[], pos: number): T => d[d.length + pos];
  const position = paths.shift();
  const node = getNode(data, position);

  if (!paths.length) {
    return node;
  } else {
    const subData = node[key];

    return getTargetByRecorder(subData, paths, key);
  }
};
