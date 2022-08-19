import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

import { sampleArray } from '../sample/sample';
import fontColorMap from '../fontcolor/fontColorMap';

// console.log(sampleArray);

function myTextTextureLoader() {
    // 存放所有 textures
    let textTextures = [];

    sampleArray.forEach((item, index) => {
        textTextures[index] = {};
        textTextures[index]['color'] = item['color'];
        textTextures[index]['texture'] = useLoader(
            THREE.TextureLoader,
            item['image']
        );
        textTextures[index]['texture'].anisotropy = 4;
        textTextures[index]['texture'].minFilter = THREE.LinearFilter;
        textTextures[index]['texture'].magFilter = THREE.LinearFilter;
        textTextures[index]['texture'].wrapS = THREE.RepeatWrapping;
        textTextures[index]['texture'].wrapT = THREE.RepeatWrapping;
    });

    // console.log(textTextures);

    let sampleTextTextures = [];

    fontColorMap.forEach((item, index) => {
        for (let i = 0; i < textTextures.length; i++) {
            if (item[2] === textTextures[i]['color']) {
                sampleTextTextures.push(textTextures[i]['texture']);
            }
        }
    });

    // console.log(sampleTextTextures);

    return sampleTextTextures;
}

export default myTextTextureLoader;
