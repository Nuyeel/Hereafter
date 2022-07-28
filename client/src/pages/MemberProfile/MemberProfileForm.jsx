import './style.scss';
import { useState, useContext } from 'react';
import axios from 'axios';

import { MEMBER_PROFILE } from '../../config/ajax-path';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
        const result = await axios(MEMBER_PROFILE, {
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
                                                                        會員中心主頁
                                                                    </div>
                                                                    <br />
                                                                    <div className="card">
                                                                        <div className="card-body d-flex align-items-center">
                                                                            <div className="col-md-9 mb-md-0 p-md-4 page-field">
                                                                                <h5 className="card-title">
                                                                                    歡迎回來，
                                                                                    <p className="card-text ">
                                                                                        <br />
                                                                                        這裡預計會放使用者的資料
                                                                                    </p>
                                                                                </h5>
                                                                            </div>
                                                                            <div className="col-md-9 mb-md-0 p-md-4 d-flex flex-row">
                                                                                <i className="fa-solid fa-user"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <br />
                                                                    <div className="cards-2 d-flex justify-content-evenly align-items-center">
                                                                        <div className="card d-flex justify-content-evenly align-items-center">
                                                                            <div className="col-md-9 mb-md-0 p-md-4 d-flex flex-row justify-content-center">
                                                                                <i className="fa-solid fa-earth-asia"></i>
                                                                            </div>
                                                                            <div className="card-body d-flex flex-column">
                                                                                <h5 className="card-title page-field">
                                                                                    這裡說不定會放東西
                                                                                </h5>
                                                                                <button className="btn btn-pri btn-m btn-outline-light">
                                                                                    開始預約
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="card d-flex justify-content-evenly align-items-center">
                                                                            <div className="col-md-9 mb-md-0 p-md-4 d-flex flex-row justify-content-center">
                                                                                <i className="fa-solid fa-wand-magic-sparkles"></i>
                                                                            </div>
                                                                            <div className="card-body d-flex flex-column">
                                                                                <h5 className="card-title page-field">
                                                                                    這裡說不定會放東西
                                                                                </h5>
                                                                                <button className="btn btn-sec btn-m btn-outline-light">
                                                                                    開始創建
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
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
            )}
        </>
    );
}

export default MemberProfileForm;
