import MapIcon from './MapIcon';
import SoulIcon from './SoulIcon';
// import LikeIcon from "./LikeIcon";
import { FaHeart } from 'react-icons/fa';
import { BsFillCartPlusFill } from 'react-icons/bs';
import AddPlaceToCart from './util/addPlaceToCart';

function ListCard(props) {
    const {
        value,
        userSid,
        isDead,
        saveLikedPlace,
        likedPlaceSidArr,
        handlePlaceMapIconClicked,
        style,
    } = props;

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
    } = {
        ...value,
    };

    return (
        <>
            <div
                className="list-card place-info-card"
                data-placesid={sid}
                style={style}
            >
                <div className="list-card-title">
                    <p className="yeartitle">
                        {year}年 {+month < 10 ? `0${month}` : `${month}`}月
                    </p>
                    <p className="cityTitle">
                        {country} {city} {dist}
                    </p>
                    <span
                        className="place-card-map-icon-wrap"
                        onClick={handlePlaceMapIconClicked}
                        title=""
                    >
                        <MapIcon className="place-card-map-icon" />
                    </span>
                </div>

                <div className="remain-quant">
                    剩餘數量：<span> {quota - booked}</span>
                </div>
                <div className="price-wrap">
                    所需陰德值：
                    <div className="price">
                        <SoulIcon className="soul-icon" />
                        <span>{place_price}</span>
                    </div>
                </div>

                <div className="place-btns-wrap">
                    <div
                        className="place-likeBtn hover-text"
                        onClick={saveLikedPlace}
                        data-hover="加入收藏"
                    >
                        <input
                            type="checkbox"
                            name="placeLiked"
                            value={sid}
                            style={{ display: 'none' }}
                            checked={likedPlaceSidArr.includes(sid)}
                            onChange={(e) => console.log('')}
                        />
                        <FaHeart
                            className={
                                likedPlaceSidArr.includes(sid)
                                    ? 'place-like-icon btn-checked'
                                    : 'place-like-icon'
                            }
                        />
                    </div>
                    {/* 死了才顯示加入轉生購物車按鈕 */}
                    {isDead && (
                        <div
                            className="place-cartBtn hover-text"
                            onClick={(e) => {
                                AddPlaceToCart(e, userSid);
                            }}
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

export default ListCard;
