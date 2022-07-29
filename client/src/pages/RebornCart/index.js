import { Row } from 'react-bootstrap';
import './rebornCart.scss';

import { BsExclamation, BsPatchPlusFill, BsPatchPlus } from 'react-icons/bs';
import SoulIcon from '../Place/components/SoulIcon';
import { Fragment, useEffect, useState } from 'react';
import PlaceOption from './components/PlaceOption';
import { useNavigate } from 'react-router-dom';

import { fakeCartPlaceList } from './data/fakeCartPlaceList';
import { avatarDataList } from './data/avatarDataList';
import AvatarSwiper from './components/AvatarSwiper';

import { PLACE_CARTDATA_API } from '../../config/ajax-path';

function RebornCart() {
    // 假資料
    // TODO: 新增一張資料表 place_in_cart
    // 用 fetch 撈資料出來
    fetch(PLACE_CARTDATA_API, {
        method: 'GET', //TODO: 怎麼傳會員sid到後台
        body: JSON.stringify(),
    });
    // 用戶選進購物車的選項
    const [cartPlaceList, setCartPlaceList] = useState(fakeCartPlaceList);

    // place option State
    const [selectedPlace, setSelectedPlace] = useState(
        `${cartPlaceList[0].sid}`
    );
    const [selectedPlaceInfo, setSelectedPlaceInfo] = useState([]);

    // avatar 選到的形象
    const [selectedAvatarInd, setSelectedAvatarInd] = useState(0);

    const navigate = useNavigate();

    // 選擇地點後於訂單顯示
    const handlePlaceSelect = () => {
        const newSelectedPlaceInfo = cartPlaceList.filter((v, i) => {
            return v.sid === selectedPlace;
        });
        setSelectedPlaceInfo(newSelectedPlaceInfo);
    };

    // 地點資料移出購物車
    const placeMoveOutFromCart = (e) => {
        const placeSid = e.currentTarget
            .closest('.place-option-felx')
            .getAttribute('data-placesid');

        const newCartPlaceList = [...cartPlaceList].filter((v) => {
            return v.sid !== placeSid;
        });
        setCartPlaceList(newCartPlaceList);
        // TODO: 資料庫修改
    };

    // 更新訂單資料
    useEffect(() => {
        handlePlaceSelect();
    }, [selectedPlace]);

    return (
        <>
            <div className="container reborn-cart-container">
                {/* <div>
                    <h1 className="pageTitle">轉生投胎</h1>
                </div> */}
                <div className="select-row">
                    <div className="select-ava">
                        <h4 className="title">轉生形象</h4>
                        <div className="ava-wrap">
                            {/* <div className="caret-wrap">
                                <FaCaretLeft className="caret-icon" />
                            </div> */}
                            <AvatarSwiper
                                avatarDataList={avatarDataList}
                                setSelectedAvatarInd={setSelectedAvatarInd}
                            />
                            {/* <div className="caret-wrap">
                                <FaCaretRight className="caret-icon" />
                            </div> */}
                        </div>
                    </div>
                    <div className="select-place">
                        <h4 className="title">良辰吉地</h4>
                        <div className="place-wrap">
                            {/* place option */}
                            <div className="place-options-box">
                                {cartPlaceList.map((v, i) => (
                                    <PlaceOption
                                        key={v.sid}
                                        value={v}
                                        selectedPlace={selectedPlace}
                                        setSelectedPlace={setSelectedPlace}
                                        placeMoveOutFromCart={
                                            placeMoveOutFromCart
                                        }
                                    />
                                ))}
                            </div>
                            {/* 底層按鈕(沒有選項時) */}
                            <div className="place-add-btn-box">
                                {Array(5)
                                    .fill(1)
                                    .map((v, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="to-liked-page-add-btn"
                                                onClick={() => {
                                                    navigate('../Place', {
                                                        state: true,
                                                    });
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
                        </div>
                    </div>
                </div>
                <div className="reborn-order-wrap">
                    <div className="my-deed-wrap">
                        <div className="my-deed-wrap-title">我目前的陰德值</div>
                        <div className="my-deed-wrap-text">4000</div>
                    </div>
                    <div className="deed-enough-wrap">
                        <div className="deed-enough-wrap-title">陰德值不足</div>
                        <div className="deed-enough-wrap-text">2000</div>
                    </div>
                    <div className="reborn-order-card">
                        <div className="reborn-order-card-title">轉生訂單</div>
                        <div className="reborn-order-card-ava">
                            <img
                                src={`images/${avatarDataList[selectedAvatarInd].img}`}
                                alt=""
                            />
                        </div>
                        <div className="reborn-order-card-place">
                            {/* 帶入選到的place */}
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
                                            {selectedPlaceInfo.length > 0
                                                ? avatarDataList[
                                                      selectedAvatarInd
                                                  ].price +
                                                  Number(
                                                      selectedPlaceInfo[0]
                                                          .place_price
                                                  )
                                                : ''}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <button className="reborn-order-card-btn">
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
