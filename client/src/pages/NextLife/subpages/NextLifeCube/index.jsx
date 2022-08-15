import { useState, useEffect, Suspense, createRef } from 'react';

import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';

import Scene from './Scene';

// TiArrowSync
// TbArrowsRightLeft
// TbBox
// BsBox
// FiBox

import { FiBox } from 'react-icons/fi';

import './NextLifeCube.scss';

function NextLifeCube(props) {
    const { meshesData, cubeAnimationState, setCubeAnimationState } = props;

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [eachCubeSize, setEachCubeSize] = useState(0);
    const indexRef = createRef(null);

    const [currentCubeOptionIndex, setCurrentCubeOptionIndex] = useState(0);

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
    }, [dimensions]);

    return (
        <>
            <div className={`container nlCubeSwap isShown`}>
                <button
                    className="nlCubeSwap-button"
                    onClick={() => {
                        // 其實只要數字變小就會壞掉
                        let newcurrentCubeOptionIndex =
                            currentCubeOptionIndex + 1;
                        // newcurrentCubeOptionIndex = newcurrentCubeOptionIndex % 35;
                        // FIXME: 超怪的...
                        if (newcurrentCubeOptionIndex === 34) {
                            newcurrentCubeOptionIndex = 0;
                            setCurrentCubeOptionIndex(-1);
                            return setTimeout(() => {
                                setCurrentCubeOptionIndex(
                                    newcurrentCubeOptionIndex
                                );
                            }, 0);
                        }
                        setCurrentCubeOptionIndex(newcurrentCubeOptionIndex);
                        // console.log(newcurrentCubeOptionIndex);
                    }}
                >
                    <FiBox /> 更換樣式
                </button>
            </div>
            <div className={`cpl-nextlife-magic-cube-container nlCube`}>
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
                            currentCubeOptionIndex={currentCubeOptionIndex}
                            ref={indexRef}
                            meshesData={meshesData}
                            cubeAnimationState={cubeAnimationState}
                            setCubeAnimationState={setCubeAnimationState}
                        />
                        <Stats />
                    </Suspense>
                </Canvas>
            </div>
        </>
    );
}

export default NextLifeCube;
