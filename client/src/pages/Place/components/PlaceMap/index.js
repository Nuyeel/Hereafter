import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './placemap.scss';

import MyMapComponent from './MyMapComponent';
import PopupPlaceCard from './PopupPlaceCard';

import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
// import MarkerClusterGroup from "react-leaflet-markercluster";

import taiwanGeoData from '../../data/taiwan-city-geojson.json';
// import placeData from "../data/place_test.json";
// import cityLatLngData from '../../data/city-latlng.json';
import taiwanDdistCenterData from '../../data/city-dist-lnglat.json';
import distCenterData from '../../data/others-dist-lnglat.json';

function PlaceMap(props) {
    const { placeDisplay, cityFilter, addPlaceToCart, saveLikedPlace } = props;

    // 要render到地圖上的資料array
    const [renderDataWithIcon, setRenderDataWithIcon] = useState([]);

    // 地圖中心移動
    const centerRef = useRef([25.0260598, 121.5275321]);

    // 篩選之後出現出現geo邊界
    const [filterGeo, setFilterGeo] = useState([]);

    // marker 樣式模板
    // const priceIcon = L.divIcon({
    //     className: 'priceIcon',
    //     html: `<img src='/tempImg/soul.png' />3000`,
    // });

    const renderData = () => {
        // --- 縣市鄉鎮中心座標, 之後帶入為marker的座標geometry
        const renderDataArr = placeDisplay.map((place) => {
            // 小亂數讓座標不要重疊在一起
            const rand = Math.random() * 0.05;

            if (place.country === '台灣') {
                taiwanDdistCenterData.map((distItem) => {
                    const c = distItem.dist.slice(0, 3); // 分割出城市名
                    const d = distItem.dist.slice(3); // 鄉鎮名

                    if (c === place.city && d === place.dist) {
                        // 把geo座標資料加到place資料裡
                        place.geometry = [
                            distItem.lng + rand,
                            distItem.lat + rand,
                        ];
                    }
                    return place;
                });
            } else {
                distCenterData.map((distItem) => {
                    const c = distItem.dist.slice(0, 2);
                    const d = distItem.dist.slice(2);

                    if (c === place.city && d === place.dist) {
                        // 把geo座標資料加到place資料裡
                        place.geometry = [
                            distItem.lng + rand,
                            distItem.lat + rand,
                        ];
                    }
                    return place;
                });
            }

            return place;
        });

        // --- 價格帶入 icon, icon放入renderArr
        const newData = renderDataArr.map((place) => {
            const price = place.place_price;
            const icon = L.divIcon({
                className: 'priceIcon',
                html: `<img src="/images/soul.png"/>${price}`,
            });
            place.icon = icon;
            return place;
        });
        setRenderDataWithIcon(newData);
        // console.log(newData);
        // console.log(renderDataWithIcon[1].geometry);
    };

    // 篩選城市, 找出程式的geoData
    const filterGeoData = () => {
        if (cityFilter !== 'all' && placeDisplay.length > 0) {
            const newData = taiwanGeoData.filter((v) => {
                return cityFilter === v.properties.COUNTY;
            });
            // console.log(newData);
            setFilterGeo(newData);
        }
    };

    // TODO: 點了marker之後旁邊list第一筆出現marker的資料

    // TODO: 篩選後, 顯示總資料比數

    useEffect(() => {
        renderData();
        // console.log(placeDisplay);
    }, [placeDisplay]);

    // 如果有篩選城市, 出現geo邊界
    useEffect(() => {
        filterGeoData();
    }, [cityFilter]);

    // cluster樣式
    const clusterCustomIcon = function (cluster) {
        if (cluster.getChildCount() > 10) {
            return L.divIcon({
                className: 'clusterStyle-10',
                html: '<div>' + cluster.getChildCount() + '</div>',
            });
        } else {
            return L.divIcon({
                className: 'clusterStyle',
                html: '<div>' + cluster.getChildCount() + '</div>',
            });
        }
    };

    return (
        <>
            <MapContainer
                center={[25.0260598, 121.5275321]}
                zoom={10}
                maxZoom={13}
                scrollWheelZoom={true}
                className="map-container"
                draggable={true}
            >
                <TileLayer
                    url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png"
                    // maxZoom={13}
                />

                <MyMapComponent
                    placeDisplay={placeDisplay}
                    centerRef={centerRef}
                />
                {filterGeo.length > 0 && (
                    <GeoJSON
                        // 給特定的key才可以讓geoJSON rerender
                        key={filterGeo[0].properties.COUNTY_ID}
                        data={filterGeo}
                        style={() => ({
                            color: 'yellow',
                            weight: 4,
                            opacity: 0.6,
                            fillColor: 'yellow',
                            fillOpacity: 0.2,
                        })}
                    />
                )}

                {/* render 座標 marker */}
                <MarkerClusterGroup
                    iconCreateFunction={clusterCustomIcon}
                    spiderfyOnMaxZoom={true}
                    showCoverageOnHover={false}
                    zoomToBoundsOnClick={true}
                    spiderLegPolylineOptions={{
                        weight: 0,
                        color: '#222',
                        opacity: 0,
                    }}
                    spiderfyDistanceMultiplier={1}
                >
                    {/* <Marker position={[25.0339145, 121.543412]} icon={priceIcon} /> */}
                    {renderDataWithIcon.length > 0 &&
                        renderDataWithIcon.map((place) => {
                            return (
                                <Marker
                                    key={place.sid}
                                    position={
                                        place.geometry
                                            ? place.geometry
                                            : [25.0339145, 121.543412]
                                    }
                                    icon={place.icon}
                                    eventHandlers={{
                                        click: () => {
                                            const nowCenter = place.geometry;
                                            centerRef.current = nowCenter;
                                        },
                                    }}
                                >
                                    <Popup>
                                        <PopupPlaceCard
                                            value={place}
                                            addPlaceToCart={addPlaceToCart}
                                            saveLikedPlace={saveLikedPlace}
                                        />
                                    </Popup>
                                </Marker>
                            );
                        })}
                </MarkerClusterGroup>
            </MapContainer>
        </>
    );
}

export default PlaceMap;
