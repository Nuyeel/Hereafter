import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Swal from 'sweetalert2';
import OutlineSoul from '../images/sweetalert2/outline_soul.svg';
import OutlineSoulAlert from '../images/sweetalert2/outline_soul_alert.svg';

import { HiHome } from 'react-icons/hi';
import { FiPlus } from 'react-icons/fi';
import { IoPersonCircleSharp, IoCaretDown } from 'react-icons/io5';
import { FiBookmark } from 'react-icons/fi';

import HeaderContext from '../context/HeaderContext/HeaderContext';
import ThemeContext from '../context/ThemeContext/ThemeContext';
import AuthContext from '../context/AuthContext/AuthContext';

import { API_SHAREWALL, STATIC_SHAREWALL_AVATAR } from '../config/ajax-path';

function HeaderShareWallButton() {
    const { theme } = useContext(ThemeContext);
    const {
        shareWallSearchState,
        setShareWallSearchState,
        setShareWallPostsData,
        setSearchParams,
        avatarForNewPostData,
    } = useContext(HeaderContext);
    const { authorized, token } = useContext(AuthContext);

    const navigate = useNavigate();

    // FIXME: 有空再統一放 context
    const axiosListGET = async () => {
        let axiosUrl = `${API_SHAREWALL}`;

        // 加上三態條件
        // 'default' 不用做什麼
        if (shareWallSearchState === 'isAuthor') {
            axiosUrl += '?isAuthor=true';
        } else if (shareWallSearchState === 'isCollector') {
            axiosUrl += '?isCollector=true';
        }

        const result = await axios.get(axiosUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(result.data);
        setShareWallPostsData(result.data);
    };

    // fixed or select
    const [shareWallButtonState, setShareWallButtonState] = useState('fixed');
    const [shareWallButtonData, setShareWallButtonData] = useState({
        icon: <HiHome className="cpl-hsb-bo-icon cpl-hsb-bo-HiHome" />,
        title: '　主頁　',
        caret: (
            <IoCaretDown className="cpl-hsb-bo-icon cpl-hsb-bo-IoCaretDown" />
        ),
    });

    const shareWallButtonMapDisplayObj = {
        default: {
            icon: <HiHome className="cpl-hsb-bo-icon cpl-hsb-bo-HiHome" />,
            title: '　主頁　',
            caret: (
                <IoCaretDown className="cpl-hsb-bo-icon cpl-hsb-bo-IoCaretDown" />
            ),
        },
        isAuthor: {
            icon: (
                <IoPersonCircleSharp className="cpl-hsb-bo-icon cpl-hsb-bo-IoPersonCircleSharp" />
            ),
            title: '個人主頁',
            caret: (
                <IoCaretDown className="cpl-hsb-bo-icon cpl-hsb-bo-IoCaretDown" />
            ),
        },
        isCollector: {
            icon: (
                <FiBookmark className="cpl-hsb-bo-icon cpl-hsb-bo-FiBookmark" />
            ),
            title: '我的收藏',
            caret: (
                <IoCaretDown className="cpl-hsb-bo-icon cpl-hsb-bo-IoCaretDown" />
            ),
        },
    };

    const ShareWallButtonSelectOptionArray = [
        {
            icon: <HiHome className="cpl-hsb-bo-icon cpl-hsb-bo-HiHome" />,
            title: '　主頁　',
            caret: (
                <IoCaretDown className="cpl-hsb-bo-icon cpl-hsb-bo-IoCaretDown invisible" />
            ),
            onClick: (e) => {
                e.preventDefault();
                const newSWSS = 'default';
                // console.log(newSWSS);
                setShareWallSearchState(newSWSS);
                navigate('/sharewall');
            },
        },
        {
            icon: (
                <IoPersonCircleSharp className="cpl-hsb-bo-icon cpl-hsb-bo-IoPersonCircleSharp" />
            ),
            title: '個人主頁',
            caret: (
                <IoCaretDown className="cpl-hsb-bo-icon cpl-hsb-bo-IoCaretDown invisible" />
            ),
            onClick: (e) => {
                e.preventDefault();
                if (!authorized) {
                    return Swal.fire({
                        title: '請先登入',
                        imageUrl: OutlineSoulAlert,
                        imageHeight: 50,
                        imageWidth: 50,
                        showConfirmButton: false,
                    });
                }
                const newSWSS = 'isAuthor';
                // console.log(newSWSS);
                setShareWallSearchState(newSWSS);
                navigate('/sharewall');
            },
        },
        {
            icon: (
                <FiBookmark className="cpl-hsb-bo-icon cpl-hsb-bo-FiBookmark" />
            ),
            title: '我的收藏',
            caret: (
                <IoCaretDown className="cpl-hsb-bo-icon cpl-hsb-bo-IoCaretDown invisible" />
            ),
            onClick: (e) => {
                e.preventDefault();
                if (!authorized) {
                    return Swal.fire({
                        title: '請先登入',
                        imageUrl: OutlineSoulAlert,
                        imageHeight: 50,
                        imageWidth: 50,
                        showConfirmButton: false,
                    });
                }
                const newSWSS = 'isCollector';
                // console.log(newSWSS);
                setShareWallSearchState(newSWSS);
                // 網址列不換了 但是要顯示會員收藏的內容
                // 發 Axios 要內容
                navigate('/sharewall');
            },
        },
        {
            icon: <FiPlus className="cpl-hsb-bo-icon cpl-hsb-bo-FiPlus" />,
            title: '新增貼文',
            caret: (
                <IoCaretDown className="cpl-hsb-bo-icon cpl-hsb-bo-IoCaretDown invisible" />
            ),
            onClick: (e) => {
                e.preventDefault();
                if (!authorized) {
                    return Swal.fire({
                        title: '請先登入',
                        imageUrl: OutlineSoulAlert,
                        imageHeight: 50,
                        imageWidth: 50,
                        showConfirmButton: false,
                    });
                }
                // console.log('avatar 1', avatarForNewPostData[0].img_name);
                // console.log('avatar 2', avatarForNewPostData[1].img_name);
                // console.log('avatar 3', avatarForNewPostData[2].img_name);
                // console.log('avatar 4', avatarForNewPostData[3].img_name);
                // console.log('avatar 5', avatarForNewPostData[4].img_name);
                Swal.fire({
                    title: '請選擇您想分享的來生形象',
                    html: `
                        <div class="cpl-swal-sharewall-newpostpopup-display d-flex">
                            <div class="cpl-swal-snd-card" id="cplSwalSndCard1">
                                <img class="apl-swal-snd-c-img" src="${STATIC_SHAREWALL_AVATAR}${avatarForNewPostData[0].img_name}" alt="" onclick="document.querySelectorAll('.cpl-swal-snd-card').forEach((v, i) => {if (v.classList.contains('isActive')) {v.classList.remove('isActive')}}); document.querySelector('#cplSwalSndCard1').classList.add('isActive');" />
                            </div>
                            <div class="cpl-swal-snd-card" id="cplSwalSndCard2">
                                <img class="apl-swal-snd-c-img" src="${STATIC_SHAREWALL_AVATAR}${avatarForNewPostData[1].img_name}" alt="" onclick="document.querySelectorAll('.cpl-swal-snd-card').forEach((v, i) => {if (v.classList.contains('isActive')) {v.classList.remove('isActive')}}); document.querySelector('#cplSwalSndCard2').classList.add('isActive');" />
                            </div>
                            <div class="cpl-swal-snd-card" id="cplSwalSndCard3">
                                <img class="apl-swal-snd-c-img" src="${STATIC_SHAREWALL_AVATAR}${avatarForNewPostData[2].img_name}" alt="" onclick="document.querySelectorAll('.cpl-swal-snd-card').forEach((v, i) => {if (v.classList.contains('isActive')) {v.classList.remove('isActive')}}); document.querySelector('#cplSwalSndCard3').classList.add('isActive');" />
                            </div>
                            <div class="cpl-swal-snd-card" id="cplSwalSndCard4">
                                <img class="apl-swal-snd-c-img" src="${STATIC_SHAREWALL_AVATAR}${avatarForNewPostData[3].img_name}" alt="" onclick="document.querySelectorAll('.cpl-swal-snd-card').forEach((v, i) => {if (v.classList.contains('isActive')) {v.classList.remove('isActive')}}); document.querySelector('#cplSwalSndCard4').classList.add('isActive');" />
                            </div>
                            <div class="cpl-swal-snd-card" id="cplSwalSndCard5">
                                <img class="apl-swal-snd-c-img" src="${STATIC_SHAREWALL_AVATAR}${avatarForNewPostData[4].img_name}" alt="" onclick="document.querySelectorAll('.cpl-swal-snd-card').forEach((v, i) => {if (v.classList.contains('isActive')) {v.classList.remove('isActive')}}); document.querySelector('#cplSwalSndCard5').classList.add('isActive');" />
                            </div>
                        </div>
                    `,
                    imageUrl: OutlineSoul,
                    imageHeight: 50,
                    imageWidth: 50,
                    confirmButtonText: '來去分享',
                    showDenyButton: true,
                    denyButtonText: '突然好累',
                    didOpen: () => {
                        Swal.disableButtons();
                        document
                            .querySelectorAll('.cpl-swal-snd-card')
                            .forEach((v, i) => {
                                v.addEventListener('click', () => {
                                    if (
                                        !document.querySelector(
                                            '.cpl-swal-snd-card.isActive'
                                        )
                                    ) {
                                        Swal.disableButtons();
                                    } else {
                                        Swal.enableButtons();
                                    }
                                });
                            });
                    },
                    preConfirm: () => ({
                        chosenAvatarID:
                            avatarForNewPostData[
                                Number(
                                    document
                                        .querySelector(
                                            '.cpl-swal-snd-card.isActive'
                                        )
                                        .id.slice(-1)
                                ) - 1
                            ].avatar_id,
                    }),
                }).then((result) => {
                    if (result.isConfirmed) {
                        // console.log(result.value);
                        navigate(
                            `/sharewall/post/${result.value.chosenAvatarID}`
                        );
                    } else if (result.isDenied) {
                        return Swal.fire({
                            title: '期待您的分享',
                            imageUrl: OutlineSoul,
                            imageHeight: 50,
                            imageWidth: 50,
                            showConfirmButton: false,
                        });
                        // console.log(
                        //     'Sweetalert2: ',
                        //     '財哥...真的...累了...'
                        // );
                    }
                });
            },
        },
    ];

    useEffect(() => {
        setShareWallButtonData(
            shareWallButtonMapDisplayObj[shareWallSearchState]
        );
    }, [shareWallSearchState]);

    useEffect(() => {
        axiosListGET();
    }, [shareWallSearchState]);

    const { icon, title, caret } = shareWallButtonData;

    return (
        <button
            className={`cpl-header-sharewall-button d-flex ${
                theme.title === 'light' ? 'theme-light' : 'theme-dark'
            } ${
                shareWallButtonState === 'fixed' ? '' : 'flex-column isActive'
            }`}
            onClick={() => {
                if (shareWallButtonState === 'fixed') {
                    setShareWallButtonState('select');
                } else {
                    setShareWallButtonState('fixed');
                    setSearchParams('');
                }
            }}
        >
            {shareWallButtonState === 'fixed' ? (
                <div className="cpl-hsb-button-option cpl-hsb-bo-fixed d-flex justify-content-between align-items-center w-100">
                    {icon}
                    <p className="cpl-hsb-bo-title">{title}</p>
                    {caret}
                </div>
            ) : (
                <>
                    {ShareWallButtonSelectOptionArray.map((v, i) => (
                        <div
                            key={i}
                            className="cpl-hsb-button-option cpl-hsb-bo-select d-flex justify-content-between align-items-center w-100"
                            onClick={v.onClick}
                        >
                            {v.icon}
                            <p className="cpl-hsb-bo-title">{v.title}</p>
                            {v.caret}
                        </div>
                    ))}
                </>
            )}
        </button>
    );
}

export default HeaderShareWallButton;
