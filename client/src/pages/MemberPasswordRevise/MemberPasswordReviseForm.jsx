import './style.scss';
import Swal from 'sweetalert2';
import { useState, useContext, useCallback, useEffect } from 'react';
import InputIME from './/components/InputIME';
import _ from 'lodash';
import axios from 'axios';

import { MEMBER_PASSWORD_REVISE } from '../../config/ajax-path';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoginForm from '../Login/LoginForm';

function MemberProfileForm(props) {
    const [newPasswordName, setNewPasswordName] = useState({
        currentpassword: '',
        password: '',
        confirmpassword: '',
    });

    const [currentPasswordFieldType, setCurrentPasswordFieldType] =
        useState('password');
    const [passwordFieldType, setPasswordFieldType] = useState('password');
    const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
        useState('password');

    const themeContext = useContext(ThemeContext);
    const { authorized, setAuth, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleFieldsChange = (e) => {
        setNewPasswordName({
            ...newPasswordName,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(newPasswordName);

        fetch(MEMBER_PASSWORD_REVISE, {
            method: 'POST',
            body: JSON.stringify(newPasswordName),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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
                    Swal.fire(result.error);
                    navigate('/memberprofile');
                } else {
                    Swal.fire(result.error);
                }
            });
    };

    return (
        <>
            {authorized ? (
                <>
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
                                                                        <form
                                                                            name="form1"
                                                                            onSubmit={
                                                                                handleUpdate
                                                                            }
                                                                        >
                                                                            <div className="mb-3 d-flex justify-content-center page-title">
                                                                                修改登入密碼
                                                                            </div>
                                                                            <br />
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="currentpassword"
                                                                                    className="form-label page-field"
                                                                                >
                                                                                    當前密碼
                                                                                </label>
                                                                                <input
                                                                                    type={
                                                                                        currentPasswordFieldType
                                                                                    }
                                                                                    className="form-control"
                                                                                    id="currentpassword"
                                                                                    name="currentpassword"
                                                                                    value={
                                                                                        newPasswordName.currentpassword
                                                                                    }
                                                                                    onChange={
                                                                                        handleFieldsChange
                                                                                    }
                                                                                    required
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="password"
                                                                                    className="form-label page-field"
                                                                                >
                                                                                    新密碼
                                                                                </label>
                                                                                <input
                                                                                    type={
                                                                                        passwordFieldType
                                                                                    }
                                                                                    className="form-control"
                                                                                    id="password"
                                                                                    name="password"
                                                                                    value={
                                                                                        newPasswordName.password
                                                                                    }
                                                                                    onChange={
                                                                                        handleFieldsChange
                                                                                    }
                                                                                    required
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="repeatpw"
                                                                                    className="form-label page-field"
                                                                                >
                                                                                    請再輸入一次新密碼
                                                                                </label>
                                                                                <input
                                                                                    type={
                                                                                        confirmPasswordFieldType
                                                                                    }
                                                                                    className="form-control"
                                                                                    id="confirmpassword"
                                                                                    name="confirmpassword"
                                                                                    value={
                                                                                        newPasswordName.confirmpassword
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
                                                                                    className="btn btn-l btn-pri btn-outline-light"
                                                                                >
                                                                                    修改
                                                                                </button>
                                                                                <button
                                                                                    type="reset"
                                                                                    className="btn btn-sec btn-l btn-outline-light"
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
