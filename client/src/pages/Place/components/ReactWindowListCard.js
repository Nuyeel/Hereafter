import { Fragment, useState } from 'react';
import ListCard from './ListCard';
import { FixedSizeList } from 'react-window';

import MapIcon from './MapIcon';
import SoulIcon from './SoulIcon';
import { FaHeart } from 'react-icons/fa';
import { BsFillCartPlusFill } from 'react-icons/bs';
import AddPlaceToCart from './util/addPlaceToCart';

function ReactWindowListCard(props) {
    const {
        placeDisplay,
        userSid,
        isDead,
        saveLikedPlace,
        likedPlaceSidArr,
        handlePlaceMapIconClicked,
        // style,
    } = props;

    // const {
    //     sid,
    //     year,
    //     month,
    //     country,
    //     city,
    //     dist,
    //     quota,
    //     booked,
    //     place_price,
    // } = {
    //     ...value,
    // };

    const dataRows = () => {
        placeDisplay.map((v, i) => (
            <ListCard
                key={v.sid}
                value={v}
                userSid={userSid}
                isDead={isDead}
                saveLikedPlace={saveLikedPlace}
                handlePlaceMapIconClicked={handlePlaceMapIconClicked}
                likedPlaceSidArr={likedPlaceSidArr}
            />
        ));
    };

    return (
        <>
            <FixedSizeList
                height={window.innerWidth < 376 ? 315 : 390}
                itemData={placeDisplay}
                itemCount={placeDisplay.length}
                itemSize={window.innerWidth < 376 ? 200 : 78}
            >
                {/* {dataRows()} */}
                {({ data, index, style }) => {
                    return (
                        <div style={style}>
                            <div
                                className="list-card place-info-card"
                                data-placesid={placeDisplay[index].sid}
                            >
                                <div className="list-card-title">
                                    <p className="yeartitle">
                                        {placeDisplay[index].year}年{' '}
                                        {+placeDisplay[index].month < 10
                                            ? `0${placeDisplay[index].month}`
                                            : `${placeDisplay[index].month}`}
                                        月
                                    </p>
                                    <p className="cityTitle">
                                        {placeDisplay[index].country}{' '}
                                        {placeDisplay[index].city}{' '}
                                        {placeDisplay[index].dist}
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
                                    剩餘數量：
                                    <span>
                                        {' '}
                                        {placeDisplay[index].quota -
                                            placeDisplay[index].booked}
                                    </span>
                                </div>
                                <div className="price-wrap">
                                    所需陰德值：
                                    <div className="price">
                                        <SoulIcon className="soul-icon" />
                                        <span>
                                            {placeDisplay[index].place_price}
                                        </span>
                                    </div>
                                </div>

                                <div className="place-btns-wrap">
                                    <div
                                        className="place-likeBtn hover-text"
                                        onClick={saveLikedPlace}
                                        title=""
                                    >
                                        <input
                                            type="checkbox"
                                            name="placeLiked"
                                            value={placeDisplay[index].sid}
                                            style={{ display: 'none' }}
                                            checked={likedPlaceSidArr.includes(
                                                placeDisplay[index].sid
                                            )}
                                            onChange={(e) => console.log('')}
                                        />
                                        <FaHeart
                                            className={
                                                likedPlaceSidArr.includes(
                                                    placeDisplay[index].sid
                                                )
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
                                            title=""
                                        >
                                            <BsFillCartPlusFill className="place-cart-icon" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                }}
            </FixedSizeList>
        </>
    );
}

export default ReactWindowListCard;
