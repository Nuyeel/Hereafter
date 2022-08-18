//MING:PRE
import nose from '../../../../images/avatar/nose/nose-default.png';
import lip from '../../../../images/avatar/lip/lip-default.png';
import hairBack from '../../../../images/avatar/hair/back-hair-default.png';
import topEar from '../../../../images/avatar/topear/topear-default.png';
import eyeApre from '../../../../images/avatar/pre/eye-pre-a.png';
import eyeBpre from '../../../../images/avatar/pre/eye-pre-b.png';
import eyeCpre from '../../../../images/avatar/pre/eye-pre-c.png';
import eyeDpre from '../../../../images/avatar/pre/eye-pre-d.png';
import eyeEpre from '../../../../images/avatar/pre/eye-pre-e.png';

import earpre from '../../../../images/avatar/pre/ear-pre-default.png';
import earApre from '../../../../images/avatar/pre/ear-pre-a.png';
import earBpre from '../../../../images/avatar/pre/ear-pre-b.png';
import earCpre from '../../../../images/avatar/pre/ear-pre-c.png';
import earDpre from '../../../../images/avatar/pre/ear-pre-d.png';

import lipApre from '../../../../images/avatar/pre/lip-pre-a.png';
import lipBpre from '../../../../images/avatar/pre/lip-pre-b.png';
import lipCpre from '../../../../images/avatar/pre/lip-pre-c.png';
import lipDpre from '../../../../images/avatar/pre/lip-pre-d.png';
import lipEpre from '../../../../images/avatar/pre/lip-pre-e.png';

import noseApre from '../../../../images/avatar/pre/nose-pre-a.png';
import noseBpre from '../../../../images/avatar/pre/nose-pre-b.png';
import noseCpre from '../../../../images/avatar/pre/nose-pre-c.png';
import noseDpre from '../../../../images/avatar/pre/nose-pre-d.png';
import noseEpre from '../../../../images/avatar/pre/nose-pre-e.png';

import hairFrontApre from '../../../../images/avatar/pre/hairfront-pre-a.png';
import hairFrontBpre from '../../../../images/avatar/pre/hairfront-pre-b.png';
import hairFrontCpre from '../../../../images/avatar/pre/hairfront-pre-c.png';
import hairFrontDpre from '../../../../images/avatar/pre/hairfront-pre-d.png';
import hairFrontEpre from '../../../../images/avatar/pre/hairfront-pre-e.png';

import hairBackApre from '../../../../images/avatar/pre/hairback-pre-a.png';
import hairBackBpre from '../../../../images/avatar/pre/hairback-pre-b.png';
import hairBackCpre from '../../../../images/avatar/pre/hairback-pre-c.png';
import hairBackDpre from '../../../../images/avatar/pre/hairback-pre-d.png';
import hairBackEpre from '../../../../images/avatar/pre/hairback-pre-e.png';

import topEarApre from '../../../../images/avatar/pre/topear-pre-a.png';
import topEarBpre from '../../../../images/avatar/pre/topear-pre-b.png';
import topEarCpre from '../../../../images/avatar/pre/topear-pre-c.png';
import topEarDpre from '../../../../images/avatar/pre/topear-pre-d.png';
import topEarEpre from '../../../../images/avatar/pre/topear-pre-e.png';
import topEarFpre from '../../../../images/avatar/pre/topear-pre-f.png';

