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
        passcode: '',
        password: '',
        confirmPassword: '',
    });

    const [fillPasswordData, setFillPasswordData] = useState({
        passcode: ' ',
        password: 'Day0824',
        confirmPassword: 'Day0824',
    });

    const [passwordFieldType, setPasswordFieldType] = useState('password');
    const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
        useState('password');

    const { theme, themeContext } = useContext(ThemeContext);
    const { authorized, setAuth, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [passcodePrevious, setPasscodePrevious] = useState('');
    const [passwordPrevious, setPasswordPrevious] = useState('');
    const [confirmPasswordPrevious, setConfirmPasswordPrevious] = useState('');

    const [passcodeSearch, setPasscodeSearch] = useState('');
    const [passwordSearch, setPasswordSearch] = useState('');
    const [confrimPasswordSearch, setConfirmPasswordSearch] = useState('');

    const [validationCssClassname, setValidationCssClassname] = useState('');
    const [validationCssClassname2, setValidationCssClassname2] = useState('');
    const [validationCssClassname3, setValidationCssClassname3] = useState('');

    const [isAutoFill, setIsAutoFill] = useState(false);

    const passwordRe = /^[a-zA-Z0-9_]\w*.{6,}$/;

    // 驗證碼
    const handlePasscodeSearch = (searchPasscodeWord) => {
        // 初始狀態設為空
        if (!searchPasscodeWord) {
            setValidationCssClassname('');
            return;
        }
    };

    // 設定300毫秒後做欄位檢查
    const debounceHandleSearch = useCallback(
        _.debounce(handlePasscodeSearch, 300),
        []
    );

    const handlePasscodeChange = (e) => {
        // 可控元件綁用state使用
        setPasscodeSearch(e.target.value);
        // 搜尋用 - trim去除空白，toLowerCase轉小寫英文
        const searchPasscodeWord = e.target.value.trim().toLowerCase();
        // 傳至debounceFn中
        debounceHandleSearch(searchPasscodeWord);
    };

    // 密碼檢查
    const handlePasswordSearch = (searchPasswordWord) => {
        // 初始狀態設為空
        if (!searchPasswordWord) {
            setValidationCssClassname2('');
            return;
        }
        // // 即時驗證欄位條件
        if (searchPasswordWord.match(passwordRe)) {
            setValidationCssClassname2('');
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
            setValidationCssClassname3('');
        } else {
            setValidationCssClassname3('is-invalid');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(forgotPasswordReviseData);

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
                    Swal.fire(result.error);
                    navigate('/login');
                } else {
                    Swal.fire(result.error);
                }
            });
    };

    useEffect(() => {
        setForgotPasswordReviseData({
            passcode: passcodePrevious,
            password: passwordPrevious,
            confirmPassword: confirmPasswordPrevious,
        });
    }, [passcodePrevious, passwordPrevious, confirmPasswordPrevious]);

    return (
        <>
            {authorized ? (
                <></>
            ) : (
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
                                            setPasscodePrevious(
                                                fillPasswordData.passcode
                                            );
                                            setPasswordPrevious(
                                                fillPasswordData.password
                                            );
                                            setConfirmPasswordPrevious(
                                                fillPasswordData.confirmPassword
                                            );
                                            console.log(passcodePrevious);
                                            console.log(
                                                confirmPasswordPrevious
                                            );
                                        }}
                                    ></div>
                                    <div className="tab-content">
                                        <form
                                            name="form1"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="mb-3 d-flex justify-content-center member-page-title">
                                                修改密碼
                                            </div>
                                            <br />
                                            <div className="mb-3 member-page-field">
                                                <label
                                                    htmlFor="passcode"
                                                    className="form-label member-login-field"
                                                >
                                                    驗證碼
                                                </label>
                                                <InputIME
                                                    type="text"
                                                    className={`form-control ${validationCssClassname}`}
                                                    name="passcode"
                                                    placeholder="輸入收到的驗證碼"
                                                    onChange={
                                                        handlePasscodeChange
                                                    }
                                                    passcodePrevious={
                                                        passcodePrevious
                                                    }
                                                    passwordPrevious={
                                                        passwordPrevious
                                                    }
                                                    confirmPasswordPrevious={
                                                        confirmPasswordPrevious
                                                    }
                                                    setPasscodePrevious={
                                                        setPasscodePrevious
                                                    }
                                                    setPasswordPrevious={
                                                        setPasswordPrevious
                                                    }
                                                    setConfirmPasswordPrevious={
                                                        setConfirmPasswordPrevious
                                                    }
                                                    // isAutoFill={isAutoFill}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3 member-page-field">
                                                <label
                                                    htmlFor="password"
                                                    className="form-label member-login-field"
                                                >
                                                    新密碼
                                                </label>
                                                <InputIME
                                                    type={passwordFieldType}
                                                    className={`form-control ${validationCssClassname2}`}
                                                    name="password"
                                                    placeholder="輸入您的新密碼"
                                                    onChange={
                                                        handlePasswordChange
                                                    }
                                                    passcodePrevious={
                                                        passcodePrevious
                                                    }
                                                    passwordPrevious={
                                                        passwordPrevious
                                                    }
                                                    confirmPasswordPrevious={
                                                        confirmPasswordPrevious
                                                    }
                                                    setPasscodePrevious={
                                                        setPasscodePrevious
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
                                                    確認新密碼
                                                </label>
                                                <InputIME
                                                    type={
                                                        confirmPasswordFieldType
                                                    }
                                                    className={`form-control ${validationCssClassname3}`}
                                                    name="confirmPassword"
                                                    placeholder="再輸入一次新密碼"
                                                    onChange={
                                                        handleConfirmPasswordChange
                                                    }
                                                    passcodePrevious={
                                                        passcodePrevious
                                                    }
                                                    passwordPrevious={
                                                        passwordPrevious
                                                    }
                                                    confirmPasswordPrevious={
                                                        confirmPasswordPrevious
                                                    }
                                                    setPasscodePrevious={
                                                        setPasscodePrevious
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
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn-member btn-member-l btn-member-pri btn-member-outline-light"
                                                >
                                                    確認修改
                                                </button>
                                            </div>
                                            <br />
                                            <div className="d-flex justify-content-center ">
                                                <Link
                                                    className="member-link"
                                                    to="/login"
                                                >
                                                    想起密碼了，直接登入
                                                </Link>
                                            </div>
                                            <br />
                                            <div className="d-flex justify-content-center ">
                                                <Link
                                                    className="member-link"
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
