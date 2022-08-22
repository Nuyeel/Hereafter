import MapIcon from '../MapIcon';
import SoulIcon from '../SoulIcon';
import { FaHeart } from 'react-icons/fa';
import {
    BsFillCartPlusFill,
    BsBookmark,
    BsBookmarkCheckFill,
} from 'react-icons/bs';
import AddPlaceToCart from '../util/addPlaceToCart';

function PopupPlaceCard(props) {
    const { saveLikedPlace, likedPlaceSidArr, userSid, isDead } = props;
    const {
        sid,
        year,
        month,
        country,
        city,
        dist,
        quota,
        booked,
        place_price,
    } = props.value;
    return (
        <>
            <div className="place-info-card" data-placesid={sid}>
                <div className="map-popup-card ">
                    <div className="list-card-title">
                        <p className="yeartitle">
                            {year}年 {month}月
                        </p>
                        <p className="cityTitle">
                            {country} {city} {dist}
                        </p>
                    </div>

                    <div className="popup-card-bottom">
                        <div className="remain-quant">
                            剩餘數量：
                            <span> {quota - booked}</span>
                        </div>
                        <div className="price-wrap">
                            <div className="price">
                                <SoulIcon className="soul-icon" />
                                <span>{place_price}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="place-btns-wrap">
                    <div
                        className="place-likeBtn hover-text"
                        onClick={saveLikedPlace}
                        data-hover="加入收藏"
                    >
                        {likedPlaceSidArr.includes(sid) ? (
                            <BsBookmarkCheckFill className="place-like-icon btn-checked" />
                        ) : (
                            <BsBookmark className="place-like-icon" />
                        )}
                    </div>

                    {/* 死了才顯示加入轉生購物車按鈕 */}
                    {isDead && (
                        <div
                            className="place-cartBtn hover-text"
                            onClick={(e) => AddPlaceToCart(e, userSid)}
                            data-hover="加入轉生購物車"
                        >
                            <BsFillCartPlusFill className="place-cart-icon" />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default PopupPlaceCard;
