import { useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';

import * as THREE from 'three';

import gsap from 'gsap';

import position from '../../utils/position/postion';
import {
    horizontalArrayOne,
    horizontalArrayTwo,
    horizontalArrayThree,
} from '../../utils/position/horizontal';

function SceneSample(props, ref) {
    const {
        eachCubeSize,
        meshesData,
        cubeAnimationState,
        setCubeAnimationState,
    } = props;

    // FIXME: 先使用 1.04 的間距比例
    const positionArray = position(eachCubeSize, 1.04);

    // FIXME: 有機會再改成 forwardRef()
    const groupRef_1 = useRef(null);
    const groupRef_2 = useRef(null);
    const groupRef_3 = useRef(null);

    // console.log(sampleMaterial);

    useFrame(() => {
        groupRef_1.current.rotation.y -= 0.005;
        groupRef_2.current.rotation.y += 0.005;
        groupRef_3.current.rotation.y -= 0.005;
    });

    return (
        <>
            <group ref={groupRef_1}>
                {horizontalArrayOne &&
                    horizontalArrayOne.map((v, i) => {
                        return (
                            <mesh
                                key={`groupOne-${i}`}
                                position={
                                    positionArray[horizontalArrayOne[i] - 1]
                                }
                            >
                                <boxBufferGeometry
                                    attach="geometry"
                                    args={[
                                        eachCubeSize,
                                        eachCubeSize,
                                        eachCubeSize,
                                    ]}
                                />
                                {i % 2 === 0 ? (
                                    <>
                                        <shaderMaterial
                                            attach="material-0"
                                            {...meshesData.materialsData[i][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-1"
                                            {...meshesData.materialsData[i][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-2"
                                            {...meshesData.materialsData[i][
                                                'sample'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-3"
                                            {...meshesData.materialsData[i][
                                                'sample'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-4"
                                            {...meshesData.materialsData[i][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-5"
                                            {...meshesData.materialsData[i][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                    </>
                                ) : (
                                    ''
                                )}
                                {i === 1 || i === 7 ? (
                                    <>
                                        <shaderMaterial
                                            attach="material-0"
                                            {...meshesData.materialsData[i][
                                                'sample'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-1"
                                            {...meshesData.materialsData[i][
                                                'sample'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-2"
                                            {...meshesData.materialsData[i][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-3"
                                            {...meshesData.materialsData[i][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-4"
                                            {...meshesData.materialsData[i][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-5"
                                            {...meshesData.materialsData[i][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                    </>
                                ) : (
                                    ''
                                )}
                                {i === 3 || i === 5 ? (
                                    <>
                                        <shaderMaterial
                                            attach="material-0"
                                            {...meshesData.materialsData[i][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-1"
                                            {...meshesData.materialsData[i][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-2"
                                            {...meshesData.materialsData[i][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-3"
                                            {...meshesData.materialsData[i][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-4"
                                            {...meshesData.materialsData[i][
                                                'sample'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-5"
                                            {...meshesData.materialsData[i][
                                                'sample'
                                            ]}
                                            transparent={true}
                                        />
                                    </>
                                ) : (
                                    ''
                                )}
                            </mesh>
                        );
                    })}
            </group>
            <group ref={groupRef_2}>
                {horizontalArrayTwo &&
                    horizontalArrayTwo.map((v, i) => {
                        return (
                            <mesh
                                key={`groupTwo-${i}`}
                                position={
                                    positionArray[horizontalArrayTwo[i] - 1]
                                }
                            >
                                <boxBufferGeometry
                                    attach="geometry"
                                    args={[
                                        eachCubeSize,
                                        eachCubeSize,
                                        eachCubeSize,
                                    ]}
                                />
                                {i % 2 === 0 ? (
                                    <>
                                        <shaderMaterial
                                            attach="material-0"
                                            {...meshesData.materialsData[i + 9][
                                                'sample'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-1"
                                            {...meshesData.materialsData[i + 9][
                                                'sample'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-2"
                                            {...meshesData.materialsData[i + 9][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-3"
                                            {...meshesData.materialsData[i + 9][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-4"
                                            {...meshesData.materialsData[i + 9][
                                                'sample'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-5"
                                            {...meshesData.materialsData[i + 9][
                                                'sample'
                                            ]}
                                            transparent={true}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <shaderMaterial
                                            attach="material-0"
                                            {...meshesData.materialsData[i + 9][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-1"
                                            {...meshesData.materialsData[i + 9][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-2"
                                            {...meshesData.materialsData[i + 9][
                                                'sample'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-3"
                                            {...meshesData.materialsData[i + 9][
                                                'sample'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-4"
                                            {...meshesData.materialsData[i + 9][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-5"
                                            {...meshesData.materialsData[i + 9][
                                                'side'
                                            ]}
                                            transparent={true}
                                        />
                                    </>
                                )}
                            </mesh>
                        );
                    })}
            </group>
            <group ref={groupRef_3}>
                {horizontalArrayThree &&
                    horizontalArrayThree.map((v, i) => {
                        return (
                            <mesh
                                key={`groupThree-${i}`}
                                position={
                                    positionArray[horizontalArrayThree[i] - 1]
                                }
                            >
                                <boxBufferGeometry
                                    attach="geometry"
                                    args={[
                                        eachCubeSize,
                                        eachCubeSize,
                                        eachCubeSize,
                                    ]}
                                />
                                {i % 2 === 0 ? (
                                    <>
                                        <shaderMaterial
                                            attach="material-0"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['side']}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-1"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['side']}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-2"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['sample']}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-3"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['sample']}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-4"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['side']}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-5"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['side']}
                                            transparent={true}
                                        />
                                    </>
                                ) : (
                                    ''
                                )}
                                {i === 1 || i === 7 ? (
                                    <>
                                        <shaderMaterial
                                            attach="material-0"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['sample']}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-1"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['sample']}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-2"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['side']}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-3"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['side']}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-4"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['side']}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-5"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['side']}
                                            transparent={true}
                                        />
                                    </>
                                ) : (
                                    ''
                                )}
                                {i === 3 || i === 5 ? (
                                    <>
                                        <shaderMaterial
                                            attach="material-0"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['side']}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-1"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['side']}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-2"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['side']}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-3"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['side']}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-4"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['sample']}
                                            transparent={true}
                                        />
                                        <shaderMaterial
                                            attach="material-5"
                                            {...meshesData.materialsData[
                                                i + 18
                                            ]['sample']}
                                            transparent={true}
                                        />
                                    </>
                                ) : (
                                    ''
                                )}
                            </mesh>
                        );
                    })}
            </group>
        </>
    );
}

export default forwardRef(SceneSample);
