import { useState, useContext } from 'react';
import axios from 'axios';

import { MEMBER_EVENT_ORDER } from '../../config/ajax-path';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoginForm from '../Login/LoginForm';

import EventHistory from './EventHistory';

function MemberProfileForm() {
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
        const result = await axios(MEMBER_EVENT_ORDER, {
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
                    {/* <div>已經登入了欸</div>
                    <br />
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={userLogout}
                        to="/login"
                    >
                        Logout
                    </button> */}
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <section className="pb-4">
                                    <div className="bg-white bg-opacity-75 rounded-5">
                                        <section className="w-100 p-4 d-flex justify-content-center pb-4">
                                            <div className="card-2 d-flex">
                                                <div className="cards">
                                                    <br />
                                                    <ol
                                                        className="breadcrumb justify-content-center"
                                                        style={{
                                                            '--bs-breadcrumb-divider':
                                                                'none',
                                                        }}
                                                    >
                                                        <li
                                                            className="breadcrumb-item active"
                                                            aria-current="page"
                                                        >
                                                            <Link
                                                                to="/memberprofile"
                                                                className="breadcrumb-item breadcrumb-item-link"
                                                            >
                                                                會員中心主頁
                                                            </Link>
                                                        </li>

                                                        <li className="breadcrumb-item">
                                                            <Link
                                                                to="/memberprofilerevise"
                                                                className="breadcrumb-item-link"
                                                            >
                                                                修改會員資料
                                                            </Link>
                                                        </li>
                                                        <li className="breadcrumb-item">
                                                            <Link
                                                                to="/memberpasswordrevise"
                                                                className="breadcrumb-item-link"
                                                            >
                                                                修改登入密碼
                                                            </Link>
                                                        </li>
                                                        <li className="breadcrumb-item">
                                                            <Link
                                                                to="/membereventorder"
                                                                className="breadcrumb-item-link"
                                                            >
                                                                法喜充滿訂單
                                                            </Link>
                                                        </li>
                                                    </ol>

                                                    <section className="pb-4">
                                                        <div className="bg-white bg-opacity-75 rounded-5">
                                                            <section className="w-100 p-4 d-flex justify-content-center pb-4">
                                                                <div>
                                                                    <div className="tab-content">
                                                                        <div className="mb-3 d-flex justify-content-center page-title">
                                                                            法喜充滿訂單
                                                                        </div>

                                                                        {/* 這段是 二路測試用 */}
                                                                        <EventHistory />
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <LoginForm />
                </>
            )}
        </>
    );
}

export default MemberProfileForm;
