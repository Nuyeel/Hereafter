import { useState, useEffect, useContext, createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API_NEXTLIFE } from '../../config/ajax-path';

import AuthContext from '../../context/AuthContext/AuthContext';
import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
import MeshContext from '../../context/MeshContext/MeshContext';

import NextLifeStageIndicator from './components/NextLifeStageIndicator';
import NextLifeInteractionButton from './components/NextLifeInteractionButton';
import NextLifeMusic from './subpages/NextLifeMusic';
import NextLifeText from './subpages/NextLifeText';
import NextLifeSample from './subpages/NextLifeSample';
import NextLifeCube from './subpages/NextLifeCube';

import './NextLife.scss';
import cubeTextLoader from './utils/texture/cubeTextLoader';

import Swal from 'sweetalert2';
import OutlineSoul from '../../images/sweetalert2/outline_soul.svg';

// TODO: 來生頁面會強制轉換為生者配色
// DONE: 如果要記得會員的選擇 這功能也可以改成在 Background.jsx 做
// FIXME: 強制鎖住配色 可以做在 Nav 也可以做在 useLayoutEffect()

// TODO: 這一頁的寫法 應該是相同頁面 step render
// TODO: 先做 step 2 的狀況

function NextLife(props) {
    const { pageName } = props;
    const { account, token, isDead } = useContext(AuthContext);
    const { setTheme } = useContext(ThemeContext);
    const { setHeader } = useContext(HeaderContext);
    const meshesData = useContext(MeshContext);
    const navigate = useNavigate();
    const canvasRef = createRef();

    //const [isPending, startTransition] = useTransition()
    // FIXME: 測試時調這邊
    const [nextLifeStage, setNextLifeStage] = useState(0);
    const [cubeAnimationState, setCubeAnimationState] = useState(false);
    const [cubeRotatingStyle, setCubeRotatingStyle] = useState('classic');

    const [musicIsHidden, setMusicIsHidden] = useState(false);

    const [sampleIsHidden, setSampleIsHidden] = useState(false);

    const [textIsHidden, setTextIsHidden] = useState(false);
    const [nextLifeTextareaString, setNextLifeTextareaString] = useState('');

    const [cubeIsMaking, setCubeIsMaking] = useState(false);
    const [currentCubeOptionIndex, setCurrentCubeOptionIndex] = useState(0);
    const [currentCubeColorIndex, setCurrentCubeColorIndex] = useState(0);

    // 用來控制方塊做好了以後的動畫的 trigger
    const [cubeIsDone, setCubeIsDone] = useState(false);
    const [nextLifeIsOutro, setNextLifeIsOutro] = useState(false);

    const [nextLifeCubeIsMade, setNextLifeCubeIsMade] = useState(null);

    const wrapText = (
        context,
        text,
        x,
        y,
        account,
        x2,
        y2,
        maxWidth,
        lineHeight,
        scale
    ) => {
        const words = text.split('');
        let line = '';

        context.scale(scale, scale);

        for (let n = 0; n < words.length; n++) {
            let testLine = line + words[n];
            let metrics = context.measureText(testLine);
            let testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n];
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);

        context.font = "italic 700 32px 'Noto Sans JP', sans-serif";
        context.fillText(account, x2, y2);
    };

    const handleCubeTextDraw = () => {
        // const width = 512;
        // const height = 512;
        const canvasScale = 4;

        // const size = 512 * canvasScale;
        const context = canvasRef.current.getContext('2d');
        canvasRef.current.width = canvasRef.current.height = 512 * canvasScale;
        context.font = `700 60px 'Noto Sans JP', sans-serif`;
        context.fillStyle =
            meshesData.fontColorsData[currentCubeColorIndex]['colorTop'];
        context.textAlign = 'left';
        context.textBaseline = 'alphabetic';

        const canvasX = 45;
        const canvasY = 95;
        const canvasX2 = 40;
        const canvasY2 = 467;
        const canvasMaxWidth = 432;
        const canvasLineHeight = 75;
        const canvasAccount = `@${account}`;
        const canvasText = nextLifeTextareaString;

        wrapText(
            context,
            canvasText,
            canvasX,
            canvasY,
            canvasAccount,
            canvasX2,
            canvasY2,
            canvasMaxWidth,
            canvasLineHeight,
            canvasScale
        );

        const cubeTextTexture = cubeTextLoader(
            meshesData.texturesData[currentCubeOptionIndex]['T'],
            canvasRef
        );

        meshesData.setMeshesMemoData((prevState) => {
            const newData = { ...prevState };
            // console.log('new', newData);
            newData.materialsData[currentCubeOptionIndex]['top'] =
                cubeTextTexture;
            return newData;
        });

        setTimeout(() => {
            // FIXME: 利用黑暗手法強制更新
            const newCurrentCubeOptionIndex = currentCubeOptionIndex - 1;
            setCurrentCubeOptionIndex(newCurrentCubeOptionIndex);
            setTimeout(() => {
                setCurrentCubeOptionIndex(newCurrentCubeOptionIndex + 1);
            }, 0);
            setCubeIsDone(true);
        }, 4000);
    };

    // console.log(meshesData);

    const axiosCubeIsMadeGET = async () => {
        const result = await axios.get(API_NEXTLIFE, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(result.data);

        if (result.data.cubeIsMadeResult) {
            Swal.fire({
                title: '您已經製作過希望方塊囉～',
                imageUrl: OutlineSoul,
                imageHeight: 50,
                imageWidth: 50,
                showConfirmButton: false,
            });
        }
        setNextLifeCubeIsMade(result.data.cubeIsMadeResult);
    };

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, [pageName, setHeader]);

    // 強制將主題配色轉換為淺色
    // FIXME: 如果要記得會員的選擇 這功能也可以改成在 Background.jsx 做
    useEffect(() => {
        setTheme(themes.light);
    }, []);

    // TODO: 還活著就跳轉
    // 沒登入 isDead 也是 false 所以統一判斷即可
    useEffect(() => {
        if (!isDead) {
            navigate('/', { replace: true });
        }
    }, []);

    // useEffect 中去找有沒有製作過來生方塊
    useEffect(() => {
        axiosCubeIsMadeGET();
    }, []);

    // TODO: 如果條件渲染的時間點 是在條件吻合時才回初次運作
    // 則應該一開始就讀入最重要的 component 以達成預載

    // FIXME: 至寧醬：先把其中的條件渲染拿掉 阻擋做在連結處就好

    return (
        <>
            {nextLifeCubeIsMade === true ? (
                <div className="container cpl-nextlifer-container-isMade d-flex justify-content-center align-items-center">
                    See You NextLife!
                </div>
            ) : (
                ''
            )}
            {nextLifeCubeIsMade === false ? (
                <div className="container-fluid cpl-nextlife-container-fluid p-0">
                    {nextLifeStage === 0 ? (
                        <NextLifeMusic
                            setNextLifeStage={setNextLifeStage}
                            musicIsHidden={musicIsHidden}
                            setMusicIsHidden={setMusicIsHidden}
                        />
                    ) : (
                        ''
                    )}
                    {nextLifeStage >= 1 ? (
                        <NextLifeStageIndicator
                            nextLifeStage={nextLifeStage}
                            cubeIsMaking={cubeIsMaking}
                        />
                    ) : (
                        ''
                    )}
                    {nextLifeStage === 1 ? (
                        <NextLifeSample
                            nextLifeStage={nextLifeStage}
                            setNextLifeStage={setNextLifeStage}
                            cubeAnimationState={cubeAnimationState}
                            setCubeAnimationState={setCubeAnimationState}
                            sampleIsHidden={sampleIsHidden}
                            setSampleIsHidden={setSampleIsHidden}
                        />
                    ) : (
                        ''
                    )}
                    {nextLifeStage >= 2 ? (
                        <NextLifeInteractionButton
                            nextLifeStage={nextLifeStage}
                            setNextLifeStage={setNextLifeStage}
                            nextLifeTextareaString={nextLifeTextareaString}
                            setTextIsHidden={setTextIsHidden}
                            cubeIsMaking={cubeIsMaking}
                            setCubeIsMaking={setCubeIsMaking}
                            currentCubeOptionIndex={currentCubeOptionIndex}
                            handleCubeTextDraw={handleCubeTextDraw}
                        />
                    ) : (
                        ''
                    )}
                    {nextLifeStage === 2 ? (
                        <NextLifeText
                            nextLifeStage={nextLifeStage}
                            textIsHidden={textIsHidden}
                            nextLifeTextareaString={nextLifeTextareaString}
                            setNextLifeTextareaString={
                                setNextLifeTextareaString
                            }
                        />
                    ) : (
                        ''
                    )}
                    {nextLifeStage === 3 ? (
                        <NextLifeCube
                            cubeAnimationState={cubeAnimationState}
                            setCubeAnimationState={setCubeAnimationState}
                            cubeIsMaking={cubeIsMaking}
                            cubeRotatingStyle={cubeRotatingStyle}
                            setCubeRotatingStyle={setCubeRotatingStyle}
                            currentCubeOptionIndex={currentCubeOptionIndex}
                            nextLifeTextareaString={nextLifeTextareaString}
                            ref={canvasRef}
                            setCurrentCubeOptionIndex={
                                setCurrentCubeOptionIndex
                            }
                            currentCubeColorIndex={currentCubeColorIndex}
                            setCurrentCubeColorIndex={setCurrentCubeColorIndex}
                            cubeIsDone={cubeIsDone}
                        />
                    ) : (
                        ''
                    )}
                </div>
            ) : (
                ''
            )}
        </>
    );
}

export default NextLife;
