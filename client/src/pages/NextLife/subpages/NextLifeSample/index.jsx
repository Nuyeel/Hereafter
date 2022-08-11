import { useState, useEffect, Suspense, createRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei'

import SceneSample from './SceneSample';

function NextLifeSample(props) {
    const { meshesData, cubeAnimationState, setCubeAnimationState } = props;

    // 有空再統一搬去父層
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [eachCubeSize, setEachCubeSize] = useState(0);
    const indexRef = createRef(null);

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

        if (size < 50) {
            return setEachCubeSize(50);
        }

        setEachCubeSize(size);

        // cleaner function (willUnmount)
        return () => window.removeEventListener('resize', handleResize);
    });

    return (
        <div className={`cpl-nextlife-magic-cube-container`}>
            <div className="cpl-nmc-c-info-area">
                <p className="cpl-nmc-c-ia-explanation">
                    這是<span className="cpl-nmc-c-ia-e-span">希望方塊</span>
                    ，代表著古往今來人們對於今生的感慨與來生的期許。
                </p>

                <p className="cpl-nmc-c-ia-wishing">請您也留下心中的話語吧！</p>
            </div>
            <Canvas
                camera={{
                    fov: 70,
                    near: 0.1,
                    far: 10000,
                    position: [0, 150, 100],
                }}
            >
                <Suspense fallback={null}>
                    <SceneSample
                        eachCubeSize={eachCubeSize}
                        ref={indexRef}
                        meshesData={meshesData}
                        cubeAnimationState={cubeAnimationState}
                        setCubeAnimationState={setCubeAnimationState}
                    />
                    <Stats />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default NextLifeSample;
