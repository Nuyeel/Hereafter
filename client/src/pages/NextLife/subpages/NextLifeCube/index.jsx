import {
    useState,
    useEffect,
    Suspense,
    createRef,
    useContext,
    forwardRef,
} from 'react';

import { Canvas } from '@react-three/fiber';
// import { Stats } from '@react-three/drei';

import MeshContext from '../../../../context/MeshContext/MeshContext';

import Scene from './Scene';

// TiArrowSync
// TbArrowsRightLeft
// TbBox
// BsBox
// FiBox

import { FiBox } from 'react-icons/fi';

import CubeIsMakingSVG from '../../components/animation/CubeIsMakingSVG';

import './NextLifeCube.scss';
import NextLifeCubeIsMakingCanvas from '../../components/NextLifeCubeIsMakingCanvas/index.jsx';

function NextLifeCube(props, ref) {
    const {
        cubeAnimationState,
        setCubeAnimationState,
        cubeIsMaking,
        cubeRotatingStyle,
        setCubeRotatingStyle,
        currentCubeOptionIndex,
        setCurrentCubeOptionIndex,
        currentCubeColorIndex,
        setCurrentCubeColorIndex,
    } = props;

    const meshesData = useContext(MeshContext);

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [eachCubeSize, setEachCubeSize] = useState(0);
    const [stylishTimer, setStylishTimer] = useState(0);
    const [timeoutID, setTimeoutID] = useState(0);
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

        setEachCubeSize(size);

        // cleaner function (willUnmount)
        return () => window.removeEventListener('resize', handleResize);
    }, [dimensions]);

    return (
        <>
            <NextLifeCubeIsMakingCanvas ref={ref} />
            <div
                className={`container nlCubeSwap ${
                    cubeIsMaking ? 'isMaking' : 'isShown'
                }`}
            >
                <button
                    className="nlCubeSwap-button"
                    onClick={() => {
                        // 其實只要數字變小就會壞掉
                        let newCurrentCubeOptionIndex =
                            currentCubeOptionIndex + 1;

                        let newCurrentCubeColorIndex =
                            currentCubeColorIndex + 1;
                        newCurrentCubeColorIndex =
                            newCurrentCubeColorIndex % 34;
                        setCurrentCubeColorIndex(newCurrentCubeColorIndex);

                        // FIXME: 超怪的...
                        if (newCurrentCubeOptionIndex === 34) {
                            newCurrentCubeOptionIndex = 0;
                            setCurrentCubeOptionIndex(-1);
                            return setTimeout(() => {
                                setCurrentCubeOptionIndex(
                                    newCurrentCubeOptionIndex
                                );
                                setCubeRotatingStyle('stylish');

                                if (timeoutID > 0) {
                                    clearTimeout(timeoutID);
                                }

                                return setTimeoutID(
                                    setTimeout(() => {
                                        setCubeRotatingStyle('classic');
                                    }, 500)
                                );
                            }, 0);
                        }
                        setCurrentCubeOptionIndex(newCurrentCubeOptionIndex);
                        setCubeRotatingStyle('stylish');

                        if (timeoutID > 0) {
                            clearTimeout(timeoutID);
                        }

                        return setTimeoutID(
                            setTimeout(() => {
                                setCubeRotatingStyle('classic');
                            }, 500)
                        );
                        // console.log(newcurrentCubeOptionIndex);
                    }}
                >
                    <FiBox className="nlCubeSwap-button-Fibox" />
                    <p className="nlCubeSwap-button-paragraph">Change</p>
                </button>
            </div>
            <div
                className={`container nlCubeMakingCircle d-flex justify-content-center align-items-center ${
                    eachCubeSize <= 54 && cubeIsMaking ? 'isShown' : ''
                }`}
            >
                <CubeIsMakingSVG
                    colorOne={
                        meshesData.fontColorsData[currentCubeColorIndex][
                            'colorOne'
                        ]
                    }
                    colorTwo={
                        meshesData.fontColorsData[currentCubeColorIndex][
                            'colorTwo'
                        ]
                    }
                />
            </div>
            <div
                className={`cpl-nextlife-magic-cube-container nlCube ${
                    cubeIsMaking ? '' : 'isShown'
                }`}
            >
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
                            setEachCubeSize={setEachCubeSize}
                            currentCubeOptionIndex={currentCubeOptionIndex}
                            ref={indexRef}
                            meshesData={meshesData}
                            cubeAnimationState={cubeAnimationState}
                            stylishTimer={stylishTimer}
                            setStylishTimer={setStylishTimer}
                            setCubeAnimationState={setCubeAnimationState}
                            cubeRotatingStyle={cubeRotatingStyle}
                            cubeIsMaking={cubeIsMaking}
                        />
                        {/* <Stats /> */}
                    </Suspense>
                </Canvas>
            </div>
        </>
    );
}

export default forwardRef(NextLifeCube);
