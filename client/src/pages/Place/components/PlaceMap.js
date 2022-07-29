import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
// import MarkerClusterGroup from "react-leaflet-markercluster";

// import taiwanGeoData from "../data/taiwan-city-geojson.json";
// import placeData from "../data/place_test.json";
import cityLatLngData from '../data/city-latlng.json';

function PlaceMap(props) {
    const { placeDisplay } = props;

    // 要render到地圖上的資料array
    const [renderDataWithIcon, setRenderDataWithIcon] = useState([]);

    // marker 樣式模板
    const priceIcon = L.divIcon({
        className: 'priceIcon',
        html: `<img src='/tempImg/soul.png' />3000`,
    });

    const renderData = async () => {
        // --- 縣市中心座標, 之後帶入為marker的Point的座標 geometry
        const taiwanCitiesGeometry = await cityLatLngData.map((city) => {
            city.geometry = [+city.lng, +city.lat];
            return city;
        });

        const renderDataArr = await placeDisplay.map((place) => {
            taiwanCitiesGeometry.map((city) => {
                if (city.city === place.city) {
                    // 把geo座標資料加到place資料裡
                    place.geometry = city.geometry;
                }
                return city;
            });
            return place;
        });

        // --- 價格帶入 icon, icon放入renderArr
        const newData = await renderDataArr.map((place) => {
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

    useEffect(() => {
        renderData();
    }, [placeDisplay]);

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
                center={[25.0339145, 121.543412]}
                zoom={10}
                maxZoom={12}
                scrollWheelZoom={true}
                className="map-container"
            >
                <TileLayer
                    url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png"
                    maxZoom={12}
                />

                {/* render 座標 marker */}

                {/* <Marker position={[25.0339145, 121.543412]} icon={priceIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}

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
                    // chunkedLoading
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
                                />
                            );
                        })}
                </MarkerClusterGroup>
            </MapContainer>
        </>
    );
}

export default PlaceMap;
