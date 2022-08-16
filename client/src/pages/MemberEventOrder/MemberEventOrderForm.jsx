import { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { MEMBER_EVENT_ORDER } from '../../config/ajax-path';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoginForm from '../Login/LoginForm';

import EventHistory from './EventHistory';

function MemberProfileForm() {
    const [eventOrder, setEventOrder] = useState([]);

    const { theme, themeContext } = useContext(ThemeContext);
    const { authorized, setAuth, userLogout } = useContext(AuthContext);

    const navigate = useNavigate();
    let { eventSid } = useParams();

    const fetchEventDetail = async () => {
        const response = await axios.get(
            // TODO:修成 ajax-path
            `http://localhost:3500/events/${eventSid}`
        );
        setEventOrder(response.data);
    };

    useEffect(() => {
        fetchEventDetail();
    }, []);

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
                                                            功德撲滿訂單
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
                                                                功德撲滿訂單
                                                            </div>
                                                            {/* 這段是二路測試用 */}
                                                            <div className="">
                                                                <EventHistory />
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
                <>
                    <LoginForm />
                </>
            )}
        </>
    );
}

export default MemberProfileForm;
