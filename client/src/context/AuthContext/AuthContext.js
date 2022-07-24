import React from 'react';

// template
const AuthContext = React.createContext({
    authorized: false,
    sid: 0,
    account: '',
    token: '',
});

export default AuthContext;
