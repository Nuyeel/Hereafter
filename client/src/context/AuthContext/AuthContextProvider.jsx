import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from './AuthContext';

function AuthContextProvider(props) {
    const unAuthState = {
        authorized: false,
        sid: 0,
        account: '',
        token: '',
    };

    const localAuthStr = localStorage.getItem('auth');

    let localAuth = { ...unAuthState };

    try {
        localAuth = JSON.parse(localAuthStr);
        // 注意 localAuth 為 null 時沒有 property 將會報錯
        if (localAuth && localAuth.account && localAuth.token) {
            localAuth = { ...localAuth, authorized: true };
        }
    } catch (ex) {
        console.log('exception:', ex);
    }

    const [auth, setAuth] = useState(localAuth);
    const navigate = useNavigate();

    const userLogout = () => {
        localStorage.removeItem('auth');
        setAuth({ ...unAuthState });
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ ...auth, setAuth, userLogout }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
