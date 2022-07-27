import { useState, useContext } from 'react';
import axios from 'axios';

import { TEST_MEMBER_PROFILE_REVISE } from '../../config/ajax-path';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function MemberProfileReviseForm() {
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
        const result = await axios(TEST_MEMBER_PROFILE_REVISE, {
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
                                        {/* php */}
                                        <div className="card-2 d-flex">
                                            <div className="cards">
                                                <br />
                                                <ol className="breadcrumb justify-content-center">
                                                    <li
                                                        className="breadcrumb-item active"
                                                        aria-current="page"
                                                    >
                                                        <Link to="/memberprofile">
                                                            會員中心主頁
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="breadcrumb-item active"
                                                        aria-current="page"
                                                    >
                                                        修改會員資料
                                                    </li>
                                                    <li className="breadcrumb-item">
                                                        <Link to="/memberpasswordrevise">
                                                            修改登入密碼
                                                        </Link>
                                                    </li>
                                                    <li className="breadcrumb-item">
                                                        <Link to="/membereventorder">
                                                            法喜充滿訂單
                                                        </Link>
                                                    </li>
                                                </ol>
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
                                                                            修改會員資料
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
                                                                            />
                                                                            <div className="form-text red"></div>
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label
                                                                                htmlFor="name"
                                                                                className="form-label"
                                                                            >
                                                                                會員名稱
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="name"
                                                                                name="name"
                                                                            />
                                                                            <div className="form-text red"></div>
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label
                                                                                htmlFor="birthdate"
                                                                                className="form-label"
                                                                            >
                                                                                出生日
                                                                            </label>
                                                                            <input
                                                                                type="date"
                                                                                className="form-control"
                                                                                id="birthdate"
                                                                                name="birthdate"
                                                                            />
                                                                            <div className="form-text red"></div>
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label
                                                                                htmlFor="deathdate"
                                                                                className="form-label"
                                                                            >
                                                                                死亡日
                                                                            </label>
                                                                            <input
                                                                                type="date"
                                                                                className="form-control"
                                                                                id="deathdate"
                                                                                name="deathdate"
                                                                            />
                                                                            <div className="form-text red"></div>
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label
                                                                                htmlFor="email"
                                                                                className="form-label"
                                                                            >
                                                                                電子信箱
                                                                            </label>
                                                                            <input
                                                                                type="email"
                                                                                className="form-control"
                                                                                id="email"
                                                                                name="email"
                                                                            />
                                                                            <div className="form-text red"></div>
                                                                        </div>

                                                                        <div className="d-flex justify-content-sm-evenly ">
                                                                            <button
                                                                                type="submit"
                                                                                className="btn btn-outline-primary btn-lg"
                                                                            >
                                                                                修改
                                                                            </button>
                                                                            <button
                                                                                type="submit"
                                                                                className="btn btn-outline-secondary btn-lg"
                                                                            >
                                                                                清除
                                                                            </button>
                                                                        </div>
                                                                    </form>
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

export default MemberProfileReviseForm;
