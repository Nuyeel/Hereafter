import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { MEMBER_LOGIN } from '../../config/ajax-path';
import LoginForm from './LoginForm';

function Login(props) {
    const { auth, setAuth } = props;
    
    // 嘗試進行頁面跳轉
    const navigate = useNavigate();

    // 傳入 setHeader 需要的 props
    return <LoginForm pageName="default" />;
}

export default Login;
