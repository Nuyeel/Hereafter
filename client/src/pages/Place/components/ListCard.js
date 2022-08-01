import MapIcon from './MapIcon';
import SoulIcon from './SoulIcon';
// import LikeIcon from "./LikeIcon";
import { FaHeart } from 'react-icons/fa';
import { BsFillCartPlusFill } from 'react-icons/bs';

function ListCard(props) {
    const { value, addPlaceToCart, saveLikedPlace } = props;
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
            <div className="list-card place-info-card" data-placesid={sid}>
                <div className="list-card-title">
                    <p className="yeartitle">
                        {year}年 {+month < 10 ? `0${month}` : `${month}`}月
                    </p>
                    <p className="cityTitle">
                        {country} {city} {dist}
                    </p>
                    <MapIcon fill="#DB8DB3" className="map-icon-list" />
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
                {/* TODO: 底色state變化 */}
                <div className="place-btns-wrap">
                    <div
                        className="place-likeBtn hover-text"
                        onClick={saveLikedPlace}
                        data-hover="加入收藏"
                    >
                        <FaHeart className="place-like-icon " />
                    </div>
                    <div
                        className="place-cartBtn hover-text"
                        onClick={addPlaceToCart}
                        data-hover="加入轉生購物車"
                    >
                        <BsFillCartPlusFill className="place-cart-icon" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListCard;
