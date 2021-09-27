// 1. `all`：布尔全等判断
const all = (arr, fn = Boolean) => arr.every(fn);
all([4, 2, 3], (x) => x > 1); // true
all([1, 2, 3]); // true

// 2. `allEqual`：检查数组各项相等
const allEqual = (arr) => arr.every((val) => val === arr[0]);
allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true

// 3.`approximatelyEqual`：约等于
const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
    Math.abs(v1 - v2) < epsilon;
approximatelyEqual(Math.PI / 2.0, 1.5708); // true

// 4.`arrayToCSV`：数组转`CSV`格式（带空格的字符串）
const arrayToCSV = (arr, delimiter = ',') =>
    arr.map((v) => v.map((x) => `"${x}"`).join(delimiter)).join('/n');
arrayToCSV([
    ['a', 'b'],
    ['c', 'd'],
]); // '"a","b"\n"c","d"'
arrayToCSV(
    [
        ['a', 'b'],
        ['c', 'd'],
    ],
    ';'
); // '"a";"b"\n"c";"d"'

// 5.`arrayToHtmlList`：数组转`li`列表
// const arrayToHtmlList = (arr, listID) => (item => (el = document.querySelector('#', listID)))()

// 6. `average`：平均数
const average = (...nums) =>
    nums.reduce((acc, val) => acc + val, 0) / nums.length;
average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2

// 7. `averageBy`：数组对象属性平均数
const averageBy = (arr, fn) =>
    arr
        .map(typeof fn === 'function' ? fn : (val) => val[fn])
        .reduce((acc, val) => acc + val, 0) / arr.length;
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], (o) => o.n); // 5
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 5

// 8.`bifurcate`：拆分断言后的数组
const bifurcate = (arr, filter) =>
    arr.reduce(
        (acc, val, i) => (acc[filter[i] ? 0 : 1].push(val), acc),
        // (acc, val, i) => {
        //     acc[filter[i] ? 0 : 1].push(val);
        //     return acc;
        // },
        [[], []]
    );
bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]);

// 9. `castArray`：其它类型转数组
const castArray = (val) => (Array.isArray(val) ? val : [val]);
castArray('foo'); // ['foo']
castArray([1]); // [1]
castArray(1); // [1]

// 10. `compact`：去除数组中的无效/无用值
const compat = (arr) => arr.filter(Boolean);
compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]);

// 11. `countOccurrences`：检测数值出现次数
const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (val === v ? a + 1 : a), 0);
countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

// 12. `deepFlatten`：递归扁平化数组
const deepFlatten = (arr) =>
    [].concat(...arr.map((v) => (Array.isArray(v) ? deepFlatten(v) : v)));
deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]

// 13. `difference`：寻找差异
const difference = (a, b) => {
    const s = new Set(b);
    return a.filter((x) => !s.has(x));
};
difference([1, 2, 3], [1, 2, 4]); // [3]

// 14. `differenceBy`：先执行再寻找差异
const differenceBy = (a, b, fn) => {
    const s = new Set(b.map(fn));
    return a.filter((x) => !s.has(fn(x)));
};
differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]
differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], (v) => v.x); // [ { x: 2 } ]

// 15. `dropWhile`：删除不符合条件的值
const dropWhile = (arr, func) => {
    while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
    return arr;
};

const dropFilter = (arr, func) => {
    return arr.filter((x) => func(x));
};

dropFilter([1, 2, 3, 4], (n) => n >= 3); // [3,4]
dropWhile([1, 2, 3, 4], (n) => n >= 3); // [3,4]
