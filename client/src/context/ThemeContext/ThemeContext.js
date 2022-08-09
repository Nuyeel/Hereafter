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
    },
};

// 保持一致性是很重要的
// 之後會獲得一個函式就先放入一個無為函式
const ThemeContext = React.createContext({
    ...themes.light,
    setTheme: () => {},
});

export default ThemeContext;
