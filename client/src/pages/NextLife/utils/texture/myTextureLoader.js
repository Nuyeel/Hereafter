import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

import * as Box from '../../utils/box/box';
import boxMap from '../box/boxMap';

function myTextureLoader() {
    // 存放所有 textures
    let textures = [];

    boxMap.forEach((item, indexI) => {
        // textures 的每個子元素都是陣列
        textures[indexI] = {};
        item.Postfix.forEach((boxFace, indexB) => {
            // 需要用到運算過後的變數名稱
            textures[indexI][boxFace] = useLoader(
                THREE.TextureLoader,
                // Box['_0A']
                Box[`_${item.ID}${boxFace}`]
            );
            textures[indexI][boxFace].anisotropy = 4;
            textures[indexI][boxFace].minFilter = THREE.LinearFilter;
            textures[indexI][boxFace].magFilter = THREE.LinearFilter;
            textures[indexI][boxFace].wrapS = THREE.RepeatWrapping;
            textures[indexI][boxFace].wrapT = THREE.RepeatWrapping;
        });
    });

    // console.log(textures);
    return textures;
}

export default myTextureLoader;
