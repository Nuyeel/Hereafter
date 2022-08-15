import { useRef, Fragment, forwardRef } from 'react';

import { useFrame } from '@react-three/fiber';

import { gsap } from 'gsap';

function Scene(props, ref) {
    const {
        eachCubeSize,
        meshesData,
        currentCubeOptionIndex,
        cubeAnimationState,
        setCubeAnimationState,
    } = props;
    const meshRef = useRef(null);

    // console.log(meshesData);

    useFrame(() => {
        meshRef.current.rotation.y += 0.01;

        if (!cubeAnimationState) {
            gsap.to(
                meshesData.materialsData[currentCubeOptionIndex]['side']
                    .uniforms.none_time,
                {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'none',
                }
            );
            gsap.to(
                meshesData.materialsData[currentCubeOptionIndex]['side']
                    .uniforms.power2_time,
                {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'power2.out',
                }
            );
            gsap.to(
                meshesData.materialsData[currentCubeOptionIndex]['side']
                    .uniforms.power3_time,
                {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'power3.out',
                }
            );
            gsap.to(
                meshesData.materialsData[currentCubeOptionIndex]['side']
                    .uniforms.power4_time,
                {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'power4.out',
                }
            );
            gsap.to(
                meshesData.materialsData[currentCubeOptionIndex]['side']
                    .uniforms.elastic_time,
                {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'elastic.out(1, 0.3)',
                }
            );
            gsap.to(
                meshesData.materialsData[currentCubeOptionIndex]['side']
                    .uniforms.elastic_drastic_time,
                {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'elastic.out(1.5, 0.3)',
                }
            );
            gsap.to(
                meshesData.materialsData[currentCubeOptionIndex]['side']
                    .uniforms.circ_in_time,
                {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'circ.in',
                }
            );
            gsap.to(
                meshesData.materialsData[currentCubeOptionIndex]['side']
                    .uniforms.circ_time,
                {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'circ.out',
                }
            );
            gsap.to(
                meshesData.materialsData[currentCubeOptionIndex]['side']
                    .uniforms.expo_time,
                {
                    duration: 0.5,
                    value: 0.0,
                    ease: 'expo.out',
                }
            );

            if (
                meshesData.materialsData[currentCubeOptionIndex]['side']
                    .uniforms.none_time.value === 0.0
            ) {
                meshesData.materialsData[currentCubeOptionIndex][
                    'side'
                ].uniforms.none_time.value = 1.0;
                meshesData.materialsData[currentCubeOptionIndex][
                    'side'
                ].uniforms.power2_time.value = 1.0;
                meshesData.materialsData[currentCubeOptionIndex][
                    'side'
                ].uniforms.power3_time.value = 1.0;
                meshesData.materialsData[currentCubeOptionIndex][
                    'side'
                ].uniforms.power4_time.value = 1.0;
                meshesData.materialsData[currentCubeOptionIndex][
                    'side'
                ].uniforms.elastic_time.value = 1.0;
                meshesData.materialsData[currentCubeOptionIndex][
                    'side'
                ].uniforms.elastic_drastic_time.value = 1.0;
                meshesData.materialsData[currentCubeOptionIndex][
                    'side'
                ].uniforms.circ_in_time.value = 1.0;
                meshesData.materialsData[currentCubeOptionIndex][
                    'side'
                ].uniforms.circ_time.value = 1.0;
                meshesData.materialsData[currentCubeOptionIndex][
                    'side'
                ].uniforms.expo_time.value = 1.0;

                if (
                    meshesData.materialsData[currentCubeOptionIndex]['side']
                        .uniforms.animate.value === 1.0
                ) {
                    meshesData.materialsData[currentCubeOptionIndex][
                        'side'
                    ].uniforms.animate.value = 2.0;
                } else {
                    meshesData.materialsData[currentCubeOptionIndex][
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
                {meshesData &&
                    meshesData.materialsData.map((v, i) => {
                        return (
                            <Fragment key={i}>
                                {currentCubeOptionIndex === i ? (
                                    <>
                                        <shaderMaterial
                                            attach="material-0"
                                            {...meshesData.materialsData[i][
                                                'side'
                                            ]}
                                            transparent
                                        />
                                        <shaderMaterial
                                            attach="material-1"
                                            {...meshesData.materialsData[i][
                                                'side'
                                            ]}
                                            transparent
                                        />
                                        <shaderMaterial
                                            attach="material-2"
                                            {...meshesData.materialsData[i][
                                                'top'
                                            ]}
                                            transparent
                                        />
                                        <shaderMaterial
                                            attach="material-3"
                                            {...meshesData.materialsData[i][
                                                'top'
                                            ]}
                                            transparent
                                        />
                                        <shaderMaterial
                                            attach="material-4"
                                            {...meshesData.materialsData[i][
                                                'side'
                                            ]}
                                            transparent
                                        />
                                        <shaderMaterial
                                            attach="material-5"
                                            {...meshesData.materialsData[i][
                                                'side'
                                            ]}
                                            transparent
                                        />
                                    </>
                                ) : (
                                    ''
                                )}
                            </Fragment>
                        );
                    })}
            </mesh>
        </>
    );
}

export default forwardRef(Scene);
