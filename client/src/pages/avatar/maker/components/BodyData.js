//MING:PRE
import Tale from '../../../../images/avatar/tale/tail-default.png';
import Special from '../../../../images/avatar/special/tail-special-dafault.png';
import Handpre from '../../../../images/avatar/pre/hand-pre-default.png';
import HandApre from '../../../../images/avatar/pre/hand-pre-a.png';
import HandBpre from '../../../../images/avatar/pre/hand-pre-b.png';
import HandCpre from '../../../../images/avatar/pre/hand-pre-c.png';
import HandDpre from '../../../../images/avatar/pre/hand-pre-d.png';

import Footpre from '../../../../images/avatar/pre/foot-pre-default.png';
import FootApre from '../../../../images/avatar/pre/foot-pre-a.png';
import FootBpre from '../../../../images/avatar/pre/foot-pre-b.png';
import FootCpre from '../../../../images/avatar/pre/foot-pre-c.png';
import FootDpre from '../../../../images/avatar/pre/foot-pre-d.png';

import TaleApre from '../../../../images/avatar/pre/tale-pre.png';

import SpecialApre from '../../../../images/avatar/pre/special-pre-a.png';
import SpecialBpre from '../../../../images/avatar/pre/special-pre-b.png';

const BodyData = {
    basicColors: [
        '#FEDFE1',
        '#B4BF5A',
        'Rosybrown',
        'PaleGoldenRod',
        '#C6F5C6',
        'Plum',
        'DarkSalmon',
        'SeaShell',
        'SteelBlue',
    ],
    basicColorsName: [
        '粉',
        '史瑞克',
        '棕',
        '黃',
        '綠',
        '中毒紫',
        '紅',
        '貝殼白',
        '藍',
    ],
    taleColors: [
        'brown',
        '#D7C4BB',
        '#FAD689',
        '#ccffcc',
        '#ccccff',
        '#F17C67',
    ],
    taleColorsName: ['棕', '綠', '黃', '綠', '紫', '鮭魚'],
    specialColors: [
        'skyblue',
        'DarkSlateBlue',
        'Aquamarine',
        'CornflowerBlue',
        '#ccffcc',
        '#ccccff',
        'Chocolate',
        'CadetBlue',
    ],
    specialColorsid: [
        'url(#paint0_linear_0)',
        'url(#paint0_linear_1)',
        'url(#paint0_linear_2)',
        'url(#paint0_linear_3)',
        'url(#paint0_linear_4)',
        'url(#paint0_linear_5)',
        'url(#paint0_linear_6)',
        'url(#paint0_linear_7)',
    ],
    specialColorsName: [
        '天藍',
        '石板藍',
        '碧綠',
        '矢車菊藍',
        '綠',
        '紫',
        '巧克力',
        '藍綠',
    ],
    hand: [
        {
            id: 0,
            name: '饅頭',
            preview: Handpre,
            limit: 0,
            price: 0,
        },
        {
            id: 1,
            name: '四指',
            preview: HandApre,
            limit: 0,
            price: 200,
        },
        {
            id: 2,
            name: '貓掌',
            preview: HandBpre,
            limit: 0,
            price: 300,
        },
        {
            id: 3,
            name: '呱呱',
            preview: HandCpre,
            limit: 0,
            price: 200,
        },
        {
            id: 4,
            name: '蹼',
            preview: HandDpre,
            limit: 0,
            price: 200,
        },
    ],
    foot: [
        {
            id: 0,
            name: '饅頭',
            preview: Footpre,
            limit: 0,
            price: 0,
        },
        {
            id: 1,
            name: '呱呱',
            preview: FootApre,
            limit: 0,
            price: 200,
        },
        {
            id: 2,
            name: '普通',
            preview: FootBpre,
            limit: 0,
            price: 200,
        },
        {
            id: 3,
            name: '貓貓腳',
            preview: FootCpre,
            limit: 0,
            price: 300,
        },
        {
            id: 4,
            name: '饅頭',
            preview: FootDpre,
            limit: 0,
            price: 200,
        },
    ],
    tale: [
        {
            id: 0,
            name: '無',
            preview: Tale,
            limit: 0,
            price: 0,
        },
        {
            id: 1,
            name: '有',
            preview: TaleApre,
            limit: 8000,
            price: 700,
        },
    ],
    special: [
        {
            id: 0,
            name: '',
            preview: Special,
            limit: 0,
            price: 0,
        },
        {
            id: 1,
            name: '魚尾',
            preview: SpecialApre,
            limit: 10000,
            price: 1200,
        },
        {
            id: 2,
            name: '章魚腳',
            preview: SpecialBpre,
            limit: 12000,
            price: 1000,
        },
    ],
};

export default BodyData;
