import { useState, useContext } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2';
import OutlineSoulAlert from '../images/sweetalert2/outline_soul_alert.svg';

import { HiHome } from 'react-icons/hi';
import { FiPlus } from 'react-icons/fi';
import { IoPersonCircleSharp, IoCaretDown } from 'react-icons/io5';
import { FiBookmark } from 'react-icons/fi';

import HeaderContext from '../context/HeaderContext/HeaderContext';
import ThemeContext from '../context/ThemeContext/ThemeContext';
import AuthContext from '../context/AuthContext/AuthContext';

function HeaderShareWallButton() {
    const { theme } = useContext(ThemeContext);
    const { setShareWallSearchState, setShareWallPostsData } =
        useContext(HeaderContext);
    const { authorized } = useContext(AuthContext);

    // fixed or select
    const [shareWallButtonState, setShareWallButtonState] = useState('fixed');
    const [shareWallButtonData, setShareWallButtonData] = useState({
        icon: <HiHome className="cpl-hsb-bo-icon cpl-hsb-bo-HiHome" />,
        title: '　主頁　',
        caret: (
            <IoCaretDown className="cpl-hsb-bo-icon cpl-hsb-bo-IoCaretDown" />
        ),
    });

    const { icon, title, caret } = shareWallButtonData;

    const axiosCollectGET = () => {};

    const ShareWallButtonSelectOptionArray = [
        {
            icon: <HiHome className="cpl-hsb-bo-icon cpl-hsb-bo-HiHome" />,
            title: '　主頁　',
            caret: (
                <IoCaretDown className="cpl-hsb-bo-icon cpl-hsb-bo-IoCaretDown invisible" />
            ),
            onClick: (e) => {
                e.preventDefault();
                setShareWallButtonData({
                    icon: (
                        <HiHome className="cpl-hsb-bo-icon cpl-hsb-bo-HiHome" />
                    ),
                    title: '　主頁　',
                    caret: (
                        <IoCaretDown className="cpl-hsb-bo-icon cpl-hsb-bo-IoCaretDown" />
                    ),
                });
                const newSWSS = 'default';
                // console.log(newSWSS);
                setShareWallSearchState(newSWSS);
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
                setShareWallButtonData({
                    icon: (
                        <IoPersonCircleSharp className="cpl-hsb-bo-icon cpl-hsb-bo-IoPersonCircleSharp" />
                    ),
                    title: '個人主頁',
                    caret: (
                        <IoCaretDown className="cpl-hsb-bo-icon cpl-hsb-bo-IoCaretDown" />
                    ),
                });
                const newSWSS = 'isAuthor';
                // console.log(newSWSS);
                setShareWallSearchState(newSWSS);
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
                setShareWallButtonData({
                    icon: (
                        <FiBookmark className="cpl-hsb-bo-icon cpl-hsb-bo-FiBookmark" />
                    ),
                    title: '我的收藏',
                    caret: (
                        <IoCaretDown className="cpl-hsb-bo-icon cpl-hsb-bo-IoCaretDown" />
                    ),
                });
                const newSWSS = 'isCollector';
                // console.log(newSWSS);
                setShareWallSearchState(newSWSS);
                // 網址列不換了 但是要顯示會員收藏的內容
                // 發 Axios 要內容
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
                setShareWallButtonData({
                    icon: (
                        <FiPlus className="cpl-hsb-bo-icon cpl-hsb-bo-FiPlus" />
                    ),
                    title: '新增貼文',
                    caret: (
                        <IoCaretDown className="cpl-hsb-bo-icon cpl-hsb-bo-IoCaretDown" />
                    ),
                });
            },
        },
    ];

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
