import { useRef, useMemo, Fragment, forwardRef } from 'react';

import { useLoader, useFrame } from '@react-three/fiber';

import * as THREE from 'three';
import { gsap } from 'gsap';

// FIXME: 有先裝 GSAP

import * as Box from '../../utils/box/box';
import boxMap from '../../utils/box/boxMap';
// import shaderMap from '../../utils/shader/shaderMap';

import myTextureLoader from '../../utils/texture/myTextureLoader';
import myMaterialLoader from '../../utils/material/myMaterialLoader';

function Scene(props, ref) {
    const { eachCubeSize, bubuNum, cubeAnimationState, setCubeAnimationState } = props;
    const meshRef = useRef(null);

    const meshesData = useMemo(() => {
        const textures = myTextureLoader();

        let materialsData = [];

        boxMap.forEach((item, index) => {
            materialsData.push(myMaterialLoader(item.ID, textures[index]));
        });

        return materialsData;
    }, []);

    // console.log(meshesData);

    useFrame(() => {
        // meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
        // meshRef.current.rotation.z += 0.01;

        if (!cubeAnimationState) {
            const pooNumArray = [1, 2, 3, 4, 5, 6];

            for (let pooNum = 1; pooNum <= 6; pooNum++) {
                gsap.to(meshesData[pooNum].uniforms.none_time, {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'none',
                });
                gsap.to(meshesData[pooNum].uniforms.power2_time, {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'power2.out',
                });
                gsap.to(meshesData[pooNum].uniforms.power3_time, {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'power3.out',
                });
                gsap.to(meshesData[pooNum].uniforms.power4_time, {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'power4.out',
                });
                gsap.to(meshesData[pooNum].uniforms.elastic_time, {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'elastic.out(1, 0.3)',
                });
                gsap.to(meshesData[pooNum].uniforms.elastic_drastic_time, {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'elastic.out(1.5, 0.3)',
                });
                gsap.to(meshesData[pooNum].uniforms.circ_in_time, {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'circ.in',
                });
                gsap.to(meshesData[pooNum].uniforms.circ_time, {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'circ.out',
                });
                gsap.to(meshesData[pooNum].uniforms.expo_time, {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'expo.out',
                });

                if (meshesData[pooNum].uniforms.none_time.value === 0.0) {
                    meshesData[pooNum].uniforms.none_time.value = 1.0;
                    meshesData[pooNum].uniforms.power2_time.value = 1.0;
                    meshesData[pooNum].uniforms.power3_time.value = 1.0;
                    meshesData[pooNum].uniforms.power4_time.value = 1.0;
                    meshesData[pooNum].uniforms.elastic_time.value = 1.0;
                    meshesData[
                        pooNum
                    ].uniforms.elastic_drastic_time.value = 1.0;
                    meshesData[pooNum].uniforms.circ_in_time.value = 1.0;
                    meshesData[pooNum].uniforms.circ_time.value = 1.0;
                    meshesData[pooNum].uniforms.expo_time.value = 1.0;

                    if (meshesData[pooNum].uniforms.animate.value === 1.0) {
                        meshesData[pooNum].uniforms.animate.value = 2.0;
                    } else {
                        meshesData[pooNum].uniforms.animate.value = 1.0;
                    }
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
                    {...meshesData[1]}
                    transparent
                />
                <shaderMaterial
                    attach="material-1"
                    {...meshesData[2]}
                    transparent
                />
                <shaderMaterial
                    attach="material-2"
                    {...meshesData[3]}
                    transparent
                />
                <shaderMaterial
                    attach="material-3"
                    {...meshesData[4]}
                    transparent
                />
                <shaderMaterial
                    attach="material-4"
                    {...meshesData[5]}
                    transparent
                />
                <shaderMaterial
                    attach="material-5"
                    {...meshesData[6]}
                    transparent
                />
                {/* {meshesData &&
                    meshesData.map((v, i) => {
                        return (
                            <Fragment key={i}>
                                {bubuNum === i ? (
                                    <shaderMaterial
                                        attach="material"
                                        {...meshesData[i]}
                                        transparent
                                    />
                                ) : (
                                    ''
                                )}
                            </Fragment>
                        );
                    })} */}
            </mesh>
        </>
    );
}

export default forwardRef(Scene);
