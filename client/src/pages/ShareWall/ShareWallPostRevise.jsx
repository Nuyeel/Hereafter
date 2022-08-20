import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

import Swal from 'sweetalert2';
import OutlineSoul from '../../images/sweetalert2/outline_soul.svg';
import OutlineSoulAlert from '../../images/sweetalert2/outline_soul_alert.svg';

import { CgClose } from 'react-icons/cg';
import DeedSoul from './components/Icons/DeedSoul';
import { AiFillPlusCircle } from 'react-icons/ai';

import {
    API_SHAREWALL,
    STATIC_SHAREWALL_AVATAR,
    API_SHAREWALL_AVATARCHANGE_GET,
} from '../../config/ajax-path';

// Context
import AuthContext from '../../context/AuthContext/AuthContext';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';

import './ShareWallPost.scss';

function ShareWallPostRevise(props) {
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

    // FIXME: 這裡先寫得傻一點不然沒完沒了
    const [postReviseShownData, setPostReviseShownData] = useState({
        postSid: 0,
        avatarData: {
            id: 0,
            NimgName: '', // avatar 檔名
            combinationText: '', // JSON 字串 用那兩個函式處理
            avatarPrice: '', // 售價 最大四字元
        },
        userProfile: '', // 會員頭貼檔名
    });

    const navigate = useNavigate();
    const location = useLocation();
    const { sharePostID } = useParams();

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

    const axiosSharePostGET = async (sharePostID) => {
        const result = await axios.get(`${API_SHAREWALL}/${sharePostID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(result.data);

        if (result.data === '才...才沒有這篇文章呢！') {
            return navigate('/sharewall');
        }

        // 不是作者跳去分享牆首頁
        if (sid !== result.data.postResults.member_sid) {
            // FIXME: 測試時為求方便先註解
            return navigate('/sharewall', { replace: true });
        }

        // 設定文章標題
        setAvatarTitleInputString(result.data.postResults.share_post_title);

        // 設定標籤內容
        // TODO: 有空可以做成物件
        for (
            let i = 0, tagsArrayLength = result.data.postTagsResults.length;
            i < tagsArrayLength;
            i++
        ) {
            if (i === 0) {
                setAvatarTagInputString_1(
                    result.data.postTagsResults[i].share_post_tag_text
                );
            } else if (i === 1) {
                setAvatarTagInputString_2(
                    result.data.postTagsResults[i].share_post_tag_text
                );
            } else if (i === 2) {
                setAvatarTagInputString_3(
                    result.data.postTagsResults[i].share_post_tag_text
                );
            }
        }

        // 設定文章內容
        setAvatarTextareaString(result.data.postResults.share_post_text);

        // 設定登入會員頭貼與虛擬形象部分
        setPostReviseShownData({
            postSid: sharePostID,
            avatarData: {
                id: result.data.postResults.avatar_id,
                NimgName: result.data.postResults.Nimg_name,
                combinationText: result.data.postResults.combinationText,
                avatarPrice: result.data.postResults.price,
            },
            userProfile: result.data.loginUserResults.profile.img_name,
        });
    };

    // FIXME: avatar sid 要從資料庫來
    const axiosPostPUT = async () => {
        const result = await axios(
            `${API_SHAREWALL}/${sharePostID}/post_revise`,
            {
                method: 'PUT',
                data: {
                    sharePostSid: postReviseShownData.postSid,
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
            }
        );

        // console.log(result.data);

        if (
            !result.data.postUpdateResult ||
            !result.data.tagsCreateResult ||
            !result.data.postsToTagsResult
        ) {
            Swal.fire({
                title: '好像出了一點問題...',
                imageUrl: OutlineSoulAlert,
                imageHeight: 50,
                imageWidth: 50,
                showConfirmButton: false,
            });
        } else {
            Swal.fire({
                title: '文章修改成功',
                imageUrl: OutlineSoul,
                imageHeight: 50,
                imageWidth: 50,
                showConfirmButton: false,
            });
            navigate(-1);
        }
    };

    // FIXME: 這個要改
    const handleSharePostReviseSubmit = () => {
        // TODO: 欄位檢查有空再做
        // Tag 可以為空 不用檢查
        // 文章內容應該也不用審查
        if (avatarTitleInputString.trim() === '') {
            return Swal.fire({
                title: '形象名稱不可為空',
                imageUrl: OutlineSoulAlert,
                imageHeight: 50,
                imageWidth: 50,
                showConfirmButton: false,
            });
        }
        if (avatarTextareaString.trim() === '') {
            return Swal.fire({
                title: '文章內容不可為空',
                imageUrl: OutlineSoulAlert,
                imageHeight: 50,
                imageWidth: 50,
                showConfirmButton: false,
            });
        }
        axiosPostPUT();
    };

    const AvatarDetailHTMLTranslator = (avatarCombinationString) => {
        const parseData = JSON.parse(avatarCombinationString);
        // console.log(parseData);

        const combinationMap = {
            hand: '手',
            foot: '腳',
            bodyColor: '膚色',
            specialColor: '幻肢色',
            tale: '尾',
            taleColor: '尾色',
            eye: '眼',
            eyeColor: '瞳色',
            nose: '鼻',
            noseColor: '鼻色',
            hair: '髮',
            hairColor: '髮色',
            ear: '耳',
            topearColor: '獸耳色',
            lip: '嘴',
        };

        let translatedHTMLStr = '';

        for (let key in parseData) {
            if (parseData[key] !== '') {
                translatedHTMLStr += '<p>';
                translatedHTMLStr += combinationMap[key];
                translatedHTMLStr += '：';
                translatedHTMLStr += parseData[key];
                translatedHTMLStr += '</p>';
            }
        }

        return translatedHTMLStr;
    };

    const AvatarDetailTranslator = (avatarCombinationString) => {
        const parseData = JSON.parse(avatarCombinationString);
        // console.log(parseData);

        const combinationMap = {
            hand: '手',
            foot: '腳',
            bodyColor: '膚色',
            specialColor: '幻肢色',
            tale: '尾',
            taleColor: '尾色',
            eye: '眼',
            eyeColor: '瞳色',
            nose: '鼻',
            noseColor: '鼻色',
            hair: '髮',
            hairColor: '髮色',
            ear: '耳',
            topearColor: '獸耳色',
            lip: '嘴',
        };

        let translatedStr = '';

        let translatedCount = 0;

        for (let key in parseData) {
            if (parseData[key] !== '') {
                if (translatedCount !== 0) {
                    translatedStr += ' / ';
                }
                translatedStr += combinationMap[key];
                translatedStr += '：';
                translatedStr += parseData[key];
                translatedCount++;
            }
        }

        if (translatedStr.length >= 32) {
            const WithMoreJSX = (
                <>
                    {translatedStr.slice(0, 32)}{' '}
                    <span
                        className="cpl-ivi-d-more"
                        onClick={() => {
                            Swal.fire({
                                title: '形象詳情',
                                html: AvatarDetailHTMLTranslator(
                                    combinationText
                                ),
                                imageUrl: OutlineSoul,
                                imageHeight: 50,
                                imageWidth: 50,
                                showConfirmButton: false,
                            });
                        }}
                    >
                        ...更多
                    </span>
                </>
            );
            return WithMoreJSX;
        } else {
            return translatedStr;
        }
    };

    const axiosAvatarChangeGET = async () => {
        const result = await axios.get(
            `${API_SHAREWALL_AVATARCHANGE_GET}/${postReviseShownData.avatarData.id}/change`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // console.log(result.data);

        if (!result.data.success) {
            return Swal.fire({
                title: '好像出了一點問題',
                imageUrl: OutlineSoulAlert,
                imageHeight: 50,
                imageWidth: 50,
                showConfirmButton: false,
            });
        }

        axiosSharePostGET(postReviseShownData.postSid);
    };

    const axiosAvatarCombinationGET = async () => {
        const result = await axios.get(
            `${API_SHAREWALL_AVATARCHANGE_GET}/${postReviseShownData.avatarData.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // console.log(result.data);

        if (result.data === '您正使用此來生形象') {
            return Swal.fire({
                title: '您正使用相同的形象喔～',
                imageUrl: OutlineSoulAlert,
                imageHeight: 50,
                imageWidth: 50,
                showConfirmButton: false,
            });
        }

        Swal.fire({
            title: '您確定要套用這個形象嗎？',
            imageUrl: OutlineSoul,
            imageHeight: 50,
            imageWidth: 50,
            confirmButtonText: '確認',
            showDenyButton: true,
            denyButtonText: '取消',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosAvatarChangeGET();
            } else if (result.isDenied) {
                // console.log(
                //     'Sweetalert2: ',
                //     '不套用...虧了...'
                // );
            }
        });
    };

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, [pageName, setHeader]);

    // 如果不是該篇文章作者應該要彈出去
    useEffect(() => {
        // 沒登入彈出去
        if (!authorized) {
            return navigate('/', { replace: true });
        }

        // console.log(location.pathname);
        // FIXME: 可以用 useParams 其實 這裡換一種寫法
        const postSidForValidation = Number(location.pathname.slice(11, -7));

        // 亂輸入網址跳去首頁
        if (isNaN(postSidForValidation)) {
            return navigate('/', { replace: true });
        }

        // 都沒問題就抓文章內容
        axiosSharePostGET(postSidForValidation);
    }, []);

    const {
        avatarData: { NimgName, combinationText, avatarPrice },
        userProfile,
    } = postReviseShownData;

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
                        {NimgName ? (
                            <img
                                src={`${STATIC_SHAREWALL_AVATAR}${NimgName}`}
                                alt=""
                                className="cpl-pcb-avatar"
                            />
                        ) : (
                            ''
                        )}
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
                                {combinationText
                                    ? AvatarDetailTranslator(combinationText)
                                    : ''}
                            </p>
                            <div className="cpl-pcb-ivi-interaction-area d-flex justify-content-center align-items-center">
                                {/* TODO: 怎麼換顏色？ */}
                                {/* DONE: 自製成 Component */}
                                <DeedSoul
                                    fillColor={theme.cHeader}
                                    strokeColor={theme.cHeader}
                                />
                                <p className="cpl-pcb-ivi-ia-price px-2">
                                    {avatarPrice}
                                </p>
                                <AiFillPlusCircle
                                    className="cpl-pcb-ivi-ia-AiFillPlusCircle"
                                    onClick={() => {
                                        // FIXME: 這裡要去一鍵套用
                                        axiosAvatarCombinationGET();
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
                                    {userProfile ? (
                                        <img
                                            className="cpl-pcb-ita-th-il-mh-memberhead"
                                            src={`${STATIC_SHAREWALL_AVATAR}${userProfile}`}
                                            alt=""
                                        />
                                    ) : (
                                        ''
                                    )}
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
                                    maxLength="150"
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
                                onClick={handleSharePostReviseSubmit}
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

export default ShareWallPostRevise;
