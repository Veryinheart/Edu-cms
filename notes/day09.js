//1 hano

function hano(n, a, b, c) {
  if (n > 0) {
    hano(n - 1, a, c, b);
    console.log(`move n ${n} from ${a} to ${c}`);
    hano(n - 1, b, a, c);
  }
}
// hano(3,'a','b','c');

//2 fibonacci

const cache = new Map();

function fibonacci(n) {
  let result = null;

  if (cache.has(n)) {
    return cache.get(n);
  }
  if (n < 2) {
    result = n;
  } else {
    result = fibonacci(n - 1) + fibonacci(n - 2);
  }

  cache.set(n, result);
  return result;
}

//3 deep_clone

function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== 'object') return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
let obj = { name: 1, address: { x: 100 } };
// obj.o = obj; // 对象存在循环引用的情况
let d = deepClone(obj);
obj.address.x = 200;
console.log(d); //  {name: 1, address: { x: 100 } }
