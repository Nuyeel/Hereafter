import { useMap, useMapEvent } from 'react-leaflet';
import { useEffect } from 'react';
import { BsChevronCompactLeft } from 'react-icons/bs';

function MyMapComponent(props) {
    const { placeDisplay, centerRef } = props;

    const map = useMap();

    // TODO: 想要滑動到地圖某區塊之後，可以點選搜尋這區塊然後顯marker
    // useMapEvent('dragend', (e) => {
    //     // const bounds = L.latLng(props.center).toBounds(props.size);
    //     // console.log(bounds);
    //     // myMap.locate();
    //     console.log(e);
    //     // const point = e.containerPoint; // x=0,y=0
    //     // const b = map.getBounds();
    //     // console.log(b);
    // });

    // 如果篩選後有值, 移動中心到第一個座標位置
    // 會一直被觸發!center的資料就會被蓋過 => 用useEffect監聽顯示的資料有沒有改變
    useEffect(() => {
        if (placeDisplay.length > 0) {
            const firstPlace = placeDisplay[0].geometry;

            centerRef.current = firstPlace;

            map.setView(firstPlace, map.getZoom(), {
                animate: centerRef.current || false,
            });
            // console.log('filter', centerRef.current);
        }
    }, [placeDisplay]);

    // 抓動地圖的時候, 移動中心點
    useMapEvent('dragend', (e) => {
        // console.log(e.target.getCenter());
        let newCenter = e.target.getCenter();
        let newLatLng = [newCenter.lat, newCenter.lng];

        centerRef.current = newLatLng;

        map.setView(newLatLng, map.getZoom(), {
            animate: centerRef.current || false,
        });
        // console.log('dragend', centerRef.current);
    });

    // 跟用戶請求位置
    // useEffect(() => {
    //     map.locate().on('locationfound', function (e) {
    //         console.log(e);
    //     });
    // }, [map]);

    // console.log('map center:', map.getCenter());
    return null;
}

export default MyMapComponent;
