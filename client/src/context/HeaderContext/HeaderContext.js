import React from 'react';

// TODO: 可以改成自己喜歡的頁面名稱 (英文)

// title 是對應頁面中文標題
export const headers = {
    default: {
        title: '',
    },
    mainpage: {
        title: '我是首頁',
    },
    about: {
        title: '關於我們',
    },
    genies: {
        title: '轉生小精靈', // TODO: '來生服務員' 二選一
    },
    news: {
        title: '最新消息',
    },
    // TODO: 頁面名稱: {
    //     title: '轉生3步驟',
    // },
    // TODO: 頁面名稱: {
    //     title: '來生形象', // Abby 手機版的某個頁面 不知道會不會和小銘撞名
    // },
    // TODO: 頁面名稱: {
    //     title: '陰德值檢定',
    // },
    // TODO: 頁面名稱: {
    //     title: '行善積德小遊戲',
    // },
    // TODO: 頁面名稱: {
    //     title: '來生形象',
    // },
    place: {
        title: '良辰吉地',
    },
    rebornCart: {
        title: '轉生投胎',
    },
    // TODO: 頁面名稱: {
    //     title: '投胎結帳',
    // },
    sharewall: {
        title: '交流分享',
    },
    events: {
        title: 'TODO: 頁面標題',
    },
    // TODO: 頁面名稱: {
    //     title: '會員中心',
    // },
};

const HeaderContext = React.createContext({
    ...headers.default,
    setHeader: () => {},
});

export default HeaderContext;