const FaceData = {
    eyeColors: [
        '#444',
        'OliveDrab',
        'MidnightBlue',
        'MediumTurquoise',
        'MediumAquaMarine',
        'MediumPurple',
        'Maroon',
    ],
    eyeColorsName: ['灰', '綠', '午夜藍', '土耳其藍', '水藍', '紫', '紅'],
    noseColors: [
        '#FFF',
        'pink',
        '#D7C4BB',
        '#FAD689',
        '#ccffcc',
        '#ccccff',
        '#F17C67',
    ],
    noseColorsName: ['白', '粉', '灰', '黃', '綠', '紫', '紅'],
    hairColors: [
        '#333',
        'brown',
        'skyblue',
        'salmon',
        'GoldenRod',
        '#ccccff',
        'wheat',
        'snow',
    ],
    hairColorsName: ['黑', '棕', '天藍', '鮭魚', '金', '紫', '小麥', '雪'],
    topEarColors: [
        'LavenderBlush',
        'gray',
        '#D7C4BB',
        'Wheat',
        'pink',
        'SaddleBrown',
        'salmon',
        'SlateGrey',
    ],
    topEarColorsName: ['白', '灰', '鼠灰', '小麥', '粉', '棕', '鮭魚', '鐵灰'],
    eye: [
        {
            id: 0,
            preview: eyeApre,
            limit: 0,
            name: '瞇瞇眼',
            price: 100,
        },
        {
            id: 1,
            preview: eyeBpre,
            limit: 0,
            name: '往左看',
            price: 100,
        },
        {
            id: 2,
            preview: eyeCpre,
            limit: 3000,
            name: '外星人',
            price: 100,
        },
        {
            id: 3,
            preview: eyeDpre,
            limit: 0,
            name: '小眉毛',
            price: 100,
        },
        {
            id: 4,
            preview: eyeEpre,
            limit: 0,
            name: '往右看',
            price: 100,
        },
    ],
    ear: [
        {
            id: 0,
            preview: earpre,
            limit: 0,
            name: '小饅頭',
            price: 0,
        },
        {
            id: 1,
            preview: earApre,
            limit: 3000,
            name: '小精靈',
            price: 200,
        },
        {
            id: 2,
            preview: earBpre,
            limit: 3000,
            name: '尖尖耳',
            price: 200,
        },
        {
            id: 3,
            preview: earCpre,
            limit: 3000,
            name: '蠑螈',
            price: 200,
        },
        {
            id: 4,
            preview: earDpre,
            limit: 3000,
            name: '垂垂耳',
            price: 200,
        },
    ],
    nose: [
        {
            id: 0,
            preview: nose,
            limit: 0,
            name: '那個人',
            price: 100,
        },
        {
            id: 1,
            preview: noseApre,
            limit: 0,
            name: '貓貓鼻',
            price: 100,
        },
        {
            id: 2,
            preview: noseBpre,
            limit: 0,
            name: '狗狗鼻',
            price: 100,
        },
        {
            id: 3,
            preview: noseCpre,
            limit: 0,
            name: '大鼻子',
            price: 100,
        },
        {
            id: 4,
            preview: noseDpre,
            limit: 0,
            name: '圓圓',
            price: 100,
        },
        {
            id: 5,
            preview: noseEpre,
            limit: 0,
            name: '小豬',
            price: 200,
        },
    ],
    lip: [
        {
            id: 0,
            preview: lip,
            limit: 0,
            name: 'kitty',
            price: 0,
        },
        {
            id: 1,
            preview: lipApre,
            limit: 0,
            name: '上門牙',
            price: 100,
        },
        {
            id: 2,
            preview: lipBpre,
            limit: 0,
            name: '下門牙',
            price: 100,
        },
        {
            id: 3,
            preview: lipCpre,
            limit: 0,
            name: '貓貓嘴',
            price: 100,
        },
        {
            id: 4,
            preview: lipDpre,
            limit: 0,
            name: '不開心',
            price: 100,
        },
        {
            id: 5,
            preview: lipEpre,
            limit: 0,
            name: '笑笑',
            price: 100,
        },
    ],
    hairFront: [
        {
            id: 0,
            preview: hairFrontApre,
            limit: 0,
            name: '中分',
            price: 100,
        },
        {
            id: 1,
            preview: hairFrontBpre,
            limit: 0,
            name: '捲捲',
            price: 100,
        },
        {
            id: 2,
            preview: hairFrontCpre,
            limit: 0,
            name: '飛機',
            price: 100,
        },
        {
            id: 3,
            preview: hairFrontDpre,
            limit: 0,
            name: '阿嬤',
            price: 100,
        },
        {
            id: 4,
            preview: hairFrontEpre,
            limit: 0,
            name: '旁分',
            price: 100,
        },
    ],
    hairBack: [
        {
            id: 0,
            preview: hairBack,
            limit: 0,
            name: '不留長',
            price: 0,
        },
        {
            id: 1,
            preview: hairBackApre,
            limit: 0,
            name: '辮子',
            price: 100,
        },
        {
            id: 2,
            preview: hairBackBpre,
            limit: 0,
            name: '俐落短',
            price: 100,
        },
        {
            id: 3,
            preview: hairBackCpre,
            limit: 0,
            name: '飄逸長',
            price: 100,
        },
        {
            id: 4,
            preview: hairBackDpre,
            limit: 0,
            name: '學生妹',
            price: 100,
        },
        {
            id: 5,
            preview: hairBackEpre,
            limit: 0,
            name: '捲捲',
            price: 100,
        },
    ],
    topEar: [
        {
            id: 0,
            preview: topEar,
            limit: 0,
            name: '',
            price: 0,
        },
        {
            id: 1,
            preview: topEarApre,
            limit: 3000,
            name: '貓耳',
            price: 200,
        },
        {
            id: 2,
            preview: topEarBpre,
            limit: 3000,
            name: '角角',
            price: 200,
        },
        {
            id: 3,
            preview: topEarCpre,
            limit: 3000,
            name: '獨角獸',
            price: 200,
        },
        {
            id: 4,
            preview: topEarDpre,
            limit: 3000,
            name: '勞數',
            price: 200,
        },
        {
            id: 5,
            preview: topEarEpre,
            limit: 3000,
            name: '熊熊',
            price: 200,
        },
        {
            id: 6,
            preview: topEarFpre,
            limit: 3000,
            name: '兔耳',
            price: 200,
        },
    ],
};
export default FaceData;
