import boxMap from '../box/boxMap';
import shaderMap from '../shader/shaderMap';

import myTextureLoader from '../texture/myTextureLoader';

function myMaterialLoader(boxID, textureItem) {
    // 預設值先給所有時間和動畫類型變數
    const material = {
        side: {},
        top: {},
    };

    const uniform = {
        none_time: {
            value: 1.0,
        },
        power2_time: {
            value: 1.0,
        },
        power3_time: {
            value: 1.0,
        },
        power4_time: {
            value: 1.0,
        },
        elastic_time: {
            value: 1.0,
        },
        elastic_drastic_time: {
            value: 1.0,
        },
        circ_in_time: {
            value: 1.0,
        },
        circ_time: {
            value: 1.0,
        },
        expo_time: {
            value: 1.0,
        },
        animate: {
            value: 1.0,
        },
    };

    const box = boxMap.filter((item) => item.ID === boxID)[0];
    material['side']['vertexShader'] = shaderMap.v;
    material['side']['fragmentShader'] = shaderMap[`f${boxID}`];

    box.Postfix.forEach((boxFace) => {
        if (boxFace !== 'T') {
            uniform[`texture${boxFace}`] = { value: textureItem[boxFace] };
        } else {
            material['top']['vertexShader'] = shaderMap.v;
            material['top']['fragmentShader'] = shaderMap['tt'];
            material['top']['uniforms'] = {
                textureT: { value: textureItem[boxFace] },
            };
        }
    });

    material['side']['uniforms'] = uniform;

    return material;
}

export default myMaterialLoader;
