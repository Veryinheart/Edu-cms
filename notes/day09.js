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

// global variable  注意全局变量
// 注意 实际问题 解决的  MAP object 选择
function fibonacci(n) {
  let result = null;
  const cache = new Map();

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

fibonacci();
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



{
  "chart": {
    "plotBackgroundColor": null,
    "plotBorderWidth":null,
     "plotShadow": false,
     "type": 'pie'
  },
   "title": {
     "text": 'Browser market shares in January, 2018'
  },
  "tooltip": {
    "pointFormat": '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  "accessibility": {
    "point": {
      "valueSuffix": '%'
    }
  },
  "plotOptions": {
    "pie": {
     "allowPointSelect": true,
      "cursor": 'pointer',
      "dataLabels": {
        "enabled": true,
        "format": '<b>{point.name}</b>: {point.percentage:.1f} %'
      }
    }
  },
  "series": [{
    "name": 'Brands',
    "colorByPoint": true,
    "data": [{
      "name": 'Chrome',
      "y": 61.41,
      "sliced": true,
      "selected": true
    }, {
      "name": 'Internet Explorer',
      "y": 11.84
    }, {
      "name": 'Firefox',
      "y": 10.85
    }]
  }
}