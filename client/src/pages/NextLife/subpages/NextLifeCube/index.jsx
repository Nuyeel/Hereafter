import { useState, useEffect, useRef, useMemo, Suspense } from 'react';
// import {} from 'three';
// import { createRoot } from 'react-dom/client';

import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';

import Scene from './Scene';
import './NextLifeCube.scss';

function NextLifeCube() {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [eachCubeSize, setEachCubeSize] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        };

        window.addEventListener('resize', handleResize);

        // FIXME: 先大概抓個尺寸
        // FIXME: 可以考慮用 debounce 減少效能損耗
        const size = Math.floor(
            Math.min(dimensions.width, dimensions.height) / 15
        );
        // console.log(size);

        setEachCubeSize(size);

        // cleaner function (willUnmount)
        return () => window.removeEventListener('resize', handleResize);
    });

    return (
        <div className={`cpl-nextlife-magic-cube-container`}>
            <Canvas
                camera={{
                    fov: 70,
                    near: 0.1,
                    far: 10000,
                    position: [0, 100, 150],
                }}
            >
                <Suspense fallback={null}>
                    <Scene eachCubeSize={eachCubeSize} />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default NextLifeCube;
