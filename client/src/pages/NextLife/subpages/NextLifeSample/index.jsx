import { useState, useEffect, useContext, Suspense, createRef } from 'react';
import { Canvas } from '@react-three/fiber';
// import { Stats } from '@react-three/drei';

import MeshContext from '../../../../context/MeshContext/MeshContext';

import SceneSample from './SceneSample';

import './NextLifeSample.scss';

function NextLifeSample(props) {
    const {
        cubeAnimationState,
        setCubeAnimationState,
        setNextLifeStage,
        sampleIsHidden,
        setSampleIsHidden,
    } = props;

    const meshesData = useContext(MeshContext);

    // 有空再統一搬去父層
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [eachCubeSize, setEachCubeSize] = useState(0);
    const indexRef = createRef(null);

    const handleSampleSubmit = () => {
        const NewNextLifeStage = 2;
        console.log(NewNextLifeStage);

        setSampleIsHidden(true);

        if (NewNextLifeStage === 2) {
            setTimeout(() => {
                setNextLifeStage(NewNextLifeStage);
            }, 2000);
        }
    };

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

        if (size > 80) {
            return setEachCubeSize(80);
        }

        setEachCubeSize(size);

        // cleaner function (willUnmount)
        return () => window.removeEventListener('resize', handleResize);
    }, [dimensions]);

    return (
        <>
            <div
                className={`cpl-nmc-c-info-area ${
                    sampleIsHidden ? 'isHidden' : 'isShown'
                }`}
            >
                <p className="cpl-nmc-c-ia-explanation">
                    這是<span className="cpl-nmc-c-ia-e-span">希望方塊</span>
                    ，代表著古往今來人們對於今生的感慨與來生的期許。
                </p>

                <div className="cpl-nmc-c-ia-wishing d-flex justify-content-between align-items-center">
                    <p className="cpl-nmc-c-ia-w-text">
                        請您也留下心中的話語吧！
                    </p>
                    <button
                        className="cpl-nmc-c-ia-w-button"
                        onClick={() => {
                            handleSampleSubmit();
                        }}
                    >
                        {/* <DeedSoul fillColor="#FFFFFF" strokeColor="#FFFFFF" /> */}
                        <span className="cpl-nmc-c-ia-w-b-text">留下希望</span>
                    </button>
                </div>
            </div>
            <div
                className={`cpl-nextlife-magic-cube-container nlSample ${
                    sampleIsHidden ? 'isHidden' : 'isShown'
                }`}
            >
                {
                    <Canvas
                        camera={{
                            fov: 10,
                            near: 0.1,
                            far: 10000,
                            position: [0, 1440, 1920],
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
                            {/* <Stats /> */}
                        </Suspense>
                    </Canvas>
                }
            </div>
        </>
    );
}

export default NextLifeSample;
