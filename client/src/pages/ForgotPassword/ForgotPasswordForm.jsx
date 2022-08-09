import './style.scss';
import { useState, useContext } from 'react';
import axios from 'axios';

import { FORGOT_PASSWORD } from '../../config/ajax-path';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ForgotPasswordForm() {
    const [forgotPasswordData, setforgotPasswordData] = useState({
        account: '',
        email: '',
    });

    const { theme, themeContext } = useContext(ThemeContext);
    const { authorized, setAuth, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleFieldsChange = (e) => {
        const id = e.target.id;
        const val = e.target.value;
        // console.log({ id, val });
        setforgotPasswordData((prevState) => ({
            ...prevState,
            [id]: val,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await axios(FORGOT_PASSWORD, {
            method: 'POST',
            data: JSON.stringify(forgotPasswordData),
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
                <div
                    className="container"
                    // style={{
                    //     backgroundColor: themeContext.backgroundColor,
                    //     color: themeContext.color,
                    // }}
                >
                    <div className="row">
                        <div className="col">
                            <section
                                className="pb-4 justify-content-center memberBgCard rounded-5"
                                style={{ backgroundColor: theme.memberBgCard }}
                            >
                                <section className="w-100 p-4 d-flex justify-content-center pb-4 ">
                                    <div className="tab-content">
                                        <form name="form1">
                                            <div className="mb-3 d-flex justify-content-center page-title ">
                                                忘記密碼
                                            </div>
                                            <br />
                                            <div className="mb-3 page-field">
                                                <label
                                                    htmlFor="account"
                                                    className=" form-label"
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
                                                    placeholder="請輸入您註冊過的信箱"
                                                    required
                                                />
                                                <div className="form-text red"></div>
                                            </div>
                                            <div className="text-center mb-3"></div>
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn-member btn-member-l btn-member-pri btn-member-outline-light "
                                                >
                                                    接收驗證信
                                                </button>
                                            </div>
                                            <br />
                                            <br />
                                            <div className="d-flex justify-content-center">
                                                <Link
                                                    className="link"
                                                    to="/login"
                                                >
                                                    想起密碼了，直接登入
                                                </Link>
                                            </div>
                                            <br />
                                            <div className="d-flex justify-content-center">
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

export default ForgotPasswordForm;
