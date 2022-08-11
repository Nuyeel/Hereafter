import { useState, useEffect, useRef, useMemo, Suspense, createRef } from 'react';

import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';

import Scene from './Scene05';
import './NextLifeCube.scss';

function NextLifeCube(props) {
    const { meshesData, cubeAnimationState, setCubeAnimationState } = props;

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [eachCubeSize, setEachCubeSize] = useState(0);
    const indexRef = createRef(null);

    const [bubuNum, setBubuNum] = useState(0);

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
            Math.min(dimensions.width, dimensions.height) / 10
        );
        // console.log(size);

        setEachCubeSize(size);

        // cleaner function (willUnmount)
        return () => window.removeEventListener('resize', handleResize);
    });

    return (
        <>
            <button
                style={{
                    color: '#000',
                    position: 'absolute',
                    zIndex: 400000000,
                }}
                onClick={() => {
                    // 其實只要數字變小就會壞掉
                    let newBubuNum = bubuNum + 1;
                    newBubuNum = newBubuNum % 35;
                    console.log(newBubuNum);
                    setBubuNum(newBubuNum);
                }}
            >
                {bubuNum}
            </button>
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
                        <Scene
                            eachCubeSize={eachCubeSize}
                            bubuNum={bubuNum}
                            ref={indexRef}
                            meshesData={meshesData}
                            cubeAnimationState={cubeAnimationState}
                            setCubeAnimationState={setCubeAnimationState}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </>
    );
}

export default NextLifeCube;
