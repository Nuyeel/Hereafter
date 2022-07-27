import './style.scss'
import { useState, useContext } from 'react';
import axios from 'axios';

import { TEST_FORGOT_PASSWORD } from '../../config/ajax-path';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ForgotPasswordForm() {
    const [loginData, setLoginData] = useState({
        account: '',
        password: '',
    });

    const themeContext = useContext(ThemeContext);
    const { authorized, setAuth, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleFieldsChange = (e) => {
        const id = e.target.id;
        const val = e.target.value;
        // console.log({ id, val });
        setLoginData((prevState) => ({
            ...prevState,
            [id]: val,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(loginData);

        // TODO: 欄位檢查

        // 請注意 axios 和 fetch 的不同之處
        // fetch 要多轉換一次 .then(r => r.json())
        // fetch 的內容放在 body: fd
        // axios 會自動轉換 JSON 但結果放在 r.data 中
        // axios 的內容要放在 data: fd
        const result = await axios(TEST_FORGOT_PASSWORD, {
            method: 'POST',
            data: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'Application/json',
            },
        });

        // console.log(result.data);

        if (result.data.success) {
            localStorage.setItem('auth', JSON.stringify(result.data.data));
            setAuth({ ...result.data.data, authorized: true });
            navigate('/');
        } else {
            alert('帳密錯誤～～');
        }
    };

    return (
        <>
            {authorized ? (
                <>
                    <div>已經登入了欸</div>
                    <br />
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={userLogout}
                    >
                        Logout
                    </button>
                </>
            ) : (
                <div
                    className="container"
                    // style={{
                    //     backgroundColor: themeContext.backgroundColor,
                    //     color: themeContext.color,
                    // }}
                >
                    <div className="row">
                        <div className="col">
                            <section className="pb-4">
                                <div className="bg-white bg-opacity-75 rounded-5">
                                    <section className="w-100 p-4 d-flex justify-content-center pb-4">
                                        <div>
                                            <div className="tab-content">
                                                <form
                                                    name="form1"
                                                    onsubmit="sendData();return false;"
                                                    novalidate
                                                >
                                                    <div className="mb-3 d-flex justify-content-center">
                                                        忘記密碼
                                                    </div>
                                                    <div className="mb-3">
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
                                                            required
                                                        />
                                                        <div className="form-text red"></div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label
                                                            For="email"
                                                            className="form-label"
                                                        >
                                                            電子信箱
                                                        </label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            id="email"
                                                            name="email"
                                                            required
                                                        />
                                                        <div className="form-text red"></div>
                                                    </div>
                                                    <div className="text-center mb-3"></div>
                                                    <div className="d-flex justify-content-center">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-pri btn-outline-light "
                                                        >
                                                            接收驗證信
                                                        </button>
                                                    </div>
                                                    <br />
                                                    <div
                                                        id="info-bar"
                                                        className="alert alert-success"
                                                        role="alert"
                                                    >
                                                        驗證信已發送，請前往信箱確認
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        <Link className='link' to="/login">
                                                            想起密碼了，直接登入
                                                        </Link>
                                                    </div>
                                                    <br />
                                                    <div className="d-flex justify-content-center">
                                                        <Link className='link' to="/register">
                                                            重新註冊
                                                        </Link>
                                                    </div>
                                                    <br />
                                                </form>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ForgotPasswordForm;
