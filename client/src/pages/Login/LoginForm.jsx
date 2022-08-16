import './style.scss';
import Swal from 'sweetalert2';
import { useState, useEffect, useContext } from 'react';

import { MEMBER_LOGIN } from '../../config/ajax-path';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LoginForm(props) {
    const [loginData, setLoginData] = useState({
        account: '',
        password: '',
    });

    const { pageName } = props;
    const { authorized, setAuth, userLogout } = useContext(AuthContext);
    const { setHeader } = useContext(HeaderContext);
    const { theme, themeContext } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleFieldsChange = (e) => {
        const id = e.target.id;
        const val = e.target.value;
        setLoginData((prevState) => ({
            ...prevState,
            [id]: val,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: 欄位檢查

        fetch(MEMBER_LOGIN, {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    localStorage.setItem('auth', JSON.stringify(result.data));
                    setAuth({
                        ...result.data,
                        authorized: true,
                    });
                    Swal.fire('歡迎回到來生投放所');
                    navigate('/memberprofile');
                } else {
                    Swal.fire('您輸入的帳戶或密碼有誤');
                }
            });
    };

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <section
                            className="pb-4 justify-content-center memberBgCard rounded-5"
                            style={{ backgroundColor: theme.memberBgCard }}
                        >
                            <section className="w-100 p-4 d-flex justify-content-center pb-4 ">
                                <div className="tab-content">
                                    <form name="form1" onSubmit={handleSubmit}>
                                        <div className="mb-3 d-flex justify-content-center member-page-title">
                                            會員登入
                                        </div>
                                        <br />
                                        <div className="mb-3 member-page-field">
                                            <label
                                                htmlFor="account"
                                                className="form-label"
                                            >
                                                帳戶名稱
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="account"
                                                name="account"
                                                placeholder="請輸入您的帳戶"
                                                value={loginData.account}
                                                onChange={handleFieldsChange}
                                            />
                                            <div className="form-text red"></div>
                                        </div>
                                        <div className="mb-3 member-page-field">
                                            <label
                                                htmlFor="password"
                                                className="form-label"
                                            >
                                                登入密碼
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                placeholder="請輸入您的密碼"
                                                value={loginData.password}
                                                onChange={handleFieldsChange}
                                            />
                                            <div className="form-text red"></div>
                                        </div>
                                        <br />
                                        <div className="d-flex justify-content-center ">
                                            <button
                                                type="submit"
                                                className="btn-member btn-member-l btn-member-pri btn-member-outline-light "
                                            >
                                                登入
                                            </button>
                                        </div>
                                        <br />
                                        <div className="d-flex justify-content-center ">
                                            <Link
                                                className="member-link"
                                                to="/register"
                                            >
                                                未註冊，先創建帳戶
                                            </Link>
                                        </div>
                                        <br />
                                        <div className="d-flex justify-content-center ">
                                            <Link
                                                className="member-link"
                                                to="/forgotpassword"
                                            >
                                                忘記密碼
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
