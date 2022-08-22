import './style.scss';
import Swal from 'sweetalert2';
import { useState, useContext } from 'react';

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

    const [fillPasswordData, setFillPasswordData] = useState({
        account: 'Day0824',
        email: 'day220824@gmail.com',
    });

    const { theme, themeContext } = useContext(ThemeContext);
    const { authorized, setAuth, userLogout } = useContext(AuthContext);
    // const navigate = useNavigate();

    const [btnCssClassname, setBtnCssClassname] = useState(
        'btn-member btn-member-l btn-member-pri btn-member-outline-light'
    );

    const [btnName, setBtnName] = useState('接收驗證信');

    const handleFieldsChange = (e) => {
        const id = e.target.id;
        const val = e.target.value;
        setforgotPasswordData((prevState) => ({
            ...prevState,
            [id]: val,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        fetch(FORGOT_PASSWORD, {
            method: 'POST',
            body: JSON.stringify(forgotPasswordData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    setBtnCssClassname(
                        'btn-member btn-member-l btn-member-outline-light btn-member-sent'
                    );
                    setBtnName('已發送');
                    Swal.fire('請前往信箱接收驗證信');
                } else {
                    Swal.fire('帳戶或電子信箱有誤');
                    setBtnCssClassname(
                        'btn-member btn-member-l btn-member-outline-light btn-member-pri'
                    );
                }
            });
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
                        <div className="col member-login-area">
                            <section
                                className="pb-4 justify-content-center memberBgCard rounded-5"
                                style={{ backgroundColor: theme.memberBgCard }}
                            >
                                <section className="w-100 p-4 d-flex justify-content-center pb-4 ">
                                    <div
                                        className="member-login-auto-fill"
                                        onClick={() => {
                                            setforgotPasswordData(
                                                fillPasswordData
                                            );
                                        }}
                                    ></div>
                                    <div className="tab-content">
                                        <form
                                            name="form1"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="mb-3 d-flex justify-content-center member-page-title ">
                                                忘記密碼
                                            </div>
                                            <br />
                                            <div className="mb-3 member-page-field">
                                                <label
                                                    htmlFor="account"
                                                    className=" form-label member-login-field"
                                                >
                                                    帳戶名稱
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="account"
                                                    name="account"
                                                    placeholder="請輸入您註冊過的帳戶"
                                                    value={
                                                        forgotPasswordData.account
                                                    }
                                                    onChange={
                                                        handleFieldsChange
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3 member-page-field">
                                                <label
                                                    htmlFor="email"
                                                    className="form-label member-login-field"
                                                >
                                                    電子信箱
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    placeholder="請輸入您註冊過的信箱"
                                                    value={
                                                        forgotPasswordData.email
                                                    }
                                                    onChange={
                                                        handleFieldsChange
                                                    }
                                                    required
                                                />
                                            </div>
                                            <br />
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className={btnCssClassname}
                                                >
                                                    {btnName}
                                                </button>
                                            </div>
                                            <br />
                                            <div className="d-flex justify-content-center">
                                                <Link
                                                    className="member-link"
                                                    to="/login"
                                                >
                                                    想起密碼了，直接登入
                                                </Link>
                                            </div>
                                            <br />
                                            <div className="d-flex justify-content-center">
                                                <Link
                                                    className="member-link"
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
