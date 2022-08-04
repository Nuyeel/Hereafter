import React from 'react';

// template
const AuthContext = React.createContext({
    authorized: false,
    sid: 0,
    account: '',
    token: '',
    isDead: false, // 用戶是否能夠進入轉生購物車以及來生頁面
});

export default AuthContext;
