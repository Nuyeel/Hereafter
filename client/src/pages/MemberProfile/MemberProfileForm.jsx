import './style.scss';
import soulIconAlert from '../../images/Nav/nav_soul.svg';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {
    MEMBER_PROFILE,
    STATIC_SHAREWALL_AVATAR,
} from '../../config/ajax-path';

import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function MemberProfileForm(props) {
    const { pageName } = props;
    const [mainProfile, setMainProfile] = useState({
        name: '',
        account: '',
        birthdate: '',
        deathdate: '',
        gooddeed_score: '',
        profile_picture: '',
    });

    const [dateData, setDateData] = useState({
        birthdate: '',
        deathdate: '',
    });

    const [placeData, setPlaceData] = useState({
        country: '',
        city: '',
        dist: '',
    });

    const { country, city, dist } = placeData;
    const { setHeader } = useContext(HeaderContext);
    const { theme, themeContext } = useContext(ThemeContext);
    const { authorized, setAuth, token } = useContext(AuthContext);
    const navigate = useNavigate();

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
        setPlaceData(result.placedata);
        setDateData(result.bithdatedata);
    };

    useEffect(() => {
        fetchMemberData();
    }, []);

    useEffect(() => {
        setHeader(headers[pageName]);
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
                                                                我的生死紀錄
                                                            </div>
                                                            <br />
                                                            <div
                                                                className="card rounded-4 member-page-card"
                                                                style={{
                                                                    border: 'none',
                                                                }}
                                                            >
                                                                <div className="card-body d-flex align-items-center member-page-card">
                                                                    <div className="col-md-9 mb-md-0 p-md-4 ">
                                                                        <div className="card-title member-page-name">
                                                                            {mainProfile.name
                                                                                ? mainProfile.name
                                                                                : mainProfile.account}
                                                                        </div>
                                                                        <br />
                                                                        {/* TODO：有無日期的呈現方式 */}
                                                                        {mainProfile.birthdate ? (
                                                                            <div className="member-page-subtitle">
                                                                                出生於
                                                                                <span className=" member-page-text">
                                                                                    {' '}
                                                                                    {
                                                                                        mainProfile.birthdate
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="member-page-subtitle">
                                                                                未記錄出生日
                                                                            </div>
                                                                        )}
                                                                        <br />
                                                                        {mainProfile.deathdate ? (
                                                                            <div className="member-page-subtitle">
                                                                                往生於
                                                                                <span className=" member-page-text">
                                                                                    {' '}
                                                                                    {
                                                                                        mainProfile.deathdate
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="member-page-subtitle">
                                                                                未存在往生紀錄
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    {/* TODO：頭貼位置 */}
                                                                    <div className="member-page-avatar-position">
                                                                        {mainProfile.img_name ? (
                                                                            <Link to="/showcase">
                                                                                <img
                                                                                    className="member-page-avatar "
                                                                                    src={`${STATIC_SHAREWALL_AVATAR}${mainProfile.img_name}`}
                                                                                    alt=""
                                                                                />
                                                                            </Link>
                                                                        ) : (
                                                                            <Link to="/showcase">
                                                                                <img
                                                                                    src={`${STATIC_SHAREWALL_AVATAR}default.png`}
                                                                                    alt=""
                                                                                />
                                                                            </Link>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br />
                                                            <div className="cards-2 d-flex justify-content-evenly align-items-center">
                                                                <div
                                                                    className="card d-flex justify-content-evenly align-items-center rounded-4 member-page-card-2"
                                                                    style={{
                                                                        border: 'none',
                                                                    }}
                                                                >
                                                                    <div className="card-body d-flex flex-column member-page-card-2">
                                                                        {mainProfile.gooddeed_score ? (
                                                                            <>
                                                                                <div className="card-title member-page-text-2">
                                                                                    目前陰德值尚餘
                                                                                </div>
                                                                                <div className="mb-md-0 p-md-4 d-flex justify-content-center member-page-gooddeed">
                                                                                    --{' '}
                                                                                    {
                                                                                        mainProfile.gooddeed_score
                                                                                    }{' '}
                                                                                    --
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
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <div className="card-title member-page-text-2">
                                                                                    目前還沒有陰德值記錄
                                                                                </div>
                                                                                <div className=" d-flex justify-content-center">
                                                                                    <img
                                                                                        className="member-page-gooddeed-icon"
                                                                                        src={
                                                                                            soulIconAlert
                                                                                        }
                                                                                        alt=""
                                                                                    />
                                                                                </div>
                                                                                <button className="btn-member btn-member-pri btn-member-m btn-member-outline-light">
                                                                                    <Link
                                                                                        className="member-link-2"
                                                                                        to="/gooddeed
                                                                                "
                                                                                    >
                                                                                        陰德值測驗GO！
                                                                                    </Link>
                                                                                </button>{' '}
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="p-2">
                                                                    {' '}
                                                                </div>
                                                                <div
                                                                    className="card d-flex justify-content-evenly align-items-center rounded-4 member-page-card-3 "
                                                                    style={{
                                                                        border: 'none',
                                                                    }}
                                                                >
                                                                    <div className="card-body d-flex flex-column member-page-card-3">
                                                                        {/* TODO：有無良辰吉地的呈現方式 */}
                                                                        {country &&
                                                                        city &&
                                                                        dist ? (
                                                                            <>
                                                                                <h5 className="card-title member-page-text-2">
                                                                                    感興趣的良辰吉地
                                                                                </h5>
                                                                                <div className="mb-md-0 p-md-4 d-flex flex-row justify-content-center">
                                                                                    <div className="member-page-place">
                                                                                        {
                                                                                            country
                                                                                        }
                                                                                        {
                                                                                            city
                                                                                        }
                                                                                        {
                                                                                            dist
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                <button className="btn-member btn-member-sec btn-member-m btn-member-outline-light">
                                                                                    <Link
                                                                                        className="member-link-2"
                                                                                        to="/reborn-cart
                                                                                "
                                                                                    >
                                                                                        查看轉生購物車
                                                                                    </Link>
                                                                                </button>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <h5 className="card-title member-page-text-2">
                                                                                    即刻挑選一塊良辰吉地吧
                                                                                </h5>
                                                                                <div className=" d-flex justify-content-center">
                                                                                    <img
                                                                                        className="member-page-gooddeed-icon"
                                                                                        src={
                                                                                            soulIconAlert
                                                                                        }
                                                                                        alt=""
                                                                                    />
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
                                                                            </>
                                                                        )}
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
