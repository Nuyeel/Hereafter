import './style.scss';
import Swal from 'sweetalert2';
import { useState, useContext, useCallback, useEffect } from 'react';
import InputIME from './/components/InputIME';
import _ from 'lodash';

import { FORGOT_PASSWORD_REVISE } from '../../config/ajax-path';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ForgotPasswordReviseForm(props) {
    const [forgotPasswordReviseData, setForgotPasswordReviseData] = useState({
        account: '',
        password: '',
        confirmPassword: '',
    });

    const [passwordFieldType, setPasswordFieldType] = useState('password');
    const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
        useState('password');

    const { theme, themeContext } = useContext(ThemeContext);
    const { authorized, setAuth, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [accountPrevious, setAccountPrevious] = useState('');
    const [passwordPrevious, setPasswordPrevious] = useState('');
    const [confirmPasswordPrevious, setConfirmPasswordPrevious] = useState('');

    // const [accountSearch, setAccountSearch] = useState('');
    const [passwordSearch, setPasswordSearch] = useState('');
    const [confrimPasswordSearch, setConfirmPasswordSearch] = useState('');

    // const [validationCssClassname, setValidationCssClassname] = useState('');
    const [validationCssClassname2, setValidationCssClassname2] = useState('');
    const [validationCssClassname3, setValidationCssClassname3] = useState('');

    const passwordRe = /^[a-zA-Z0-9_]\w*.{6,}$/;

    // 密碼檢查
    const handlePasswordSearch = (searchPasswordWord) => {
        // 初始狀態設為空
        if (!searchPasswordWord) {
            setValidationCssClassname2('');
            return;
        }
        // // 即時驗證欄位條件
        if (searchPasswordWord.match(passwordRe)) {
            setValidationCssClassname2('is-valid');
        } else {
            setValidationCssClassname2('is-invalid');
        }
    };

    // 設定300毫秒後做欄位檢查
    const debounceHandleSearch2 = useCallback(
        _.debounce(handlePasswordSearch, 300),
        []
    );

    const handlePasswordChange = (e) => {
        // 可控元件綁用state使用
        setPasswordSearch(e.target.value);
        // 搜尋用 - trim去除空白，toLowerCase轉小寫英文
        const searchPasswordWord = e.target.value.trim().toLowerCase();
        // 傳至debounceFn中
        debounceHandleSearch2(searchPasswordWord);
    };

    // 確認密碼檢查
    const handleConfirmPasswordSearch = (
        passwordPrevious,
        searchConfirmPasswordWord
    ) => {
        // 初始狀態設為空
        if (!searchConfirmPasswordWord) {
            setValidationCssClassname3('');
            return;
        }
        // // 即時驗證欄位條件
        if (searchConfirmPasswordWord === passwordPrevious) {
            setValidationCssClassname3('is-valid');
        } else {
            setValidationCssClassname3('is-invalid');
        }
    };

    // 設定300毫秒後做欄位檢查
    const debounceHandleSearch = useCallback(
        _.debounce(handleConfirmPasswordSearch, 300),
        []
    );

    const handleConfirmPasswordChange = (e) => {
        // 可控元件綁用state使用
        setConfirmPasswordSearch(e.target.value);
        // 搜尋用 - trim去除空白，toLowerCase轉小寫英文
        const searchConfirmPasswordWord = e.target.value.trim();
        // 傳至debounceFn中
        debounceHandleSearch(passwordPrevious, searchConfirmPasswordWord);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(forgotPasswordReviseData);

        if (!forgotPasswordReviseData.password.match(passwordRe)) {
            Swal.fire('您輸入的密碼須包含字母及數字共八位數');
            return;
        }

        if (
            forgotPasswordReviseData.confirmPassword !==
            forgotPasswordReviseData.password
        ) {
            Swal.fire('密碼與確認密碼需要一致');
            return;
        }

        fetch(FORGOT_PASSWORD_REVISE, {
            method: 'POST',
            body: JSON.stringify(forgotPasswordReviseData),
            headers: {
                'Content-Type': 'application/json',
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
                } else {
                    Swal.fire(result.error);
                }
            });
    };
    useEffect(() => {
        // console.log({
        //     account: accountPrevious,
        //     password: passwordPrevious,
        //     confirmPassword: confirmPasswordPrevious,
        // });
        setForgotPasswordReviseData({
            account: accountPrevious,
            password: passwordPrevious,
            confirmPassword: confirmPasswordPrevious,
        });
    }, [accountPrevious, passwordPrevious, confirmPasswordPrevious]);

    return (
        <>
            {authorized ? (
                <></>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <section
                                className="pb-4 justify-content-center memberBgCard rounded-5"
                                style={{ backgroundColor: theme.memberBgCard }}
                            >
                                <section className="w-100 p-4 d-flex justify-content-center pb-4 ">
                                    <div className="tab-content">
                                        <form
                                            name="form1"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="mb-3 d-flex justify-content-center page-title">
                                                修改密碼
                                            </div>
                                            <br />
                                            <div className="mb-3 page-field">
                                                <label
                                                    htmlFor="account"
                                                    className="form-label"
                                                >
                                                    帳戶名稱
                                                </label>
                                                <InputIME
                                                    type="text"
                                                    className="form-control"
                                                    id="account"
                                                    name="account"
                                                    placeholder="請輸入您註冊過的帳戶"
                                                    onChange={
                                                        handlePasswordChange
                                                    }
                                                    passwordPrevious={
                                                        passwordPrevious
                                                    }
                                                    setAccountPrevious={
                                                        setAccountPrevious
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
                                            <div className="mb-3 page-field">
                                                <label
                                                    htmlFor="password"
                                                    className="form-label"
                                                >
                                                    新密碼
                                                </label>
                                                <InputIME
                                                    type={passwordFieldType}
                                                    className={`form-control ${validationCssClassname2}`}
                                                    name="password"
                                                    placeholder="請輸入您的新密碼"
                                                    onChange={
                                                        handlePasswordChange
                                                    }
                                                    passwordPrevious={
                                                        passwordPrevious
                                                    }
                                                    setAccountPrevious={
                                                        setAccountPrevious
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
                                            <div className="mb-3 page-field">
                                                <label
                                                    htmlFor="password"
                                                    className="form-label"
                                                >
                                                    確認新密碼
                                                </label>
                                                <InputIME
                                                    type={
                                                        confirmPasswordFieldType
                                                    }
                                                    className={`form-control ${validationCssClassname3}`}
                                                    id="password"
                                                    name="password"
                                                    placeholder="請再輸入一次您的新密碼"
                                                    onChange={
                                                        handlePasswordChange
                                                    }
                                                    passwordPrevious={
                                                        passwordPrevious
                                                    }
                                                    setAccountPrevious={
                                                        setAccountPrevious
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

                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn-member btn-member-l btn-member-pri btn-member-outline-light"
                                                >
                                                    確認修改
                                                </button>
                                            </div>
                                            <br />
                                            <br />
                                            <div className="d-flex justify-content-center ">
                                                <Link
                                                    className="link"
                                                    to="/login"
                                                >
                                                    想起密碼了，直接登入
                                                </Link>
                                            </div>
                                            <br />
                                            <div className="d-flex justify-content-center ">
                                                <Link
                                                    className="link"
                                                    to="/register"
                                                >
                                                    重新註冊
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </section>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ForgotPasswordReviseForm;
