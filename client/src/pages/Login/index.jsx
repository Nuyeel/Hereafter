import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { TEST_LOGIN } from '../../config/ajax-path';
import LoginForm from './LoginForm';

function Login(props) {
    const { auth, setAuth } = props;
    // 嘗試進行頁面跳轉
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1 className="mb-3">Login.jsx</h1>
            <LoginForm />
            {/* <button
                onClick={async () => {
                    // 目前這是無條件會通過的
                    // 因為在 /App.jsx 中被 setState(false)
                    // !false 是 true;
                    const newAuth = !auth;
                    setAuth(newAuth);
                    // TODO: 跳出歡迎訊息
                    if (newAuth) {
                        // TODO: 現有個會取得 token 的測試 AJAX
                        // 這目前一定會寫一號會員的資料
                        // FIXME: 改成真的
                        const result = await axios.get(TEST_LOGIN);
                        console.log(result.data);
                        localStorage.setItem(
                            'auth',
                            JSON.stringify(result.data)
                        );

                        // alert('才...才不希望你登入呢！');
                        // 一秒後導向首頁
                        // setTimeout(() => {
                        //     // 如果不 replace 按回到上一頁會回原頁
                        //     navigate('/', { replace: true });
                        //     // navigate('/');
                        //     // navigate(-1);
                        // }, 1000);
                    } else {
                        alert('掰掰');
                    }
                }}
            >
                {auth ? 'LOGOUT' : 'LOGIN'}
            </button> */}
        </div>
    );
}

export default Login;
