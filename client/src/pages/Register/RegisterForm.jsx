import './style.scss';
import Swal from 'sweetalert2';
import { useState, useContext, useCallback, useEffect } from 'react';
import InputIME from './components/InputIME';
import _ from 'lodash';
import axios from 'axios';

import { MEMBER_REGISTER } from '../../config/ajax-path';
import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RegisterForm(props) {
    const [registerData, setRegisterData] = useState({
        account: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [fillRegisterData, setFillRegisterData] = useState({
        account: 'HappyCat07',
        email: 'day220824@gmail.com',
        password: 'Day0824',
        confirmPassword: 'Day0824',
    });

    const [passwordFieldType, setPasswordFieldType] = useState('password');
    const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
        useState('password');

    const [accountPrevious, setAccountPrevious] = useState('');
    const [emailPrevious, setEmailPrevious] = useState('');
    const [passwordPrevious, setPasswordPrevious] = useState('');
    const [confirmPasswordPrevious, setConfirmPasswordPrevious] = useState('');

    const { theme, themeContext } = useContext(ThemeContext);
    const { authorized, setAuth, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    // 欄位處理
    const [accountSearch, setAccountSearch] = useState('');
    const [emailSearch, setEmailSearch] = useState('');
    const [passwordSearch, setPasswordSearch] = useState('');
    const [confrimPasswordSearch, setConfirmPasswordSearch] = useState('');
    const [validationCssClassname, setValidationCssClassname] = useState('');
    const [validationCssClassname2, setValidationCssClassname2] = useState('');
    const [validationCssClassname3, setValidationCssClassname3] = useState('');
    const [validationCssClassname4, setValidationCssClassname4] = useState('');

    const [isAutoFill, setIsAutoFill] = useState(false);

    // 正規表達式定義在這邊，前端檢查only
    const accountRe = /^[a-zA-Z0-9_]\w*$/;
    const emailRe =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/;
    const passwordRe = /^[a-zA-Z0-9_]\w*.{6,}$/;

    // 帳號檢查
    const handleAccountSearch = (searchAccountWord) => {
        // 初始狀態設為空
        if (!searchAccountWord) {
            setValidationCssClassname('');
            return;
        }
        // // 即時驗證欄位條件
        if (
            searchAccountWord.length <= 10 &&
            searchAccountWord.length >= 3 &&
            searchAccountWord.match(accountRe)
        ) {
            setValidationCssClassname('');
        } else {
            setValidationCssClassname('is-invalid');
        }
    };

    // 設定300毫秒後做欄位檢查
    const debounceHandleSearch1 = useCallback(
        _.debounce(handleAccountSearch, 300),
        []
    );

    const handleAccountChange = (e) => {
        // 可控元件綁用state使用
        setAccountSearch(e.target.value);
        // 搜尋用 - trim去除空白，toLowerCase轉小寫英文
        const searchAccountWord = e.target.value.trim().toLowerCase();
        // 傳至debounceFn中
        debounceHandleSearch1(searchAccountWord);
    };

    // 電子信箱檢查
    const handleEmailSearch = (searchEmailWord) => {
        // 初始狀態設為空
        if (!searchEmailWord) {
            setValidationCssClassname2('');
            return;
        }
        // // 即時驗證欄位條件
        if (searchEmailWord.match(emailRe)) {
            setValidationCssClassname2('');
        } else {
            setValidationCssClassname2('is-invalid');
        }
    };

    // 設定300毫秒後做欄位檢查
    const debounceHandleSearch2 = useCallback(
        _.debounce(handleEmailSearch, 300),
        []
    );

    const handleEmailChange = (e) => {
        // 可控元件綁用state使用
        setEmailSearch(e.target.value);
        // 搜尋用 - trim去除空白，toLowerCase轉小寫英文
        const searchEmailWord = e.target.value.trim().toLowerCase();
        // 傳至debounceFn中
        debounceHandleSearch2(searchEmailWord);
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
            setValidationCssClassname3('');
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
        console.log(searchConfirmPasswordWord);
        console.log(passwordPrevious);
        // // 即時驗證欄位條件
        if (searchConfirmPasswordWord === passwordPrevious) {
            setValidationCssClassname4('');
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

    // 送出表單的部分
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!registerData.account.match(accountRe)) {
            Swal.fire('帳戶不可含有空白格或特殊字元');
            return;
        }

        if (!registerData.password.match(passwordRe)) {
            Swal.fire('密碼須包含字母及數字共八位數');
            return;
        }

        if (registerData.confirmPassword !== registerData.password) {
            Swal.fire('密碼與確認密碼需要一致');
            return;
        }

        console.log(registerData);

        fetch(MEMBER_REGISTER, {
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    // localStorage.setItem('auth', JSON.stringify(result.data));
                    localStorage.removeItem('auth');
                    setAuth({
                        ...result.data,
                        // authorized: true,
                    });
                    Swal.fire(result.error);
                    navigate('/login');
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
        setRegisterData({
            account: accountPrevious,
            email: emailPrevious,
            password: passwordPrevious,
            confirmPassword: confirmPasswordPrevious,
        });
    }, [
        accountPrevious,
        emailPrevious,
        passwordPrevious,
        confirmPasswordPrevious,
    ]);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col member-login-area">
                        <section
                            className="pb-4 justify-content-center memberBgCard rounded-5"
                            style={{ backgroundColor: theme.memberBgCard }}
                        >
                            <section className="w-100 p-4 d-flex justify-content-center pb-4 ">
                                <div
                                    className="member-login-auto-fill"
                                    onClick={() => {
                                        // setForgotPasswordReviseData(
                                        //     fillPasswordData
                                        // );
                                        // console.log(fillPasswordData);
                                        setIsAutoFill(true);
                                        setAccountPrevious(
                                            fillRegisterData.account
                                        );
                                        setEmailPrevious(
                                            fillRegisterData.email
                                        );
                                        setPasswordPrevious(
                                            fillRegisterData.password
                                        );
                                        setConfirmPasswordPrevious(
                                            fillRegisterData.confirmPassword
                                        );
                                        console.log(accountPrevious);
                                        console.log(emailPrevious);
                                        console.log(passwordPrevious);
                                        console.log(confirmPasswordPrevious);
                                    }}
                                ></div>
                                <div className="tab-content">
                                    <form name="form1" onSubmit={handleSubmit}>
                                        <div className="mb-3 d-flex justify-content-center member-page-title">
                                            會員註冊
                                        </div>
                                        <br />
                                        <div className="mb-3 member-page-field">
                                            <label
                                                htmlFor="account"
                                                className="form-label member-login-field"
                                            >
                                                帳戶名稱
                                            </label>
                                            <InputIME
                                                type="text"
                                                className={`form-control ${validationCssClassname}`}
                                                name="account"
                                                placeholder="例：HappyCats"
                                                onChange={handleAccountChange}
                                                accountPrevious={
                                                    accountPrevious
                                                }
                                                emailPrevious={emailPrevious}
                                                passwordPrevious={
                                                    passwordPrevious
                                                }
                                                confirmPasswordPrevious={
                                                    confirmPasswordPrevious
                                                }
                                                setAccountPrevious={
                                                    setAccountPrevious
                                                }
                                                setEmailPrevious={
                                                    setEmailPrevious
                                                }
                                                setPasswordPrevious={
                                                    setPasswordPrevious
                                                }
                                                setConfirmPasswordPrevious={
                                                    setConfirmPasswordPrevious
                                                }
                                                isAutoFill={isAutoFill}
                                                maxLength="10"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 member-page-field">
                                            <label
                                                htmlFor="email"
                                                className="form-label member-login-field"
                                            >
                                                電子信箱
                                            </label>
                                            <InputIME
                                                type="email"
                                                className={`form-control ${validationCssClassname2}`}
                                                name="email"
                                                placeholder="請輸入一個有效的電子信箱"
                                                onChange={handleEmailChange}
                                                accountPrevious={
                                                    accountPrevious
                                                }
                                                emailPrevious={emailPrevious}
                                                passwordPrevious={
                                                    passwordPrevious
                                                }
                                                confirmPasswordPrevious={
                                                    confirmPasswordPrevious
                                                }
                                                setAccountPrevious={
                                                    setAccountPrevious
                                                }
                                                setEmailPrevious={
                                                    setEmailPrevious
                                                }
                                                setPasswordPrevious={
                                                    setPasswordPrevious
                                                }
                                                setConfirmPasswordPrevious={
                                                    setConfirmPasswordPrevious
                                                }
                                                isAutoFill={isAutoFill}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 member-page-field">
                                            <label
                                                htmlFor="password"
                                                className="form-label member-login-field"
                                            >
                                                登入密碼
                                            </label>
                                            <InputIME
                                                type={passwordFieldType}
                                                className={`form-control ${validationCssClassname3}`}
                                                name="password"
                                                placeholder="英文大小寫及數字至少七字"
                                                onChange={handlePasswordChange}
                                                accountPrevious={
                                                    accountPrevious
                                                }
                                                emailPrevious={emailPrevious}
                                                passwordPrevious={
                                                    passwordPrevious
                                                }
                                                confirmPasswordPrevious={
                                                    confirmPasswordPrevious
                                                }
                                                setAccountPrevious={
                                                    setAccountPrevious
                                                }
                                                setEmailPrevious={
                                                    setEmailPrevious
                                                }
                                                setPasswordPrevious={
                                                    setPasswordPrevious
                                                }
                                                setConfirmPasswordPrevious={
                                                    setConfirmPasswordPrevious
                                                }
                                                isAutoFill={isAutoFill}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 member-page-field">
                                            <label
                                                htmlFor="confirmPassword"
                                                className="form-label member-login-field"
                                            >
                                                重新輸入密碼
                                            </label>
                                            <InputIME
                                                type={confirmPasswordFieldType}
                                                className={`form-control ${validationCssClassname4}`}
                                                name="confirmPassword"
                                                placeholder="請再輸入一次前一欄的密碼"
                                                onChange={
                                                    handleConfirmPasswordChange
                                                }
                                                accountPrevious={
                                                    accountPrevious
                                                }
                                                emailPrevious={emailPrevious}
                                                passwordPrevious={
                                                    passwordPrevious
                                                }
                                                confirmPasswordPrevious={
                                                    confirmPasswordPrevious
                                                }
                                                setAccountPrevious={
                                                    setAccountPrevious
                                                }
                                                setEmailPrevious={
                                                    setEmailPrevious
                                                }
                                                setPasswordPrevious={
                                                    setPasswordPrevious
                                                }
                                                setConfirmPasswordPrevious={
                                                    setConfirmPasswordPrevious
                                                }
                                                isAutoFill={isAutoFill}
                                                required
                                            />
                                        </div>
                                        <br />
                                        <div className="d-flex justify-content-center ">
                                            <button
                                                type="submit"
                                                className="btn-member btn-member-l btn-member-pri btn-member-outline-light "
                                            >
                                                確認註冊
                                            </button>
                                        </div>
                                        <br />
                                        <div className="d-flex justify-content-center ">
                                            <Link
                                                className="member-link"
                                                to="/login"
                                            >
                                                已註冊，直接登入
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterForm;
