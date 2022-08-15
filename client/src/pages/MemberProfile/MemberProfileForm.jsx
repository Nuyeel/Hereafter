import './style.scss';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { MEMBER_PROFILE } from '../../config/ajax-path';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoginForm from '../Login/LoginForm';
import { ReactComponent as NavSoul } from '../../images/Nav/nav_soul.svg';

function MemberProfileForm() {
    const [mainProfile, setMainProfile] = useState({
        account: '',
        birthdate: '',
        deathdate: '',
        gooddeed_score: '',
    });

    const { theme, themeContext } = useContext(ThemeContext);
    const { authorized, setAuth, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleFieldsChange = (e) => {
        const id = e.target.id;
        const val = e.target.value;
        // console.log({ id, val });
        setMainProfile((prevState) => ({
            ...prevState,
            [id]: val,
        }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // console.log(mainProfile);

    //     const result = await axios(MEMBER_PROFILE, {
    //         method: 'POST',
    //         data: JSON.stringify(mainProfile),
    //         headers: {
    //             'Content-Type': 'Application/json',
    //         },
    //     });
    //     if (result.data.success) {
    //     } else {
    //         alert('帳密錯誤～～');
    //     }
    // };

    const fetchMemberData = async () => {
        console.log('fetch start');
        const r = await fetch(MEMBER_PROFILE, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await r.json();
        console.log(result);

        setMainProfile(result.data);
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
                                                    <section
                                                        className="w-100 p-4 d-flex justify-content-center pb-4 rounded-5  memberBgCard"
                                                        style={{
                                                            backgroundColor:
                                                                theme.memberBgCard,
                                                        }}
                                                    >
                                                        <div className="tab-content">
                                                            <div className="mb-3 d-flex justify-content-center member-page-title">
                                                                會員中心主頁
                                                            </div>
                                                            <br />
                                                            <div className="card rounded-4">
                                                                <div className="card-body d-flex align-items-center">
                                                                    <div className="col-md-9 mb-md-0 p-md-4 member-page-field">
                                                                        <div className="card-title">
                                                                            歡迎回來，
                                                                            {
                                                                                mainProfile.account
                                                                            }
                                                                        </div>{' '}
                                                                        <br />
                                                                        <div className="card-text ">
                                                                            您紀錄的出生日為：
                                                                            {
                                                                                mainProfile.birthdate
                                                                            }
                                                                        </div>
                                                                        <br />
                                                                        <div className="card-text ">
                                                                            您紀錄的死亡日為：
                                                                            {
                                                                                mainProfile.deathdate
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="member-avatar">
                                                                        頭貼位置
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br />
                                                            <div className="cards-2 d-flex justify-content-evenly align-items-center ">
                                                                <div className="card d-flex justify-content-evenly align-items-center rounded-4">
                                                                    <div className="card-body d-flex flex-column">
                                                                        <div className="card-title member-page-field">
                                                                            目前陰德值尚有：
                                                                            {
                                                                                mainProfile.gooddeed_score
                                                                            }
                                                                        </div>
                                                                        <div className="col-md-9 mb-md-0 p-md-4 d-flex flex-row justify-content-center">
                                                                            <div className=""></div>
                                                                        </div>
                                                                        <button className="btn-member btn-member-pri btn-member-m btn-member-outline-light">
                                                                            <Link
                                                                                className="member-link-2"
                                                                                to="/events
                                                                                "
                                                                            >
                                                                                賺取更多陰德值
                                                                            </Link>
                                                                        </button>{' '}
                                                                    </div>
                                                                </div>
                                                                <div className="p-2">
                                                                    {' '}
                                                                </div>
                                                                <div className="card d-flex justify-content-evenly align-items-center rounded-4">
                                                                    <div className="card-body d-flex flex-column">
                                                                        <h5 className="card-title member-page-field">
                                                                            您目前預定轉生的位置為：
                                                                        </h5>
                                                                        <div className="col-md-9 mb-md-0 p-md-4 d-flex flex-row justify-content-center">
                                                                            <i className="fa-solid fa-earth-asia"></i>
                                                                        </div>
                                                                        <button className="btn-member btn-member-sec btn-member-m btn-member-outline-light">
                                                                            <Link
                                                                                className="member-link-2"
                                                                                to="/Place
                                                                                "
                                                                            >
                                                                                前往良辰吉地
                                                                            </Link>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
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
                <></>
            )}
        </>
    );
}

export default MemberProfileForm;
