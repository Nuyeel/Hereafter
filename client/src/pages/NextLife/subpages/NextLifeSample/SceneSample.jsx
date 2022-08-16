import { useRef, forwardRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';

import gsap from 'gsap';

import * as THREE from 'three';

// 用 37 號當成 Sample 吧
import sampleText from '../../../../images/NextLifeCube/text/shinderWife.png';
import shaderMap from '../../utils/shader/shaderMap';

function SceneSample(props, ref) {
    const {
        eachCubeSize,
        meshesData,
        cubeAnimationState,
        setCubeAnimationState,
    } = props;
    const meshRef = useRef(null);

    // 這裡處理材質疊加
    const sampleTextTexture = useLoader(THREE.TextureLoader, sampleText);
    const sampleMaterial = {
        uniforms: {
            textureT: { value: meshesData.texturesData[33]['T'] },
            textureText: { value: sampleTextTexture },
        },
        vertexShader: shaderMap.v,
        fragmentShader: shaderMap.t,
    };

    useFrame(() => {
        meshRef.current.rotation.y += 0.01;

        if (!cubeAnimationState) {
            gsap.to(meshesData.materialsData[33]['side'].uniforms.circ_time, {
                duration: 0.5,
                value: 0.0,
                ease: 'circ.out',
            });
            gsap.to(
                meshesData.materialsData[33]['side'].uniforms.elastic_time,
                {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'elastic.out(1, 0.3)',
                }
            );
            gsap.to(
                meshesData.materialsData[33]['side'].uniforms
                    .elastic_drastic_time,
                {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'elastic.out(1.5, 0.3)',
                }
            );

            if (
                meshesData.materialsData[33]['side'].uniforms.circ_time
                    .value === 0.0
            ) {
                meshesData.materialsData[33][
                    'side'
                ].uniforms.circ_time.value = 1.0;
                meshesData.materialsData[33][
                    'side'
                ].uniforms.elastic_time.value = 1.0;
                meshesData.materialsData[33][
                    'side'
                ].uniforms.elastic_drastic_time.value = 1.0;

                if (
                    meshesData.materialsData[33]['side'].uniforms.animate
                        .value === 1.0
                ) {
                    meshesData.materialsData[33][
                        'side'
                    ].uniforms.animate.value = 2.0;
                } else {
                    meshesData.materialsData[33][
                        'side'
                    ].uniforms.animate.value = 1.0;
                }
            }

            setCubeAnimationState(true);

            setTimeout(() => {
                setCubeAnimationState(false);
            }, 1200);
        }
    });

    return (
        <>
            <mesh ref={meshRef}>
                <boxBufferGeometry
                    attach="geometry"
                    args={[eachCubeSize, eachCubeSize, eachCubeSize]}
                />
                <shaderMaterial
                    attach="material-0"
                    {...meshesData.materialsData[33]['side']}
                    transparent
                />
                <shaderMaterial
                    attach="material-1"
                    {...meshesData.materialsData[33]['side']}
                    transparent
                />
                <shaderMaterial
                    attach="material-2"
                    {...sampleMaterial}
                    transparent
                />
                <shaderMaterial
                    attach="material-3"
                    {...sampleMaterial}
                    transparent
                />
                <shaderMaterial
                    attach="material-4"
                    {...meshesData.materialsData[33]['side']}
                    transparent
                />
                <shaderMaterial
                    attach="material-5"
                    {...meshesData.materialsData[33]['side']}
                    transparent
                />
            </mesh>
        </>
    );
}

export default forwardRef(SceneSample);
