// DONE: 用來 export 方塊 ID 與材質名稱甚至動畫類型的對應關係

const mapArray_2 = ['A', 'T'];
const mapArray_3 = ['A', 'B', 'T'];
const mapArray_4 = ['A', 'B', 'C', 'T'];
const mapArray_5 = ['A', 'B', 'C', 'D', 'T'];

// pngMap 是個陣列
// 用來存放 pngID 和 Postfix 兩個部分
// FIXME: 有四個棘手的素材先跳過 26, 29, 33, 36
// TODO: 這個陣列可以用來存 animation type
// TODO: 找到 easing function library
const pngMap = [
    { ID: 0, Postfix: mapArray_3 },
    { ID: 1, Postfix: mapArray_3 },
    { ID: 2, Postfix: mapArray_4 },
    { ID: 3, Postfix: mapArray_4 },
    { ID: 4, Postfix: mapArray_4 },
    { ID: 5, Postfix: mapArray_4 },
    { ID: 6, Postfix: mapArray_3 },
    { ID: 7, Postfix: mapArray_4 },
    { ID: 8, Postfix: mapArray_4 },
    { ID: 9, Postfix: mapArray_4 },
    { ID: 10, Postfix: mapArray_4 },
    { ID: 11, Postfix: mapArray_4 },
    { ID: 12, Postfix: mapArray_4 },
    { ID: 13, Postfix: mapArray_4 },
    { ID: 14, Postfix: mapArray_4 },
    { ID: 15, Postfix: mapArray_3 },
    { ID: 16, Postfix: mapArray_4 },
    { ID: 17, Postfix: mapArray_4 },
    { ID: 18, Postfix: mapArray_4 },
    { ID: 19, Postfix: mapArray_4 },
    { ID: 20, Postfix: mapArray_3 },
    { ID: 21, Postfix: mapArray_5 },
    { ID: 22, Postfix: mapArray_3 },
    { ID: 23, Postfix: mapArray_3 },
    { ID: 24, Postfix: mapArray_5 },
    { ID: 25, Postfix: mapArray_3 },
    { ID: 27, Postfix: mapArray_2 },
    { ID: 28, Postfix: mapArray_4 },
    { ID: 30, Postfix: mapArray_3 },
    { ID: 31, Postfix: mapArray_4 },
    { ID: 32, Postfix: mapArray_4 },
    { ID: 34, Postfix: mapArray_5 },
    { ID: 35, Postfix: mapArray_5 },
    { ID: 37, Postfix: mapArray_4 },
];

export default pngMap;
