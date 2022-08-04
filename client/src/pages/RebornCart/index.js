import { Fragment, useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { BsExclamation, BsPatchPlusFill, BsPatchPlus } from 'react-icons/bs';
import { HiChevronDoubleUp, HiChevronDoubleDown } from 'react-icons/hi';
import Swal from 'sweetalert2';
import AvatarSwiper from './components/AvatarSwiper';

import SoulIcon from '../Place/components/SoulIcon';
import soulPng from '../Place/img/soul.png';

import PlaceOption from './components/PlaceOption';
import avatarDataList from './data/avatarDataList.json';

import { PLACE_CARTDATA_API } from '../../config/ajax-path';
import './rebornCart.scss';

// 頁面標題context
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
// 會員登入context
import AuthContext from '../../context/AuthContext/AuthContext';

function RebornCart(props) {
    const { pageName } = props;
    const { setHeader } = useContext(HeaderContext);
    const { authorized, sid, account, token } = useContext(AuthContext);

    // 用戶購物車的良辰吉地選項
    const [cartPlaceList, setCartPlaceList] = useState([]);
    const [cartPlaceListLength, setCarPlaceListLength] = useState(0);

    // place option State 選到的良辰吉地
    const [selectedPlace, setSelectedPlace] = useState(-1);
    const [selectedPlaceInfo, setSelectedPlaceInfo] = useState([]);

    // avatar 選到的形象
    const [selectedAvatarInd, setSelectedAvatarInd] = useState(0);

    // RWD 轉生訂單框開合狀態
    const [rebornBoxOpen, setRebornBoxOpen] = useState(null);

    const navigate = useNavigate();

    // 用 fetch 撈資料出來, 資料表 place_in_cart
    // 會員sid => authContext
    const getMemberCartData = async () => {
        // console.log('authContext:', authorized, sid, account, token);
        const r = await fetch(`${PLACE_CARTDATA_API}/${sid}`);
        const rows = await r.json();
        if (rows.length > 0) {
            setCartPlaceList(rows);

            // place選擇預設第一個
            const defaultFirst = rows[0].sid;
            // console.log(typeof defaultFirst);
            setSelectedPlace(defaultFirst);
            setCarPlaceListLength(rows.length);
        }
    };
    useEffect(() => {
        getMemberCartData();
    }, []);

    // 選擇地點後於訂單顯示
    const handlePlaceSelect = () => {
        const newSelectedPlaceInfo = cartPlaceList.filter((place) => {
            return place.sid === selectedPlace;
        });
        setSelectedPlaceInfo(newSelectedPlaceInfo);
    };

    // 資料移出轉生購物車
    const removePlaceFromCart = async (e) => {
        const placeIndex = Number(
            e.currentTarget
                .closest('.place-option-flex')
                .getAttribute('data-placesid')
        );
        const [delPlace] = cartPlaceList.filter((v) => v.sid === placeIndex);

        // 確認是否要刪除 confirm popup
        Swal.fire({
            title: '移出轉生購物車',
            html: `<h5>是否確認將 ${delPlace.year}年 ${delPlace.month}月 於 ${delPlace.country}轉生的選項移出購物車？<h5>`,
            imageUrl: soulPng,
            imageHeight: 50,
            imageWidth: 50,
            confirmButtonText: '確認移除',
            showDenyButton: true,
            denyButtonText: '再等一下',
        }).then((result) => {
            if (result.isConfirmed) {
                removePlaceFromCartDatabase(placeIndex);
            } else if (result.isDenied) {
                console.log('Nooooooo!');
            }
        });
    };
    // 資料庫刪除資料
    const removePlaceFromCartDatabase = async (place) => {
        const placeIndex = place;
        // 如果剩最後一筆, 先取消狀態的綁定
        if (placeIndex === selectedPlace) {
            setSelectedPlace(-1);
        }

        // 資料庫刪除資料, member_sid(authContext)
        const obj = { member_sid: sid, place_sid: placeIndex };

        await fetch(PLACE_CARTDATA_API, {
            method: 'DELETE',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((result) => {
                // console.log(result);
            });

        // 重render選項
        await getMemberCartData();
    };

    // TODO: 送出轉生訂單
    const submitRebornOrder = () => {
        // 1. 燈箱確認 || 跳轉到訂單確認頁面
        // 2. 送出後存入資料庫(限定一筆), 跳轉到希望方塊頁面
        Swal.fire({
            title: '確認轉生訂單',
            // TODO: 放整個轉生訂單進來嗎(包含css)
            html: `<h5>您預定於${selectedPlaceInfo[0].year}年 ${selectedPlaceInfo[0].month}月 <br/>
            於 ${selectedPlaceInfo[0].country} ${selectedPlaceInfo[0].city} ${selectedPlaceInfo[0].dist} 投胎轉世<h5>`,
            // icon: 'error',
            imageUrl: soulPng,
            imageHeight: 50,
            imageWidth: 50,
            confirmButtonText: '確認訂單，轉生去!',
            showDenyButton: true,
            denyButtonText: '再想想><',
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('轉生gogo');
                // 存入資料庫 -> 跳轉頁面
            } else if (result.isDenied) {
                console.log('Waiiiiiiiiit~');
            }
        });
    };

    // RWD手機板: 轉生訂單框開合
    const rwdHandleRebornBox = () => {
        // console.log('window width < 768px');
        if (rebornBoxOpen) {
            setRebornBoxOpen(false);
        } else {
            setRebornBoxOpen(true);
        }
        console.log(rebornBoxOpen);
    };

    // 更新下方訂單資料
    useEffect(() => {
        handlePlaceSelect();
    }, [selectedPlace]);

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, []);

    return (
        <>
            <div className="container reborn-cart-container">
                <div className="select-row">
                    <div className="select-ava">
                        <h4 className="reborn-cart-main-title">轉生形象</h4>
                        <div className="ava-wrap">
                            <AvatarSwiper
                                avatarDataList={avatarDataList}
                                setSelectedAvatarInd={setSelectedAvatarInd}
                            />
                        </div>
                    </div>
                    <div className="select-place">
                        <h4 className="reborn-cart-main-title">良辰吉地</h4>
                        <div className="place-wrap">
                            {/* place option */}
                            {/* 如果還沒有任何加進購物車的選項 */}
                            {selectedPlace < 0 ? (
                                <>
                                    <div className="place-options-box while-no-options">
                                        <h4>還沒有任何選項</h4>
                                        <h4>
                                            請至{' '}
                                            <Link
                                                to="/place"
                                                className="reborn-link"
                                            >
                                                <span>
                                                    良辰吉地列表或收藏區
                                                </span>
                                            </Link>{' '}
                                            加入
                                        </h4>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* 呈現購物車內資料 */}
                                    <div className="place-options-box">
                                        {cartPlaceList.map((v, i) => (
                                            <PlaceOption
                                                key={v.sid}
                                                value={v}
                                                selectedPlace={selectedPlace}
                                                setSelectedPlace={
                                                    setSelectedPlace
                                                }
                                                removePlaceFromCart={
                                                    removePlaceFromCart
                                                }
                                            />
                                        ))}
                                        {/* 上限5 - 陣列長度 => render新增按鈕 */}
                                        {Array(5 - cartPlaceListLength)
                                            .fill(1)
                                            .map((v, i) => {
                                                return (
                                                    <div
                                                        key={i}
                                                        className="to-liked-page-add-btn"
                                                        onClick={() => {
                                                            navigate(
                                                                '../Place',
                                                                {
                                                                    state: true,
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        {/* 想要hover的時候換圖 */}
                                                        <div className="add-btn-icon-wrap">
                                                            <BsPatchPlusFill className="add-btn-icon add-btn-fill" />
                                                            <BsPatchPlus className="add-btn-icon add-btn-normal" />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div
                    className={
                        rebornBoxOpen
                            ? 'reborn-order-wrap box-show-ani'
                            : 'reborn-order-wrap box-show-ani animate-reverse'
                    }
                >
                    <div className="my-deed-wrap">
                        <div className="my-deed-wrap-title">我目前的陰德值</div>
                        <div className="my-deed-wrap-text">4000</div>
                    </div>
                    <div className="deed-enough-wrap">
                        <div className="deed-enough-wrap-title">陰德值不足</div>
                        <div className="deed-enough-wrap-text">2000</div>
                    </div>
                    <div className="reborn-order-card">
                        <div
                            className="reborn-order-card-title"
                            onClick={() => {
                                if (window.innerWidth < 768) {
                                    rwdHandleRebornBox();
                                }
                            }}
                        >
                            <span className="rwdBtn">
                                {rebornBoxOpen ? (
                                    <HiChevronDoubleDown />
                                ) : (
                                    <HiChevronDoubleUp />
                                )}
                            </span>
                            轉生訂單
                        </div>
                        <div className="reborn-order-card-ava">
                            <img
                                src={`images/${avatarDataList[selectedAvatarInd].img}`}
                                alt=""
                            />
                        </div>
                        <div className="reborn-order-card-place">
                            {/* 帶入選到的place, 預設第一筆 */}
                            {selectedPlaceInfo.length > 0 ? (
                                <>
                                    <h4>
                                        {selectedPlaceInfo[0].year}年
                                        {selectedPlaceInfo[0].month}月
                                    </h4>
                                    <h4>
                                        {selectedPlaceInfo[0].country}{' '}
                                        {selectedPlaceInfo[0].city}{' '}
                                        {selectedPlaceInfo[0].dist}
                                    </h4>
                                </>
                            ) : (
                                <>
                                    <h4>--年 --月</h4>
                                    <h4>-- -- --</h4>
                                </>
                            )}
                        </div>
                        <div className="reborn-order-card-summary">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>轉生形象</td>
                                        <td>
                                            {
                                                avatarDataList[
                                                    selectedAvatarInd
                                                ].price
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>良辰吉地</td>
                                        <td>
                                            {selectedPlaceInfo.length > 0
                                                ? selectedPlaceInfo[0]
                                                      .place_price
                                                : ''}
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className="totalTD">總計：</td>
                                        <td className="reborn-order-total-price">
                                            <SoulIcon className={'soul-icon'} />
                                            <span>
                                                {selectedPlaceInfo.length > 0
                                                    ? avatarDataList[
                                                          selectedAvatarInd
                                                      ].price +
                                                      Number(
                                                          selectedPlaceInfo[0]
                                                              .place_price
                                                      )
                                                    : ''}
                                            </span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <button
                            className="reborn-order-card-btn"
                            onClick={submitRebornOrder}
                        >
                            <p>轉生去</p>
                            <BsExclamation className="exclamation-mark" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RebornCart;
