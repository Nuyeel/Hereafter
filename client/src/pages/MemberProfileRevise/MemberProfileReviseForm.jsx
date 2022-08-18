import './style.scss';
import Swal from 'sweetalert2';
import soulIconAlert from '../../images/sweetalert2/outline_soul_alert.svg';
import LoadingLogo from '../../components/LoadingLogo';

import { useState, useContext, useCallback, useEffect } from 'react';
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
    const [isLoading, setIsLoading] = useState(false);

    const handleFieldsChange = (e) => {
        const id = e.target.id;
        const val = e.target.value;
        // console.log({ id, val });
        setMemberProfileData((prevState) => ({
            ...prevState,
            [id]: val,
        }));
    };

    // TODO-1：出生日與往生日的判斷式
    // TODO-2：日期預設格式修改
    // TODO-3：要補手機和住址資料讓活動同步撈

    const emailRe =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(memberProfileData);

        if (!memberProfileData.email.match(emailRe)) {
            Swal.fire('電子信箱格式有誤');
            return;
        }

        Swal.fire({
            title: '是否確認修改當前資料',
            imageUrl: soulIconAlert,
            imageHeight: 50,
            imageWidth: 50,
            confirmButtonText: '確認修改',
            showDenyButton: true,
            denyButtonText: '取消',
        }).then((result) => {
            if (result.isConfirmed) {
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
                            Swal.fire({
                                title: '修改成功',
                                timer: 1000,
                            });
                        } else {
                            Swal.fire('此電子信箱已有其他人使用囉');
                            return;
                        }
                    });
            } else if (result.isDenied) {
                Swal.fire('資料未變更');
                return;
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
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

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
                                                            我的生死紀錄
                                                        </Link>
                                                    </li>

                                                    <li className="breadcrumb-item">
                                                        <Link
                                                            to="/memberprofilerevise"
                                                            className="breadcrumb-item-link"
                                                        >
                                                            修改生死紀錄
                                                        </Link>
                                                    </li>
                                                    <li className="breadcrumb-item">
                                                        <Link
                                                            to="/memberpasswordrevise"
                                                            className="breadcrumb-item-link"
                                                        >
                                                            修改我的密碼
                                                        </Link>
                                                    </li>
                                                    <li className="breadcrumb-item">
                                                        <Link
                                                            to="/membereventorder"
                                                            className="breadcrumb-item-link"
                                                        >
                                                            我的功德撲滿
                                                        </Link>
                                                    </li>
                                                </ol>
                                                <section
                                                    className="pb-4 member-loading"
                                                    style={{
                                                        maxHeight: '550px',
                                                        borderRadius: '20px',
                                                    }}
                                                >
                                                    <section
                                                        className="w-100 p-4 d-flex justify-content-center pb-4 rounded-5 memberBgCard"
                                                        style={{
                                                            backgroundColor:
                                                                theme.memberBgCard,
                                                        }}
                                                    >
                                                        <div className="tab-content">
                                                            {isLoading ? (
                                                                <>
                                                                    <LoadingLogo
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#ffffff00',
                                                                            top: '-225px',
                                                                        }}
                                                                    />
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )}
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
                                                                    <input
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
                                                                    <input
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
                                                                        maxLength="12"
                                                                    />
                                                                </div>
                                                                <div className="mb-3 member-page-field">
                                                                    <label
                                                                        htmlFor="birthdate"
                                                                        className="form-label"
                                                                    >
                                                                        出生日
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        className="form-control"
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
                                                                        往生日
                                                                    </label>
                                                                    <input
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
                                                                    <input
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
                                                                <br />
                                                                <div className="d-flex justify-content-sm-evenly ">
                                                                    <button
                                                                        type="submit"
                                                                        className="btn-member btn-member-l btn-member-pri btn-member-outline-light"
                                                                    >
                                                                        確認修改
                                                                    </button>

                                                                    <br />
                                                                    {/* Improvement：補清除功能 */}
                                                                    {/* <button
                                                                                    type="reset"
                                                                                    className="btn-member btn-member-sec btn-member-l btn-member-outline-light"
                                                                                >
                                                                                    清除
                                                                                </button> */}
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </section>
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
