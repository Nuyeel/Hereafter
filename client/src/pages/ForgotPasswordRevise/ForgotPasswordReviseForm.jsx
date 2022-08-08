import './style.scss';
import { useState, useContext } from 'react';
import axios from 'axios';

import { FORGOT_PASSWORD_REVISE } from '../../config/ajax-path';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ForgotPasswordReviseForm() {
    const [loginData, setLoginData] = useState({
        account: '',
        password: '',
    });

    const { theme, themeContext } = useContext(ThemeContext);
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
        const result = await axios(FORGOT_PASSWORD_REVISE, {
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
                <></>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <section
                                className="pb-4 justify-content-center memberBgCard rounded-5"
                                style={{ backgroundColor: theme.memberBgCard }}
                            >
                                <section className="w-100 p-4 d-flex justify-content-center pb-4 ">
                                    <div className="tab-content">
                                        <form name="form1">
                                            <div className="mb-3 d-flex justify-content-center page-title">
                                                修改密碼
                                            </div>
                                            <br />
                                            <div className="mb-3 page-field">
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
                                                    placeholder="請輸入您註冊過的帳戶"
                                                    required
                                                />
                                                <div className="form-text red"></div>
                                            </div>
                                            <div className="mb-3 page-field">
                                                <label
                                                    htmlFor="password"
                                                    className="form-label"
                                                >
                                                    新密碼
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="password"
                                                    name="password"
                                                    placeholder="請輸入您的新密碼帳戶"
                                                    required
                                                />
                                                <div className="form-text red"></div>
                                            </div>
                                            <div className="mb-3 page-field">
                                                <label
                                                    htmlFor="password"
                                                    className="form-label"
                                                >
                                                    確認新密碼
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="password"
                                                    name="password"
                                                    placeholder="請再輸入一次您的新密碼"
                                                    required
                                                />
                                                <div className="form-text red"></div>
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn-member btn-member-l btn-member-pri btn-member-outline-light"
                                                >
                                                    確認修改
                                                </button>
                                            </div>
                                            <br />
                                            <br />
                                            <div className="d-flex justify-content-center ">
                                                <Link
                                                    className="link"
                                                    to="/login"
                                                >
                                                    想起密碼了，直接登入
                                                </Link>
                                            </div>
                                            <br />
                                            <div className="d-flex justify-content-center ">
                                                <Link
                                                    className="link"
                                                    to="/register"
                                                >
                                                    重新註冊
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </section>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ForgotPasswordReviseForm;
