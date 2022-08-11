import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import ListCard from './components/ListCard';
// import MapIcon from "./components/MapIcon";
import { IoMap, IoList } from 'react-icons/io5';
import filterIcon from './img/filter-icon.svg';
import LoadingLogo from '../../components/LoadingLogo';
import Swal from 'sweetalert2';
import soulIconAlert from '../../images/sweetalert2/outline_soul_alert.svg';

import './place.scss';
import SortRow from './components/SortRow';
import FilterSearch from './components/FilterSearch';
import {
    PLACE_GETDATA_API,
    PLACE_FILTER_COUNTRYDATA_API,
    PLACE_CARTDATA_API,
    PLACE_LIKED_API,
} from '../../config/ajax-path';
import PlaceMap from './components/PlaceMap';

// 頁面標題context
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
// 會員登入context
import AuthContext from '../../context/AuthContext/AuthContext';
// 變換主色
import ThemeContext from '../../context/ThemeContext/ThemeContext';

import PageSelect from './components/PageSelect';
import TimeNewsRow from './components/TimeNewsRow';

function Place(props) {
    const { pageName } = props;
    const { setHeader } = useContext(HeaderContext);
    const { authorized, sid: userSid, isDead } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    const navigate = useNavigate();

    // loading畫面
    const [isLoading, setIsLoading] = useState(false);

    // place-data
    const [rawPlaceData, setRawPlaceData] = useState([]);
    // 要呈現的資料陣列
    const [placeDisplay, setPlaceDisplay] = useState([]);
    // 總資料筆數
    const [displayTotalRows, setDisplayTotalRows] = useState(0);
    // 會員收藏資料(顯示愛心亮)
    const [displayLikedList, setDisplayLikedList] = useState([]);
    // 收藏資料的sid
    const [likedPlaceSidArr, setLikedPlaceSidArr] = useState([]);

    // country-city-data 下拉選單資料
    const [countryFilterData, setCountryFilterData] = useState({
        country: [],
        countryCity: [],
    });

    // filter (select)
    const [countryFilter, setCountryFilter] = useState('all');
    const [cityFilter, setCityFilter] = useState('all');
    const [timeRangeFilter, setTimeRangeFilter] = useState([
        `${new Date()}`,
        '',
    ]);

    // 篩選 RWD 燈箱開合
    const [rwdFilterLightboxOpen, setRwdFilterLightboxOpen] = useState(false);

    // sort State (radio)
    const [sortBy, setSortBy] = useState('sortYearASC');

    // 地圖檢視
    const [mapView, setMapView] = useState(false);

    // 點選place的地圖icon, 顯示地圖&列表第一筆為此資料(place_sid)
    const [viewLocationPlaceSid, setViewLocationPlaceSid] = useState('');

    // TODO: markers
    const markerRef = useRef(null);
    const [markersArr, setMarkersArr] = useState([]);

    // 要資料
    const getPlaceData = async () => {
        const r = await fetch(`${PLACE_GETDATA_API}`);
        const obj = await r.json();

        const rows = obj.rows;
        const totalRows = obj.totalRows;
        setRawPlaceData(rows);
        setPlaceDisplay(rows);
        setDisplayTotalRows(totalRows);
        // console.log(rows);
        // console.log(placeDisplay);
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

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, []);

    // didMount + loading載入畫面
    useEffect(() => {
        setIsLoading(true);

        getPlaceData();
        if (authorized === true && userSid) {
            getMemberLikedData();
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    // TODO: 同時篩選地點和時間區間*
    // 篩選 country-city filter
    // 下拉選單資料
    const getOptionData = async () => {
        const r = await fetch(`${PLACE_FILTER_COUNTRYDATA_API}`);
        const optionData = await r.json();
        // console.log(optionData);
        if (optionData) {
            setCountryFilterData(optionData);
        }
    };
    useEffect(() => {
        getOptionData();
    }, []);

    // 篩選 filter
    const filtByCountry = (country, city) => {
        // console.log(country, city);
        let newPlaceData = [...rawPlaceData];

        if (country && city) {
            // 1. 從placeData找country和city都符合的資料, 變成新陣列
            newPlaceData = [...rawPlaceData].filter((v, i) => {
                return v.country === country && v.city === city;
            });
        } else {
            // 1. 從placeData找country相同的資料, 變成新陣列
            newPlaceData = [...rawPlaceData].filter((v, i) => {
                return v.country === country;
            });
        }

        const newTotalRows = newPlaceData.length;
        console.log(newTotalRows);
        // 2. 設定到 placeDisplay
        setPlaceDisplay(newPlaceData);
        setDisplayTotalRows(newTotalRows);
    };

    // 轉換時間為1970毫秒
    const changeTimeFormatToMilSec = (year, month) => {
        const placeDate = `${year}-${month}`;
        return new Date(placeDate).getTime();
    };

    // 篩選 time-range filter
    const filtByTimeRange = (v) => {
        // 清空時間區間篩選, 呈現所有資料
        if (v === null) {
            const newPlaceData = [...rawPlaceData];
            const newTotalRows = newPlaceData.length;
            setPlaceDisplay(newPlaceData);
            setDisplayTotalRows(newTotalRows);
        } else {
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
            const newTotalRows = newPlaceData.length;
            // console.log(newPlaceData);
            setPlaceDisplay(newPlaceData);
            setDisplayTotalRows(newTotalRows);
        }
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

    // 提醒登入燈箱
    const gotoLoginLighbox = (text) => {
        Swal.fire({
            title: `登入才能使用${text}功能哦！`,
            imageUrl: soulIconAlert,
            imageHeight: 50,
            imageWidth: 50,
            confirmButtonText: '立刻去登入',
            showDenyButton: true,
            denyButtonText: '再等一下',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/login', { state: true });
            } else if (result.isDenied) {
                return;
            }
        });
    };

    // 收藏
    const saveLikedPlace = async (e) => {
        const placeIndex = e.currentTarget
            .closest('.place-info-card')
            .getAttribute('data-placesid');

        // 存到資料庫 place-liked
        // 1. 判斷有無登入
        if (authorized === true && userSid) {
            // 2. 存到資料庫 place-liked
            const obj = { member_sid: userSid, place_sid: placeIndex };

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
        } else {
            // 去登入光箱
            gotoLoginLighbox('收藏');
        }
    };

    // 點選place的地圖icon, 顯示地圖&列表第一筆為此資料(place_sid)
    const handlePlaceMapIconClicked = (e) => {
        const placeIndex = e.currentTarget
            .closest('.place-info-card')
            .getAttribute('data-placesid');
        // console.log(typeof placeIndex);

        setViewLocationPlaceSid(placeIndex);
    };

    // TODO: 顯示marker的popup
    const showMarkerPopup = () => {
        // console.log(markersArr);
        const marker = markerRef.current;
        if (marker) {
            console.log(marker);
            // marker.leafletElement.openPopup();
        }
    };

    useEffect(() => {
        if (+viewLocationPlaceSid > 0) {
            setMapView(true);

            const place = placeDisplay.filter((v) => {
                return v.sid === +viewLocationPlaceSid;
            });
            const restPlaceArr = placeDisplay.filter((v) => {
                return v.sid !== +viewLocationPlaceSid;
            });
            restPlaceArr.unshift(place[0]);
            setPlaceDisplay(restPlaceArr);

            // TODO: 要設定ref才可以控制marker的popup開關
            showMarkerPopup();
        }
    }, [viewLocationPlaceSid]);

    // RWD 篩選燈箱開合
    const rwdHandelFilterLighbox = () => {
        if (rwdFilterLightboxOpen) {
            setRwdFilterLightboxOpen(false);
        } else {
            setRwdFilterLightboxOpen(true);
        }
    };

    return (
        <>
            <div className="container place-container">
                {/* 列表/收藏頁面切換 */}
                <PageSelect page={'place-list'} />

                <TimeNewsRow
                    style={{
                        backgroundColor: theme.placeBg,
                    }}
                />
                {window.innerWidth < 376 && (
                    <div
                        className="rwd-filter-btn-row my-2"
                        onClick={rwdHandelFilterLighbox}
                    >
                        <img
                            src={filterIcon}
                            alt=""
                            width="25px"
                            height="25px"
                        />
                    </div>
                )}
                <div
                    className={
                        rwdFilterLightboxOpen
                            ? 'filter-row row my-2 p-0 filterRowShow'
                            : 'filter-row row my-2 p-0'
                    }
                >
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
                        countryFilterData={countryFilterData}
                    />
                </div>

                {/* 地圖 或 列表檢視模式 */}
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
                                                    value={v}
                                                    userSid={userSid}
                                                    isDead={isDead}
                                                    saveLikedPlace={
                                                        saveLikedPlace
                                                    }
                                                    handlePlaceMapIconClicked={
                                                        handlePlaceMapIconClicked
                                                    }
                                                    likedPlaceSidArr={
                                                        likedPlaceSidArr
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
                                <div className="place-map">
                                    <PlaceMap
                                        placeDisplay={placeDisplay}
                                        setPlaceDisplay={setPlaceDisplay}
                                        cityFilter={cityFilter}
                                        saveLikedPlace={saveLikedPlace}
                                        userSid={userSid}
                                        isDead={isDead}
                                        rawPlaceData={rawPlaceData}
                                        likedPlaceSidArr={likedPlaceSidArr}
                                        markerRef={markerRef}
                                        markersArr={markersArr}
                                        setMarkersArr={setMarkersArr}
                                    />
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
                        <div
                            className="place-list-wrap"
                            style={{
                                backgroundColor: theme.placeMainBg,
                            }}
                        >
                            {isLoading ? (
                                <LoadingLogo
                                    style={{ backgroundColor: '#ffffff00' }}
                                />
                            ) : (
                                <>
                                    {/* 排序區 */}
                                    <SortRow
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        handleSort={handleSort}
                                        displayTotalRows={displayTotalRows}
                                        style={{
                                            color: theme.cHeader,
                                        }}
                                    />
                                    <div className="place-list">
                                        {/* 列表區 */}
                                        {placeDisplay.length > 0 ? (
                                            <>
                                                {placeDisplay.map((v, i) => (
                                                    <ListCard
                                                        key={v.sid}
                                                        value={v}
                                                        userSid={userSid}
                                                        isDead={isDead}
                                                        saveLikedPlace={
                                                            saveLikedPlace
                                                        }
                                                        handlePlaceMapIconClicked={
                                                            handlePlaceMapIconClicked
                                                        }
                                                        likedPlaceSidArr={
                                                            likedPlaceSidArr
                                                        }
                                                        style={{
                                                            border: theme.placeCardBorder,
                                                        }}
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
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Place;
