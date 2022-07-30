import React from 'react';

export const themes = {
    dark: {
        title: 'dark',
        bgcl: '#3C3B67', // 方便對應
        bgcd: '#3C3B67', // 方便對應
        cHeader: '#FFFFFF',
        bgcHeaderDecor: '#00000033',
        bcAvatarFrame: '#FFE9F6', // bc for Border Color
    },
    light: {
        title: 'light',
        bgcl: '#EDEFF7', // 方便對應
        bgcd: '#DBE0ED', // 方便對應
        cHeader: '#3C3B67',
        bgcHeaderDecor: '#F4F59F9A',
        bcAvatarFrame: '#3C3B67',
        // bgcNavD: '#2D2828CC', // 這個要改 key name
    },
};

// 保持一致性是很重要的
// 之後會獲得一個函式就先放入一個無為函式
const ThemeContext = React.createContext({
    ...themes.light,
    setTheme: () => {},
});

export default ThemeContext;
