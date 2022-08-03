import './style.scss';
import { useState, useContext } from 'react';
import axios from 'axios';

import { MEMBER_REGISTER } from '../../config/ajax-path';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RegisterForm() {
    const [registerData, setRegisterData] = useState({
        account: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [passwordFieldType, setPasswordFieldType] = useState('password');

    const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
        useState('password');

    const themeContext = useContext(ThemeContext);
    const { authorized, setAuth, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleFieldsChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: 欄位檢查

        // const accountRe = /^[a-zA-Z0-9_]\w*$/;

        // const emailRe =
        //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/;

        // const passwordRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (registerData.account.length > 10) {
            alert('您設定的帳戶字數過長');
            return;
        }

        // if (accountRe.test(registerData.account)) {
        //     alert('您輸入的帳戶不可含有空白格或特殊字元');
        //     return;
        // }

        if (registerData.confirmPassword !== registerData.password) {
            alert('密碼與確認密碼需要一致');
            return;
        }
        // const { confirmPassword, ...registerFields } = registerData;

        // 請注意 axios 和 fetch 的不同之處
        // fetch 要多轉換一次 .then(r => r.json())
        // fetch 的內容放在 body: fd
        // axios 會自動轉換 JSON 但結果放在 r.data 中
        // axios 的內容要放在 data: fd

        fetch(MEMBER_REGISTER, {
            method: 'POST',
            body: JSON.stringify(registerData),
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
                    navigate('/login');
                } else {
                    alert('註冊失敗');
                }
            });
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <section className="pb-4">
                            <div className="bg-white bg-opacity-75 rounded-5">
                                <section className="w-100 p-4 d-flex justify-content-center pb-4">
                                    <div>
                                        <div className="tab-content">
                                            <form
                                                name="form1"
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="mb-3 d-flex justify-content-center page-title">
                                                    會員註冊
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
                                                        name="account"
                                                        placeholder="請建立一個登入帳戶"
                                                        value={
                                                            registerData.account
                                                        }
                                                        onChange={
                                                            handleFieldsChange
                                                        }
                                                        required
                                                    />
                                                    <div className="form-text red"></div>
                                                </div>
                                                <div className="mb-3 page-field">
                                                    <label
                                                        htmlFor="email"
                                                        className="form-label"
                                                    >
                                                        電子信箱
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        name="email"
                                                        placeholder="請輸入一個有效信箱"
                                                        value={
                                                            registerData.email
                                                        }
                                                        onChange={
                                                            handleFieldsChange
                                                        }
                                                        required
                                                    />
                                                    <div className="form-text red"></div>
                                                </div>
                                                <div className="mb-3 page-field">
                                                    <label
                                                        htmlFor="password"
                                                        className="form-label"
                                                    >
                                                        登入密碼
                                                    </label>
                                                    <input
                                                        type={passwordFieldType}
                                                        className="form-control"
                                                        name="password"
                                                        placeholder="請建立一個密碼"
                                                        value={
                                                            registerData.password
                                                        }
                                                        onChange={
                                                            handleFieldsChange
                                                        }
                                                        required
                                                    />
                                                    <div className="form-text red"></div>
                                                </div>
                                                <div className="mb-3 page-field">
                                                    <label
                                                        htmlFor="confirmPassword"
                                                        className="form-label"
                                                    >
                                                        重新輸入密碼
                                                    </label>
                                                    <input
                                                        type={
                                                            confirmPasswordFieldType
                                                        }
                                                        className="form-control"
                                                        name="confirmPassword"
                                                        placeholder="再輸入一次密碼"
                                                        value={
                                                            registerData.confirmPassword
                                                        }
                                                        onChange={
                                                            handleFieldsChange
                                                        }
                                                        required
                                                    />
                                                    <div className=" form-text red"></div>
                                                </div>
                                                {/* 
                                                    <div className="text-center mb-3">
                                                        <p>以其他方式註冊：</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-link btn-floating mx-1"
                                                        >
                                                            <i className="fab fa-facebook-f"></i>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-link btn-floating mx-1"
                                                        >
                                                            <i className="fab fa-google"></i>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-link btn-floating mx-1"
                                                        >
                                                            <i className="fab fa-twitter"></i>
                                                        </button>
                                                    </div> 
                                                    */}

                                                <div className="d-flex justify-content-center ">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-l btn-pri btn-outline-light "
                                                    >
                                                        確認註冊
                                                    </button>
                                                </div>
                                                <br />
                                                <div className="d-flex justify-content-center ">
                                                    <Link
                                                        className="link"
                                                        to="/login"
                                                    >
                                                        已註冊，直接登入
                                                    </Link>
                                                </div>
                                                <br />
                                            </form>
                                            <div
                                                id="info-bar"
                                                className="alert alert-success d-flex justify-content-center"
                                                role="alert"
                                            >
                                                您已成功完成註冊
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterForm;
