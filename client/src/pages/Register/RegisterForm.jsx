import './style.scss';
import { useState, useContext } from 'react';
import axios from 'axios';

import { MEMBER_REGISTER } from '../../config/ajax-path';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RegisterForm() {
    const [fields, setFields] = useState({
        email: '',
        account: '',
        password: '',
        confirmPassword: '',
    });

    const [passwordFieldType, setPasswordFieldType] = useState('password');

    const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
        useState('password');

    const themeContext = useContext(ThemeContext);
    const { authorized, setAuth, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleFieldsChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value,
        });
        // const id = e.target.id;
        // const val = e.target.value;
        // // console.log({ id, val });
        // setFields((prevState) => ({
        //     ...prevState,
        //     [id]: val,
        // }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (fields.confirmPassword !== fields.password) {
            alert('密碼與確認密碼需要一致');
            return;
        }

        const { confirmPassword, ...registerFields } = fields;

        const result = await axios(MEMBER_REGISTER, {
            method: 'POST',
            data: JSON.stringify(fields),
            headers: {
                'Content-Type': 'Application/json',
            },
        });

        // const res = await axios.post('api/users', registerFields);

        // console.log(res);

        // if (result.data.message === 'success') {
        //     // 2s後再跳訊息
        //     setTimeout(() => {
        //         alert('註冊完成');
        //     }, 2000);
        // } else {
        //     alert('有錯誤');
        // }

        // TODO: 欄位檢查

        // 請注意 axios 和 fetch 的不同之處
        // fetch 要多轉換一次 .then(r => r.json())
        // fetch 的內容放在 body: fd
        // axios 會自動轉換 JSON 但結果放在 r.data 中
        // axios 的內容要放在 data: fd
        // const result = await axios(MEMBER_REGISTER, {
        //     method: 'POST',
        //     data: JSON.stringify(fields),
        //     headers: {
        //         'Content-Type': 'Application/json',
        //     },
        // });

        // console.log(result.data);

        if (result.data.success) {
            localStorage.setItem('auth', JSON.stringify(result.data.data));
            setAuth({ ...result.data.data, authorized: true });
            navigate('/');
        } else {
            alert('操作錯誤');
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <section className="pb-4">
                            <div className="bg-white bg-opacity-75 rounded-5">
                                <section className="w-100 p-4 d-flex justify-content-center pb-4">
                                    <div>
                                        <div className="tab-content">
                                            <form
                                                name="form1"
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="mb-3 d-flex justify-content-center page-title">
                                                    會員註冊
                                                </div>
                                                <br />
                                                <div className="mb-3 page-field">
                                                    <label
                                                        htmlFor="account"
                                                        className="form-label"
                                                    >
                                                        帳戶名稱
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="account"
                                                        placeholder="請建立一個登入帳戶"
                                                        value={fields.account}
                                                        onChange={
                                                            handleFieldsChange
                                                        }
                                                        required
                                                    />
                                                    <div className="form-text red"></div>
                                                </div>
                                                <div className="mb-3 page-field">
                                                    <label
                                                        htmlFor="email"
                                                        className="form-label"
                                                    >
                                                        電子信箱
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        name="email"
                                                        placeholder="請輸入一個有效信箱"
                                                        value={fields.email}
                                                        onChange={
                                                            handleFieldsChange
                                                        }
                                                        required
                                                    />
                                                    <div className="form-text red"></div>
                                                </div>
                                                <div className="mb-3 page-field">
                                                    <label
                                                        htmlFor="password"
                                                        className="form-label"
                                                    >
                                                        登入密碼
                                                    </label>
                                                    <input
                                                        type={passwordFieldType}
                                                        className="form-control"
                                                        name="password"
                                                        placeholder="請建立一個密碼"
                                                        value={fields.password}
                                                        onChange={
                                                            handleFieldsChange
                                                        }
                                                        required
                                                    />
                                                    <div className="form-text red"></div>
                                                </div>
                                                <div className="mb-3 page-field">
                                                    <label
                                                        htmlFor="confirmPassword"
                                                        className="form-label"
                                                    >
                                                        重新輸入密碼
                                                    </label>
                                                    <input
                                                        type={
                                                            confirmPasswordFieldType
                                                        }
                                                        className="form-control"
                                                        name="confirmPassword"
                                                        placeholder="再輸入一次密碼"
                                                        value={
                                                            fields.confirmPassword
                                                        }
                                                        onChange={
                                                            handleFieldsChange
                                                        }
                                                        required
                                                    />
                                                    <div className=" form-text red"></div>
                                                </div>
                                                {/* 
                                                    <div className="text-center mb-3">
                                                        <p>以其他方式註冊：</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-link btn-floating mx-1"
                                                        >
                                                            <i className="fab fa-facebook-f"></i>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-link btn-floating mx-1"
                                                        >
                                                            <i className="fab fa-google"></i>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-link btn-floating mx-1"
                                                        >
                                                            <i className="fab fa-twitter"></i>
                                                        </button>
                                                    </div> 
                                                    */}

                                                <div className="d-flex justify-content-center ">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-l btn-pri btn-outline-light "
                                                        onClick={() => {
                                                            setConfirmPasswordFieldType(
                                                                confirmPasswordFieldType ===
                                                                    'text'
                                                                    ? 'password'
                                                                    : 'text'
                                                            );
                                                        }}
                                                    >
                                                        確認註冊
                                                    </button>
                                                </div>
                                                <br />
                                                <div className="d-flex justify-content-center ">
                                                    <Link
                                                        className="link"
                                                        to="/login"
                                                    >
                                                        已註冊，直接登入
                                                    </Link>
                                                </div>
                                                <br />
                                            </form>
                                            <div
                                                id="info-bar"
                                                className="alert alert-success d-flex justify-content-center"
                                                role="alert"
                                            >
                                                您已成功完成註冊
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterForm;
