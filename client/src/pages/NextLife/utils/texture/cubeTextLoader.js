import * as THREE from 'three';

import shaderMap from '../shader/shaderMap';

function cubeTextLoader(texture, ref) {
    console.log('ref', ref);
    console.log('ref.c', ref.current);
    const cubeTextTexture = new THREE.CanvasTexture(ref.current);
    console.log('cubeTextTexture', cubeTextTexture);
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
