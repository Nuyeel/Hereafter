import * as THREE from 'three';

import shaderMap from '../shader/shaderMap';

function cubeTextLoader(texture, ref) {
    // console.log('ref', ref);
    // console.log('ref.c', ref.current);
    const cubeTextTexture = new THREE.CanvasTexture(ref.current);
    cubeTextTexture.anisotropy = 4;
    cubeTextTexture.minFilter = THREE.LinearFilter;
    cubeTextTexture.magFilter = THREE.LinearFilter;
    cubeTextTexture.wrapS = THREE.RepeatWrapping;
    cubeTextTexture.wrapT = THREE.RepeatWrapping;
    // console.log('cubeTextTexture', cubeTextTexture);
    const cubeTextMaterial = {
        uniforms: {
            textureT: { value: texture },
            textureText: { value: cubeTextTexture },
        },
        vertexShader: shaderMap.v,
        fragmentShader: shaderMap.t,
    }

    return cubeTextMaterial;
}

export default cubeTextLoader;
