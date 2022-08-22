import './style.scss';
import Swal from 'sweetalert2';
import soulIconAlert from '../../images/sweetalert2/outline_soul_alert.svg';

import { useState, useContext, useCallback, useEffect } from 'react';
import InputIME from './/components/InputIME';
import _ from 'lodash';

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

    const [fillPasswordData, setFillPasswordData] = useState({
        currentPassword: 'Day0824',
        password: 'Day0824',
        confirmPassword: 'Day0824',
    });

    const [currentPasswordFieldType, setCurrentPasswordFieldType] =
        useState('password');
    const [passwordFieldType, setPasswordFieldType] = useState('password');
    const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
        useState('password');

    const { theme, themeContext } = useContext(ThemeContext);
    const { authorized, setAuth, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [currentPasswordPrevious, setCurrentPasswordPrevious] = useState('');
    const [passwordPrevious, setPasswordPrevious] = useState('');
    const [confirmPasswordPrevious, setConfirmPasswordPrevious] = useState('');
    const [passwordSearch, setPasswordSearch] = useState('');
    const [confrimPasswordSearch, setConfirmPasswordSearch] = useState('');

    const [validationCssClassname2, setValidationCssClassname2] = useState('');
    const [validationCssClassname3, setValidationCssClassname3] = useState('');
    const [validationCssClassname4, setValidationCssClassname4] = useState('');

    const [isAutoFill, setIsAutoFill] = useState(false);

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
            setValidationCssClassname2('');
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

        Swal.fire({
            title: '是否確認修改密碼',
            imageUrl: soulIconAlert,
            imageHeight: 50,
            imageWidth: 50,
            confirmButtonText: '確認修改',
            showDenyButton: true,
            denyButtonText: '取消',
        }).then((result) => {
            if (result.isConfirmed) {
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
                            Swal.fire({
                                title: '修改成功',
                                html: `<h4>請重新登入</h4>`,
                                timer: 1000,
                            });
                            localStorage.removeItem('auth');
                            setAuth({
                                ...result.data,
                                // authorized: true,
                            });
                            navigate('/login');
                        } else {
                            Swal.fire(result.error);
                            return;
                        }
                    });
            } else if (result.isDenied) {
                Swal.fire('密碼未修改');
                return;
            }
        });

        // fetch(MEMBER_PASSWORD_REVISE, {
        //     method: 'POST',
        //     body: JSON.stringify(newPasswordName),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${token}`,
        //     },
        // })
        //     .then((r) => r.json())
        //     .then((result) => {
        //         console.log(result);
        //         if (result.success) {
        //             Swal.fire({
        //                 title: '是否確認修改密碼',
        //                 imageUrl: soulIconAlert,
        //                 imageHeight: 50,
        //                 imageWidth: 50,
        //                 confirmButtonText: '確認修改',
        //                 showDenyButton: true,
        //                 denyButtonText: '取消',
        //             }).then((result) => {
        //                 if (result.isConfirmed) {
        //                     Swal.fire({
        //                         title: '修改成功',
        //                         timer: 1000,
        //                     });
        //                 } else if (result.isDenied) {
        //                 }
        //             });
        //         } else {
        //             Swal.fire(result.error);
        //         }
        //     });
    };

    useEffect(() => {
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
                                                            <form
                                                                name="form1"
                                                                onSubmit={
                                                                    handleUpdate
                                                                }
                                                            >
                                                                <div className="mb-3 d-flex justify-content-center member-page-title">
                                                                    修改我的密碼
                                                                </div>
                                                                <br />
                                                                <div className="mb-3">
                                                                    <label
                                                                        htmlFor="currentPassword"
                                                                        className="form-label member-page-field"
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
                                                                        currentPasswordPrevious={
                                                                            currentPasswordPrevious
                                                                        }
                                                                        passwordPrevious={
                                                                            passwordPrevious
                                                                        }
                                                                        confirmPasswordPrevious={
                                                                            confirmPasswordPrevious
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
                                                                        isAutoFill={
                                                                            isAutoFill
                                                                        }
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label
                                                                        htmlFor="password"
                                                                        className="form-label member-page-field"
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
                                                                        currentPasswordPrevious={
                                                                            currentPasswordPrevious
                                                                        }
                                                                        passwordPrevious={
                                                                            passwordPrevious
                                                                        }
                                                                        confirmPasswordPrevious={
                                                                            confirmPasswordPrevious
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
                                                                        isAutoFill={
                                                                            isAutoFill
                                                                        }
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label
                                                                        htmlFor="confirmPassword"
                                                                        className="form-label member-page-field"
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
                                                                        currentPasswordPrevious={
                                                                            currentPasswordPrevious
                                                                        }
                                                                        passwordPrevious={
                                                                            passwordPrevious
                                                                        }
                                                                        confirmPasswordPrevious={
                                                                            confirmPasswordPrevious
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
                                                                        isAutoFill={
                                                                            isAutoFill
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
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </section>
                                                </section>
                                            </div>
                                        </div>
                                        <div
                                            className="member-login-auto-fill"
                                            onClick={() => {
                                                // setForgotPasswordReviseData(
                                                //     fillPasswordData
                                                // );
                                                // console.log(fillPasswordData);
                                                setIsAutoFill(true);
                                                setCurrentPasswordPrevious(
                                                    fillPasswordData.currentPassword
                                                );
                                                setPasswordPrevious(
                                                    fillPasswordData.password
                                                );
                                                setConfirmPasswordPrevious(
                                                    fillPasswordData.confirmPassword
                                                );
                                                console.log(
                                                    currentPasswordPrevious
                                                );
                                                console.log(passwordPrevious);
                                                console.log(
                                                    confirmPasswordPrevious
                                                );
                                            }}
                                        ></div>
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
