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
        currentPassword: '',
        password: '',
        confirmPassword: '',
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

    const [currentPasswordPrevious, setCurrentPasswordPrevious] = useState('');
    const [passwordPrevious, setPasswordPrevious] = useState('');
    const [confirmPasswordPrevious, setConfirmPasswordPrevious] = useState('');

    const [currentPasswordSearch, setCurrentPasswordSearch] = useState('');
    const [passwordSearch, setPasswordSearch] = useState('');
    const [confrimPasswordSearch, setConfirmPasswordSearch] = useState('');

    const [validationCssClassname2, setValidationCssClassname2] = useState('');
    const [validationCssClassname3, setValidationCssClassname3] = useState('');
    const [validationCssClassname4, setValidationCssClassname4] = useState('');

    const passwordRe = /^[a-zA-Z0-9_]\w*.{6,}$/;

    // 當前密碼檢查
    const handleCurrentPasswordSearch = (searchCurrentPasswordWord) => {
        // 初始狀態設為空
        if (!searchCurrentPasswordWord) {
            setValidationCssClassname2('');
            return;
        }
        // // 即時驗證欄位條件
        if (searchCurrentPasswordWord.match(passwordRe)) {
            setValidationCssClassname2('is-valid');
        } else {
            setValidationCssClassname2('is-invalid');
        }
    };

    // 設定300毫秒後做欄位檢查
    const debounceHandleSearch2 = useCallback(
        _.debounce(handleCurrentPasswordSearch, 300),
        []
    );

    const handleCurrentPasswordChange = (e) => {
        // 可控元件綁用state使用
        setPasswordSearch(e.target.value);
        // 搜尋用 - trim去除空白，toLowerCase轉小寫英文
        const searchCurrentPasswordWord = e.target.value.trim().toLowerCase();
        // 傳至debounceFn中
        debounceHandleSearch2(searchCurrentPasswordWord);
    };

    // 密碼檢查
    const handlePasswordSearch = (searchPasswordWord) => {
        // 初始狀態設為空
        if (!searchPasswordWord) {
            setValidationCssClassname3('');
            return;
        }
        // // 即時驗證欄位條件
        if (searchPasswordWord.match(passwordRe)) {
            setValidationCssClassname3('is-valid');
        } else {
            setValidationCssClassname3('is-invalid');
        }
    };

    // 設定300毫秒後做欄位檢查
    const debounceHandleSearch3 = useCallback(
        _.debounce(handlePasswordSearch, 300),
        []
    );

    const handlePasswordChange = (e) => {
        // 可控元件綁用state使用
        setPasswordSearch(e.target.value);
        // 搜尋用 - trim去除空白，toLowerCase轉小寫英文
        const searchPasswordWord = e.target.value.trim().toLowerCase();
        // 傳至debounceFn中
        debounceHandleSearch3(searchPasswordWord);
    };

    // 確認密碼檢查
    const handleConfirmPasswordSearch = (
        passwordPrevious,
        searchConfirmPasswordWord
    ) => {
        // 初始狀態設為空
        if (!searchConfirmPasswordWord) {
            setValidationCssClassname4('');
            return;
        }
        // // 即時驗證欄位條件
        if (searchConfirmPasswordWord === passwordPrevious) {
            setValidationCssClassname4('is-valid');
        } else {
            setValidationCssClassname4('is-invalid');
        }
    };

    // 設定300毫秒後做欄位檢查
    const debounceHandleSearch4 = useCallback(
        _.debounce(handleConfirmPasswordSearch, 300),
        []
    );

    const handleConfirmPasswordChange = (e) => {
        // 可控元件綁用state使用
        setConfirmPasswordSearch(e.target.value);
        // 搜尋用 - trim去除空白，toLowerCase轉小寫英文
        const searchConfirmPasswordWord = e.target.value.trim();
        // 傳至debounceFn中
        debounceHandleSearch4(passwordPrevious, searchConfirmPasswordWord);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(newPasswordName);

        if (!newPasswordName.currentPassword.match(passwordRe)) {
            Swal.fire('您輸入的密碼須包含字母及數字共八位數');
            return;
        }

        if (!newPasswordName.password.match(passwordRe)) {
            Swal.fire('您輸入的密碼須包含字母及數字共八位數');
            return;
        }

        if (newPasswordName.confirmPassword !== newPasswordName.password) {
            Swal.fire('密碼與確認密碼需要一致');
            return;
        }

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

    useEffect(() => {
        // console.log({
        //     account: accountPrevious,
        //     email: emailPrevious,
        //     password: passwordPrevious,
        //     confirmPassword: confirmPasswordPrevious,
        // });
        setNewPasswordName({
            currentPassword: currentPasswordPrevious,
            password: passwordPrevious,
            confirmPassword: confirmPasswordPrevious,
        });
    }, [currentPasswordPrevious, passwordPrevious, confirmPasswordPrevious]);

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
                                                                                    htmlFor="currentPassword"
                                                                                    className="form-label page-field"
                                                                                >
                                                                                    當前密碼
                                                                                </label>
                                                                                <InputIME
                                                                                    type={
                                                                                        currentPasswordFieldType
                                                                                    }
                                                                                    className={`form-control ${validationCssClassname2}`}
                                                                                    name="currentPassword"
                                                                                    placeholder="請輸入當前密碼"
                                                                                    onChange={
                                                                                        handleCurrentPasswordChange
                                                                                    }
                                                                                    setCurrentPasswordPrevious={
                                                                                        setCurrentPasswordPrevious
                                                                                    }
                                                                                    setPasswordPrevious={
                                                                                        setPasswordPrevious
                                                                                    }
                                                                                    setConfirmPasswordPrevious={
                                                                                        setConfirmPasswordPrevious
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
                                                                                <InputIME
                                                                                    type={
                                                                                        passwordFieldType
                                                                                    }
                                                                                    className={`form-control ${validationCssClassname3}`}
                                                                                    name="password"
                                                                                    placeholder="英文大小寫及數字至少七字"
                                                                                    onChange={
                                                                                        handlePasswordChange
                                                                                    }
                                                                                    setCurrentPasswordPrevious={
                                                                                        setCurrentPasswordPrevious
                                                                                    }
                                                                                    setPasswordPrevious={
                                                                                        setPasswordPrevious
                                                                                    }
                                                                                    setConfirmPasswordPrevious={
                                                                                        setConfirmPasswordPrevious
                                                                                    }
                                                                                    required
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="confirmPassword"
                                                                                    className="form-label page-field"
                                                                                >
                                                                                    確認新密碼
                                                                                </label>
                                                                                <InputIME
                                                                                    type={
                                                                                        confirmPasswordFieldType
                                                                                    }
                                                                                    className={`form-control ${validationCssClassname4}`}
                                                                                    name="confirmPassword"
                                                                                    placeholder="請再輸入一次前一欄的密碼"
                                                                                    onChange={
                                                                                        handleConfirmPasswordChange
                                                                                    }
                                                                                    setCurrentPasswordPrevious={
                                                                                        setCurrentPasswordPrevious
                                                                                    }
                                                                                    setPasswordPrevious={
                                                                                        setPasswordPrevious
                                                                                    }
                                                                                    setConfirmPasswordPrevious={
                                                                                        setConfirmPasswordPrevious
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
