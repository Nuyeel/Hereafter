import { useRef, useMemo } from 'react';

import { useLoader, useFrame } from '@react-three/fiber';
import { Stats } from 'three/examples/jsm/libs/stats.module';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';

// FIXME: 有先裝 GSAP

import * as Box from '../../utils/box/box';
import boxMap from '../../utils/box/boxMap';

function Scene(props) {
    const { eachCubeSize } = props;
    const meshRef = useRef(null);

    useFrame(() => {
        // meshRef.current.rotation.x += 0.01;
        // meshRef.current.rotation.y += 0.01;
        // meshRef.current.rotation.z += 0.01;
    });

    // map1: Right
    // map2: Left
    // map3: Top
    // map4: Bottom
    // map5: Front
    // map6: Back
    const [map1, map2, map3, map4, map5, map6] = useLoader(TextureLoader, [
        Box._6A,
        Box._6A,
        Box._6T,
        Box._6T,
        Box._6B,
        Box._6A,
    ]);

    return (
        <>
            {/* <ambientLight intensity={0.2} /> */}
            {/* <pointLight
                position={[
                    eachCubeSize * 2,
                    eachCubeSize * 2,
                    eachCubeSize * 2,
                ]}
            /> */}
            {/* FIXME: Material-attach 要規劃一下 */}
            <mesh ref={meshRef}>
                <boxBufferGeometry
                    attach="geometry"
                    args={[eachCubeSize, eachCubeSize, eachCubeSize]}
                />
                <meshBasicMaterial map={map1} attach="material-0" transparent />
                <meshBasicMaterial map={map2} attach="material-1" transparent />
                <meshBasicMaterial map={map3} attach="material-2" transparent />
                <meshBasicMaterial map={map4} attach="material-3" transparent />
                <meshBasicMaterial map={map5} attach="material-4" transparent />
                <meshBasicMaterial map={map6} attach="material-5" transparent />
            </mesh>
        </>
    );
}

export default Scene;
