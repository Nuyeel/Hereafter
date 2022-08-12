import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Swal from 'sweetalert2';
// import OutlineSoul from '../../images/sweetalert2/outline_soul.svg';
import OutlineSoulAlert from '../../images/sweetalert2/outline_soul_alert.svg';

import { CgClose } from 'react-icons/cg';
import DeedSoul from './components/Icons/DeedSoul';
import { AiFillPlusCircle } from 'react-icons/ai';

import {
    API_SHAREWALL_POST,
    STATIC_SHAREWALL_AVA,
} from '../../config/ajax-path';

// Context
import AuthContext from '../../context/AuthContext/AuthContext';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';

import './ShareWallPost.scss';

// FIXME: 假資料
const fakeAvatarDetail =
    '眼睛x2 / 精靈耳x2 / 膚色：粉色 / 貓尾 / 眼睛x2 / 精靈耳x2 / 膚色：粉色 / 貓尾 / 眼睛x2 / 精靈耳x2 / 膚色：粉色 / 貓尾 / 眼睛x2 / 精靈耳x2 / 膚色：粉色 / 貓尾';
const fakePrice = 3500;
const fakeAvatarSid = 5;

function ShareWallPost(props) {
    const { pageName } = props;

    const { authorized, sid, account, token } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const { setHeader } = useContext(HeaderContext);

    const avatarTitleInputRef = useRef();
    const avatarTagInputRef_1 = useRef();
    const avatarTagInputRef_2 = useRef();
    const avatarTagInputRef_3 = useRef();
    const avatarTextareaRef = useRef();

    const [avatarTitleInputString, setAvatarTitleInputString] = useState('');
    const [avatarTagInputString_1, setAvatarTagInputString_1] = useState('');
    const [avatarTagInputString_2, setAvatarTagInputString_2] = useState('');
    const [avatarTagInputString_3, setAvatarTagInputString_3] = useState('');
    const [avatarTextareaString, setAvatarTextareaString] = useState('');

    const navigate = useNavigate();

    const handleAvatarTitleInputChange = (e) => {
        // console.log(e.target.value);
        const trimmedString = e.target.value.trim();
        setAvatarTitleInputString(trimmedString);
    };

    const handleAvatarTagInput_1Change = (e) => {
        // console.log(e.target.value);
        const trimmedString = e.target.value.trim();
        setAvatarTagInputString_1(trimmedString);
    };

    const handleAvatarTagInput_2Change = (e) => {
        // console.log(e.target.value);
        const trimmedString = e.target.value.trim();
        setAvatarTagInputString_2(trimmedString);
    };

    const handleAvatarTagInput_3Change = (e) => {
        // console.log(e.target.value);
        const trimmedString = e.target.value.trim();
        setAvatarTagInputString_3(trimmedString);
    };

    const handleAvatarTextareaChange = (e) => {
        // console.log(e.target.value);
        const trimmedString = e.target.value.trim();
        setAvatarTextareaString(trimmedString);
    };

    // FIXME: avatar sid 要從資料庫來
    const axiosPostPOST = async () => {
        const result = await axios(API_SHAREWALL_POST, {
            method: 'POST',
            data: {
                sharePostAvatarSid: fakeAvatarSid,
                sharePostTitle: avatarTitleInputString,
                sharePostTag_1: avatarTagInputString_1,
                sharePostTag_2: avatarTagInputString_2,
                sharePostTag_3: avatarTagInputString_3,
                sharePostTextarea: avatarTextareaString,
            },
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(result.data);
    };

    const handleSharePostSubmit = async () => {
        // console.log('Title', avatarTitleInputString);
        // console.log('Tag 1', avatarTagInputString_1);
        // console.log('Tag 2', avatarTagInputString_2);
        // console.log('Tag 3', avatarTagInputString_3);
        // console.log('Textarea', avatarTextareaString);

        // TODO: 欄位檢查有空再做
        // Tag 可以為空 不用檢查
        // 文章內容應該也不用審查
        if (avatarTitleInputString.trim() === '') {
            return Swal.fire({
                title: '請為形象取一個名字',
                imageUrl: OutlineSoulAlert,
                imageHeight: 50,
                imageWidth: 50,
                showConfirmButton: false,
            });
        }
        axiosPostPOST();
    };

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, [pageName, setHeader]);

    return (
        <>
            <div
                className="container cpl-post-card-container d-flex justify-content-center align-items-center"
                style={{ color: theme.cHeader }}
            >
                <div
                    className={`cpl-post-card-body ${
                        theme.title === 'light'
                            ? 'cpl-pcb-box-shadow-light'
                            : 'cpl-pcb-box-shadow-dark'
                    } d-flex flex-column flex-lg-row mx-0 px-0`}
                    style={{ backgroundColor: theme.bgcMainDiv }}
                >
                    <div className="col-lg-6 cpl-pcb-inner-avatar-area">
                        {/* FIXME: 圖片看要怎麼來 從客製化過來的 */}
                        {/* TODO: 在 sweetAlert2 中放 swiper??? */}
                        {/* 不然進來不會有圖 */}
                        {/* 目前拉的是會員 sid 那張 */}
                        <img
                            src={`${STATIC_SHAREWALL_AVA}${sid}.png`}
                            alt=""
                            className="cpl-pcb-avatar"
                        />
                        <div
                            className="cpl-pcb-af-round"
                            style={{
                                borderColor: theme.bcAvatarFrame,
                            }}
                        />
                        <div
                            className="cpl-pcb-af-square"
                            style={{
                                borderColor: theme.bcAvatarFrame,
                            }}
                        />
                        {/* FIXME: 先用假資料 */}
                        <div className="container cpl-pcb-inner-avatar-info">
                            <p className="cpl-ivi-title">形象詳情</p>
                            {/* FIXME: onClick 要跳出東西 */}
                            <p className="cpl-ivi-detail">
                                {fakeAvatarDetail.length >= 35 ? (
                                    <>
                                        {fakeAvatarDetail.slice(0, 35)}{' '}
                                        <span
                                            className="cpl-ivi-d-more"
                                            onClick={() => {
                                                alert('施工中');
                                            }}
                                        >
                                            ...更多
                                        </span>
                                    </>
                                ) : (
                                    fakeAvatarDetail
                                )}
                            </p>
                            <div className="cpl-pcb-ivi-interaction-area d-flex justify-content-center align-items-center">
                                {/* TODO: 怎麼換顏色？ */}
                                {/* DONE: 自製成 Component */}
                                <DeedSoul
                                    fillColor={theme.cHeader}
                                    strokeColor={theme.cHeader}
                                />
                                <p className="cpl-pcb-ivi-ia-price px-2">
                                    {fakePrice}
                                </p>
                                <AiFillPlusCircle
                                    className="cpl-pcb-ivi-ia-AiFillPlusCircle"
                                    onClick={() => {
                                        // FIXME: 這裡要去一鍵套用
                                        // FIXME: 根據是不是現有的形象做條件渲染
                                        alert('施工中');
                                    }}
                                />
                                {theme.title === 'dark' ? (
                                    <div className="cpl-pcb-ivi-ia-AiFillPlusCircle-filler"></div>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="container col-lg-6 cpl-pcb-inner-text-area">
                        <div className="cpl-pcb-ita-title-area isPost">
                            {/* TODO: onChange and current.value */}
                            <input
                                className={`cpl-pcb-ita-ta-avatar-title-input ${
                                    theme.title === 'light'
                                        ? 'theme-light'
                                        : 'theme-dark'
                                }`}
                                style={{
                                    color: theme.cHeader,
                                    borderBottomColor: theme.cHeader,
                                }}
                                placeholder="請輸入形象名稱"
                                maxLength="6"
                                name="sharePostTitle"
                                ref={avatarTitleInputRef}
                                value={avatarTitleInputString}
                                onChange={handleAvatarTitleInputChange}
                            />
                        </div>
                        <div className="cpl-pcb-ita-text-heading d-flex justify-content-between align-items-center">
                            <div className="cpl-pcb-ita-th-inner-left d-flex align-items-center">
                                <div className="cpl-pcb-ita-th-il-mh-area">
                                    {/* FIXME: 這圖是啥 */}
                                    <img
                                        className="cpl-pcb-ita-th-il-mh-memberhead"
                                        src={`${STATIC_SHAREWALL_AVA}${sid}.png`}
                                        alt=""
                                    />
                                </div>
                                <p className="cpl-pcb-ita-th-il-account">
                                    {account}
                                </p>
                            </div>
                        </div>

                        <div
                            className="cpl-pcb-ita-text-content-area"
                            style={{ borderColor: theme.cHeader }}
                        >
                            <div className="cpl-pcb-ita-ta-inner-tags isPost d-flex">
                                <input
                                    className="cpl-pcb-ita-ta-it-tag-item isPost flex-shrink-0"
                                    placeholder="#標籤一"
                                    maxLength="6"
                                    name="sharePostTag_1"
                                    ref={avatarTagInputRef_1}
                                    value={avatarTagInputString_1}
                                    onChange={handleAvatarTagInput_1Change}
                                />
                                <input
                                    className="cpl-pcb-ita-ta-it-tag-item isPost flex-shrink-0"
                                    placeholder="#標籤二"
                                    maxLength="6"
                                    name="sharePostTag_2"
                                    ref={avatarTagInputRef_2}
                                    value={avatarTagInputString_2}
                                    onChange={handleAvatarTagInput_2Change}
                                />
                                <input
                                    className="cpl-pcb-ita-ta-it-tag-item isPost flex-shrink-0"
                                    placeholder="#標籤三"
                                    maxLength="6"
                                    name="sharePostTag_3"
                                    ref={avatarTagInputRef_3}
                                    value={avatarTagInputString_3}
                                    onChange={handleAvatarTagInput_3Change}
                                />
                            </div>
                            <div className="cpl-pcb-ita-text-content isPost">
                                <textarea
                                    className={`cpl-pcb-ita-tc-isPost-textarea  ${
                                        theme.title === 'light'
                                            ? 'theme-light'
                                            : 'theme-dark'
                                    }`}
                                    placeholder="我想說..."
                                    maxLength="168"
                                    name="sharePostTextarea"
                                    ref={avatarTextareaRef}
                                    value={avatarTextareaString}
                                    onChange={handleAvatarTextareaChange}
                                ></textarea>
                                {/* 這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊這邊寫文文啊 */}
                            </div>
                        </div>
                        <div className="cpl-pcb-ita-save-button-area d-flex justify-content-end">
                            <button
                                className="cpl-pcb-ita-sba-save-button"
                                onClick={handleSharePostSubmit}
                            >
                                保存
                            </button>
                        </div>
                    </div>
                    <CgClose
                        className="cpl-pcb-close-icon"
                        onClick={() => {
                            // ASK: navigate(-1)
                            navigate(-1);
                            // navigate('/sharewall', { replace: true });
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default ShareWallPost;
