import React from 'react';

export const themes = {
    dark: {
        title: 'dark',
        backgroundColor: '#000',
        color: '#FFF',
    },
    light: {
        title: 'light',
        backgroundColor: '#FFF',
        color: '#000',
    },
};

// 保持一致性是很重要的
// 之後會獲得一個函式就先放入一個無為函式
const ThemeContext = React.createContext({
    ...themes.light,
    setTheme: () => {},
});

export default ThemeContext;
