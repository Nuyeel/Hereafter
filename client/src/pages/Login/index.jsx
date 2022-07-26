import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { TEST_LOGIN } from '../../config/ajax-path';
import LoginForm from './LoginForm';

function Login(props) {
    const { auth, setAuth } = props;
    // 嘗試進行頁面跳轉
    const navigate = useNavigate();

    return <LoginForm />;
}

export default Login;
