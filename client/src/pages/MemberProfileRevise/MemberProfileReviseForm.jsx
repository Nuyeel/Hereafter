import './style.scss';
import Swal from 'sweetalert2';
import { useState, useContext, useCallback, useEffect } from 'react';
import InputIME from './components/InputIME';
import _ from 'lodash';

import { MEMBER_PROFILE_REVISE } from '../../config/ajax-path';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoginForm from '../Login/LoginForm';

function MemberProfileReviseForm() {
    const [memberProfileData, setMemberProfileData] = useState({
        account: '',
        name: '',
        birthdate: '',
        deathdate: '',
        email: '',
    });

    const { theme, themeContext } = useContext(ThemeContext);
    const { authorized, setAuth, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleFieldsChange = (e) => {
        const id = e.target.id;
        const val = e.target.value;
        // console.log({ id, val });
        setMemberProfileData((prevState) => ({
            ...prevState,
            [id]: val,
        }));
    };

    const emailRe =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(memberProfileData);

        if (!memberProfileData.email.match(emailRe)) {
            Swal.fire('電子信箱格式有誤');
            return;
        }

        fetch(MEMBER_PROFILE_REVISE, {
            method: 'POST',
            body: JSON.stringify(memberProfileData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((r) => r.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    Swal.fire(result.error);
                    navigate('/memberprofile');
                } else {
                    Swal.fire(result.error);
                }
            });
    };

    const fetchMemberData = async () => {
        console.log('fetch start');
        const r = await fetch(MEMBER_PROFILE_REVISE, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await r.json();
        console.log(result);

        setMemberProfileData(result.data);
    };

    useEffect(() => {
        fetchMemberData();
    }, []);

    return (
        <>
            {authorized ? (
                <>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <section
                                    className="pb-4 justify-content-center memberBgCard rounded-5"
                                    style={{
                                        backgroundColor: theme.memberBgCard,
                                    }}
                                >
                                    <section className="w-100 p-4 d-flex justify-content-center pb-4 ">
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
                                                    <div className="bg-white rounded-5">
                                                        <section className="w-100 p-4 d-flex justify-content-center pb-4">
                                                            <div>
                                                                <div className="tab-content">
                                                                    <form
                                                                        name="form1"
                                                                        onSubmit={
                                                                            handleSubmit
                                                                        }
                                                                    >
                                                                        <div className="mb-3 d-flex justify-content-center member-page-title">
                                                                            修改會員資料
                                                                        </div>
                                                                        <br />
                                                                        <div className="mb-3 member-page-field">
                                                                            <label
                                                                                htmlFor="account"
                                                                                className="form-label"
                                                                            >
                                                                                帳戶名稱
                                                                            </label>
                                                                            <InputIME
                                                                                type="text"
                                                                                className="form-control input-2"
                                                                                id="account"
                                                                                name="account"
                                                                                value={
                                                                                    memberProfileData.account
                                                                                }
                                                                                onChange={
                                                                                    handleFieldsChange
                                                                                }
                                                                                disabled="disabled"
                                                                            />
                                                                        </div>
                                                                        <div className="mb-3 member-page-field">
                                                                            <label
                                                                                htmlFor="name"
                                                                                className="form-label"
                                                                            >
                                                                                會員名稱
                                                                            </label>
                                                                            <InputIME
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="name"
                                                                                name="name"
                                                                                placeholder="快樂的靈魂"
                                                                                value={
                                                                                    memberProfileData.name
                                                                                }
                                                                                onChange={
                                                                                    handleFieldsChange
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="mb-3 member-page-field">
                                                                            <label
                                                                                htmlFor="birthdate"
                                                                                className="form-label"
                                                                            >
                                                                                出生日
                                                                            </label>
                                                                            <InputIME
                                                                                type="date"
                                                                                className="form-control"
                                                                                id="birthdate"
                                                                                name="birthdate"
                                                                                value={
                                                                                    memberProfileData.birthdate
                                                                                }
                                                                                onChange={
                                                                                    handleFieldsChange
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="mb-3 member-page-field">
                                                                            <label
                                                                                htmlFor="deathdate"
                                                                                className="form-label"
                                                                            >
                                                                                死亡日
                                                                            </label>
                                                                            <InputIME
                                                                                type="date"
                                                                                className="form-control"
                                                                                id="deathdate"
                                                                                name="deathdate"
                                                                                value={
                                                                                    memberProfileData.deathdate
                                                                                }
                                                                                onChange={
                                                                                    handleFieldsChange
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="mb-3 member-page-field">
                                                                            <label
                                                                                htmlFor="email"
                                                                                className="form-label"
                                                                            >
                                                                                電子信箱
                                                                            </label>
                                                                            <InputIME
                                                                                type="email"
                                                                                className="form-control"
                                                                                id="email"
                                                                                name="email"
                                                                                placeholder="請輸入一個有效的電子信箱"
                                                                                value={
                                                                                    memberProfileData.email
                                                                                }
                                                                                onChange={
                                                                                    handleFieldsChange
                                                                                }
                                                                                required
                                                                            />
                                                                        </div>

                                                                        <div className="d-flex justify-content-sm-evenly ">
                                                                            <button
                                                                                type="submit"
                                                                                className="btn-member btn-member-l btn-member-pri btn-member-outline-light"
                                                                            >
                                                                                確認修改
                                                                            </button>
                                                                            {/* <button
                                                                                    type="reset"
                                                                                    className="btn-member btn-member-sec btn-member-l btn-member-outline-light"
                                                                                >
                                                                                    清除
                                                                                </button> */}
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

export default MemberProfileReviseForm;
