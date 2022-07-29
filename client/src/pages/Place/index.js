// import Container from "react-bootstrap/Container";
import { useContext, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ListCard from './components/ListCard';
// import MapIcon from "./components/MapIcon";
import { IoMap, IoList } from 'react-icons/io5';

import './place.scss';
import SortRow from './components/SortRow';
import FilterSearch from './components/FilterSearch';
import { PLACE_GETDATA_API } from '../../config/ajax-path';
import PlaceMap from './components/PlaceMap';

import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';

function Place(props) {
    const { pageName } = props;
    const { setHeader } = useContext(HeaderContext);

    // place-data
    const [rawPlaceData, setRawPlaceData] = useState([]);
    const [placeDisplay, setPlaceDisplay] = useState([]);
    // TODO: filter 如果沒有資料,

    // country-city-data
    // 從資料表要有國家程式關聯的json

    // filter (select)
    const [countryFilter, setCountryFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [timeRangeFilter, setTimeRangeFilter] = useState([
        new Date(),
        new Date(),
    ]);

    // filter(checked勾選形式)
    // const [checkedcity, setCheckedCity] = useState([]);

    // sort State (radio)
    const [sortBy, setSortBy] = useState('sortYearASC');

    // 地圖檢視
    const [mapView, setMapView] = useState(false);

    // 現在時間
    const [nowTime, setNowTime] = useState({
        y: 0,
        m: 0,
        d: 0,
        cDay: '',
        hh: 0,
        mm: 0,
        sec: 0,
    });

    // 要資料
    const getPlaceData = async () => {
        const r = await fetch(`${PLACE_GETDATA_API}`);
        const obj = await r.json();

        const rows = obj.rows;
        // console.log(rows);
        setRawPlaceData(rows);
        setPlaceDisplay(rows);
        // console.log(rawPlaceData);
        // console.log(placeDisplay);
    };

    // didMount要資料
    useEffect(() => {
        getPlaceData();
    }, []);

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, []);

    // 篩選 country-city filter
    const filtByCountry = (country, city) => {
        // console.log(country, city);
        let newPlaceData = [...rawPlaceData];

        if (country && city) {
            // 1. 從placeData找country和city都符合的資料, 變成新陣列
            newPlaceData = [...rawPlaceData].filter((v, i) => {
                return v.country === country && v.city === city;
            });
            // console.log(newPlaceData);
        } else {
            // 1. 從placeData找country相同的資料, 變成新陣列
            newPlaceData = [...rawPlaceData].filter((v, i) => {
                return v.country === country;
            });
        }
        // 2. 設定到 placeDisplay
        setPlaceDisplay(newPlaceData);
    };

    // 轉換時間為1970毫秒
    const changeTimeFormatToMilSec = (year, month) => {
        const placeDate = `${year}-${month}`;
        return new Date(placeDate).getTime();
    };

    // 篩選 time-range filter
    const filtByTimeRange = (v) => {
        // 取得1970至某時間的毫秒值, 再比較大小
        // .getTime()
        // new Date('YY-MM').getTime()
        const value = v;
        const start = value[0].getTime();
        const end = value[1].getTime();

        const newPlaceData = [...rawPlaceData].filter((v) => {
            const placeDateSec = changeTimeFormatToMilSec(v.year, v.month);
            return placeDateSec >= start && placeDateSec <= end;
        });
        console.log(newPlaceData);
        setPlaceDisplay(newPlaceData);
    };

    // 排序 sort
    const handleSort = (sort) => {
        // console.log(sort);
        let newPlaceData = [...placeDisplay];

        if (sort === 'sortYearASC') {
            newPlaceData = [...placeDisplay].sort((a, b) => {
                const aSec = changeTimeFormatToMilSec(a.year, a.month);
                const bSec = changeTimeFormatToMilSec(b.year, b.month);
                return aSec - bSec;
            });
        }
        if (sort === 'sortYearDESC') {
            newPlaceData = [...placeDisplay].sort((a, b) => {
                const aSec = changeTimeFormatToMilSec(a.year, a.month);
                const bSec = changeTimeFormatToMilSec(b.year, b.month);
                return bSec - aSec;
            });
        }
        if (sort === 'sortPriceASC') {
            newPlaceData = [...placeDisplay].sort(
                (a, b) => a.place_price - b.place_price
            );
        }
        if (sort === 'sortPriceDESC') {
            newPlaceData = [...placeDisplay].sort(
                (a, b) => b.place_price - a.place_price
            );
        }

        setPlaceDisplay(newPlaceData);
    };

    // 現在時間
    const dayList = ['日', '一', '二', '三', '四', '五', '六'];
    useEffect(() => {
        const nowDate = setInterval(() => {
            const now = new Date();

            const y = now.getFullYear();
            const m = now.getMonth() + 1;
            const d = now.getDate();
            const dIndex = now.getDay();
            const hh = now.getHours();
            const mm = now.getMinutes();
            const sec = now.getSeconds();

            const cDay = dayList[dIndex];

            const newNowTime = {
                y: y,
                m: m,
                d: d,
                cDay: cDay,
                hh: hh,
                mm: mm,
                sec: sec,
            };

            setNowTime(newNowTime);
            // console.log(newNowTime);
        }, 1000);
        return () => clearInterval(nowDate);
    }, []);

    return (
        <>
            <div className="container place-container">
                <div className="time-news-row">
                    <div className="time-wrap dark-bg-50">
                        <p className="tn-title">現在時間：</p>
                        <p className="time tn">
                            {nowTime.y}年{nowTime.m}月{nowTime.d}日(
                            {nowTime.cDay})
                            {`${nowTime.hh}` < 10
                                ? ` 0${nowTime.hh}`
                                : ` ${nowTime.hh}`}
                            :
                            {`${nowTime.mm}` < 10
                                ? `0${nowTime.mm}`
                                : `${nowTime.mm}`}
                            :
                            {`${nowTime.sec}` < 10
                                ? `0${nowTime.sec}`
                                : `${nowTime.sec}`}
                        </p>
                    </div>
                    <div className="news-wrap dark-bg-50">
                        <p className="tn-title">最新消息：</p>
                        <p className="news tn">
                            受氣候變遷及戰爭影響，近年全球轉生名額不斷減少。海外轉生訂單需求增加，帶動...
                        </p>
                    </div>
                </div>

                <div className="filter-row">
                    {/* 篩選區 */}
                    <FilterSearch
                        rawPlaceData={rawPlaceData}
                        setPlaceDisplay={setPlaceDisplay}
                        countryFilter={countryFilter}
                        setCountryFilter={setCountryFilter}
                        cityFilter={cityFilter}
                        setCityFilter={setCityFilter}
                        timeRangeFilter={timeRangeFilter}
                        setTimeRangeFilter={setTimeRangeFilter}
                        filtByCountry={filtByCountry}
                        filtByTimeRange={filtByTimeRange}
                    />
                    <div className="liked-place-btn-wrap">
                        <button className="likedPageBtn place-btn">
                            我的收藏
                        </button>
                    </div>
                </div>

                {mapView ? (
                    <>
                        {/* 地圖顯示 */}
                        <div className="place-map-wrap">
                            <div className="map-list-wrap">
                                <div className="place-sideList">
                                    {placeDisplay.length > 0 ? (
                                        <>
                                            {placeDisplay.map((v, i) => (
                                                <ListCard
                                                    key={v.sid}
                                                    sid={v.sid}
                                                    year={v.year}
                                                    month={v.month}
                                                    country={v.country}
                                                    city={v.city}
                                                    dist={v.dist}
                                                    remainQuantity={
                                                        v.quota - v.booked
                                                    }
                                                    price={v.place_price}
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
                                <div className="place-map">
                                    <PlaceMap placeDisplay={placeDisplay} />
                                </div>
                            </div>
                            <div className="foot-view-map">
                                <button
                                    className="viewMapBtn place-btn"
                                    onClick={() => setMapView(false)}
                                >
                                    <IoList />
                                    列表檢視
                                </button>
                                <div className="viewMapBtn-layer"></div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* search? */}
                        <div className="place-list-wrap">
                            {/* 排序區 */}
                            <SortRow
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                handleSort={handleSort}
                            />

                            <div className="place-list">
                                {/* 列表區 */}
                                {placeDisplay.length > 0 ? (
                                    <>
                                        {placeDisplay.map((v, i) => (
                                            <ListCard
                                                key={v.sid}
                                                sid={v.sid}
                                                year={v.year}
                                                month={v.month}
                                                country={v.country}
                                                city={v.city}
                                                dist={v.dist}
                                                remainQuantity={
                                                    v.quota - v.booked
                                                }
                                                price={v.place_price}
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
                            <div className="foot-view-map">
                                <div
                                    className="viewMapBtn place-btn"
                                    onClick={() => setMapView(true)}
                                >
                                    {/* <MapIcon className="map-icon-view" /> */}
                                    <IoMap />
                                    地圖檢視
                                </div>
                                <div className="viewMapBtn-layer"></div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Place;
