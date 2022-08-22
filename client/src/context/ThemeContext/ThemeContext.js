import React from 'react';

// 大專可能不會去做到那樣
// 但更簡潔的寫法是寫成一個 Custom Hook
// FIXME: 請不要在未知會他人時調整 key name

export const themes = {
    dark: {
        title: 'dark',
        bgcl: '#3C3B67', // 方便對應
        bgcd: '#3C3B67', // 方便對應
        cHeader: '#FFFFFF',
        bgcHeaderDecor: '#00000033',
        bgcMainDiv: '#0000004D',
        bcAvatarFrame: '#FFE9F6', // bc for Border Color
        cCommentInput: '#FFFFFF99',
        bgcAvatarMaker: '#00000080',
        memberBgCard: '#00000025',
        rebornBg: '#3C3B67B3',
        rebornInnerBg: '#0000001A',
        placeBg: '#00000080',
        placeMainBg: '#00000080',
        placeCardBorder: 'none',
        bgcAvatarMaker2: '#00000080',
        bgcShowacseCard: 'transparent',
        navChecked: false,

        gooddeedcard: '#00000033',

        mblue: ' rgba(0, 0, 0, 0.6)',
        mpink: ' rgba(0, 0, 0, 0.6)',
        mpurple: ' rgba(0, 0, 0, 0.6)',
        mbgopacity: 'rgb(0,0,0)',
        mfblue: '#B8D5FF',
        mfpurple: '#C8BEFF',
        mfpink: '#F1C1F8',
    },
    light: {
        title: 'light',
        bgcl: '#EDEFF7', // 方便對應
        bgcd: '#DBE0ED', // 方便對應
        cHeader: '#3C3B67',
        bgcHeaderDecor: '#F4F59F9A',
        bgcMainDiv: '#FFFFFF55',
        bcAvatarFrame: '#3C3B67',
        cCommentInput: '#00000099',
        bgcAvatarMaker: '#FFFFFF66',
        memberBgCard: '#FFFFFF75',
        rebornBg: '#BAC7D98C',
        rebornInnerBg: '#FFFFFF',
        placeBg: '#9587E1EE',
        placeMainBg: '#EDEFF7B3',
        placeCardBorder: '1px solid #E384F280',
        bgcAvatarMaker2: '#8107E133',
        bgcShowacseCard: '#8107E133',
        navChecked: true,

        gooddeedcard: '#FFFFFF30',

        mblue: '#81A8E0',
        mpink: '#E384F2',
        mpurple: '#9587E1',
        mbgopacity: 'rgba(0,0,0,0)',
        mfblue: 'white',
        mfpurple: 'white',
        mfpink: 'white',
    },
};

// 保持一致性是很重要的
// 之後會獲得一個函式就先放入一個無為函式
const ThemeContext = React.createContext({
    ...themes.light,
    setTheme: () => {},
});

export default ThemeContext;
