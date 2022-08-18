import { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import ListCard from './components/ListCard';
import TimeNewsRow from './components/TimeNewsRow';
import Swal from 'sweetalert2';
import soulPng from '../Place/img/soul.png';
import soulIconAlert from '../../images/sweetalert2/outline_soul_alert.svg';

import './place.scss';
import { PLACE_LIKED_API, PLACE_GETDATA_API } from '../../config/ajax-path';

// 頁面標題context
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
// 會員登入context
import AuthContext from '../../context/AuthContext/AuthContext';
// 變換主色
import ThemeContext from '../../context/ThemeContext/ThemeContext';

function PlaceLikedPage(props) {
    const { pageName } = props;
    const { setHeader } = useContext(HeaderContext);
    const { authorized, sid: userSid, isDead } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    // 要呈現的資料陣列
    const [displayLikedList, setDisplayLikedList] = useState([]);
    // 收藏資料的sid
    const [likedPlaceSidArr, setLikedPlaceSidArr] = useState([]);

    // 最新消息資料
    const [newsData, setNewsData] = useState([]);
    const newsRef = useRef(null);
    const getNewsData = async () => {
        const r = await fetch(`${PLACE_GETDATA_API}/news`);
        const obj = await r.json();
        setNewsData(obj);
    };

    // 沒登入跳轉光箱
    const gotoLogin = () => {
        Swal.fire({
            title: `還沒有登入唷`,
            imageUrl: soulIconAlert,
            imageHeight: 50,
            imageWidth: 50,
            showDenyButton: false,
            timer: 3000,
        });
        setTimeout(() => {
            navigate('/login', { replace: true });
        }, 1000);
    };

    // 如果有登入, 拿會員的收藏data
    const getMemberLikedData = async () => {
        const r = await fetch(`${PLACE_LIKED_API}/${userSid}`);
        const rows = await r.json();
        if (rows.length > 0) {
            setDisplayLikedList(rows);
            // console.log('member:', userSid, rows);
            //console.log(typeof rows[0].sid);  //number

            const sidArr = rows.map((v) => v.sid);
            setLikedPlaceSidArr(sidArr);
        }
    };

    // 收藏
    const saveLikedPlace = (e) => {
        const placeIndex = e.currentTarget
            .closest('.place-info-card')
            .getAttribute('data-placesid');
        const delEle = e.currentTarget.closest('.place-info-card');
        const likedBtn = e.currentTarget;
        likedBtn.classList.add('likedBtnCartBtnAnimation-add');
        // console.log(placeIndex);
        // console.log(userSid);
        // console.log(likedPlaceSidArr);

        if (!likedPlaceSidArr.includes(+placeIndex)) {
            // 存到資料庫 place-liked
            const obj = { member_sid: userSid, place_sid: placeIndex };
            likedBtn.classList.add('likedBtnCartBtnAnimation-add');
            setTimeout(() => {
                likedBtn.classList.remove('likedBtnCartBtnAnimation-add');

                fetch(PLACE_LIKED_API, {
                    method: 'POST',
                    body: JSON.stringify(obj),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((r) => r.json())
                    .then((result) => {
                        console.log(result);
                        getMemberLikedData();
                    });
            }, 500);
            // 收藏的資料, 愛心保持亮
            const newSidArr = [...likedPlaceSidArr].push(placeIndex);
            setLikedPlaceSidArr(newSidArr);
        } else {
            removeLikedPlace(placeIndex, delEle);
        }
    };

    // 收藏鈕要改做成checkbox
    // 取消收藏
    const removeLikedPlace = (placeIndex, delEle) => {
        const obj = { member_sid: userSid, place_sid: placeIndex };
        const [delPlace] = displayLikedList.filter(
            (v) => v.sid === Number(placeIndex)
        );
        // console.log(delPlace);

        Swal.fire({
            title: '確認移除收藏',
            html: `<h5>是否將 <span style="color:#FF52BA">${delPlace.year}年 ${delPlace.month}月 於 ${delPlace.country} </span>轉生<br/>的良辰吉地移出您的收藏？<h5>`,
            imageUrl: soulIconAlert,
            imageHeight: 50,
            imageWidth: 50,
            confirmButtonText: '確認移除',
            showDenyButton: true,
            denyButtonText: '再等一下',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(PLACE_LIKED_API, {
                    method: 'DELETE',
                    body: JSON.stringify(obj),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((r) => r.json())
                    .then((result) => {
                        console.log(result);
                    });

                // 修改收藏的資料sid陣列
                const newSidArr = [...likedPlaceSidArr].filter(
                    (v) => v !== +placeIndex
                );
                setLikedPlaceSidArr(newSidArr);

                // 前台資料移除動畫
                delEle.classList.add('listCardDisappear');

                setTimeout(() => {
                    Swal.fire({
                        title: '成功移除',
                        timer: 1200,
                    });
                    getMemberLikedData();
                }, 800);
            } else if (result.isDenied) {
                console.log('Nooooooo!');
            }
        });
    };

    // TODO: 點選place的地圖icon, 顯示地圖&列表第一筆為此資料(place_sid)
    const handlePlaceMapIconClicked = (e) => {
        const placeIndex = e.currentTarget
            .closest('.place-info-card')
            .getAttribute('data-placesid');
        // console.log(typeof placeIndex);

        // setViewLocationPlaceSid(placeIndex);
    };

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, []);

    // 要資料
    useEffect(() => {
        getMemberLikedData();
        getNewsData();
    }, []);

    // 新聞跑馬燈
    const handleNewsRef = useCallback(
        (node) => {
            if (newsData.length > 0) {
                newsRef.current = node;
            }
        },
        [newsData]
    );

    return (
        <>
            <div className="container place-container">
                {/* 如果沒有登入, 跳轉到登入頁面 */}
                {authorized ? (
                    <>
                        {/* 會員收藏列表 */}
                        <TimeNewsRow
                            style={{
                                backgroundColor: theme.placeBg,
                            }}
                            newsData={newsData}
                            handleNewsRef={handleNewsRef}
                        />
                        <div className="place-list-wrap liked-page">
                            <div className="place-list">
                                {/* 列表區 */}
                                {displayLikedList.length > 0 ? (
                                    <>
                                        {displayLikedList.map((v, i) => (
                                            <ListCard
                                                key={v.sid}
                                                value={v}
                                                userSid={userSid}
                                                isDead={isDead}
                                                saveLikedPlace={saveLikedPlace}
                                                likedPlaceSidArr={
                                                    likedPlaceSidArr
                                                }
                                                handlePlaceMapIconClicked={
                                                    handlePlaceMapIconClicked
                                                }
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {/* 如果沒有可顯示的資料 */}
                                        <h4 className="cm-nodata-title">
                                            沒有可顯示的資料
                                        </h4>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <>{gotoLogin()}</>
                )}
            </div>
        </>
    );
}

export default PlaceLikedPage;
