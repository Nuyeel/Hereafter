import { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../context/AuthContext/AuthContext';
import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';

import NextLifeStageIndicator from './componenets/NextLifeStageIndicator';
import NextLifeInteractionButton from './componenets/NextLifeInteractionButton';
import NextLifeMusic from './subpages/NextLifeMusic';
import NextLifeText from './subpages/NextLifeText';
import NextLifeSample from './subpages/NextLifeSample';
import NextLifeCube from './subpages/NextLifeCube';

import myTextureLoader from './utils/texture/myTextureLoader';
import myMaterialLoader from './utils/material/myMaterialLoader';
import boxMap from './utils/box/boxMap';

import './NextLife.scss';

// TODO: 來生頁面會強制轉換為生者配色
// DONE: 如果要記得會員的選擇 這功能也可以改成在 Background.jsx 做
// FIXME: 強制鎖住配色 可以做在 Nav 也可以做在 useLayoutEffect()

// TODO: 這一頁的寫法 應該是相同頁面 step render
// TODO: 先做 step 2 的狀況

function NextLife(props) {
    const { pageName } = props;
    const { isDead } = useContext(AuthContext);
    const { setTheme } = useContext(ThemeContext);
    const { setHeader } = useContext(HeaderContext);
    const navigate = useNavigate();

    // FIXME: 測試時調這邊
    const [nextLifeStage, setNextLifeStage] = useState(3);
    const [cubeAnimationState, setCubeAnimationState] = useState(false);

    const [musicIsHidden, setMusicIsHidden] = useState(false);
    const [sampleIsHidden, setSampleIsHidden] = useState(false);
    const [textIsHidden, setTextIsHidden] = useState(false);
    const [nextLifeTextareaString, setNextLifeTextareaString] = useState('');

    const meshesData = useMemo(() => {
        const texturesData = myTextureLoader();

        let materialsData = [];

        boxMap.forEach((item, index) => {
            materialsData.push(myMaterialLoader(item.ID, texturesData[index]));
        });

        return { texturesData, materialsData };
    }, []);

    // console.log(meshesData);

    // ASK: 可以在 useEffect 中去預載嗎 還是直接一進主網頁就載更好

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

    // TODO: 如果條件渲染的時間點 是在條件吻合時才回初次運作
    // 則應該一開始就讀入最重要的 component 以達成預載

    // FIXME: 至寧醬：先把其中的條件渲染拿掉 阻擋做在連結處就好

    return (
        <>
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
                    <NextLifeStageIndicator nextLifeStage={nextLifeStage} />
                ) : (
                    ''
                )}
                {nextLifeStage === 1 ? (
                    <NextLifeSample
                        nextLifeStage={nextLifeStage}
                        setNextLifeStage={setNextLifeStage}
                        meshesData={meshesData}
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
                    />
                ) : (
                    ''
                )}
                {nextLifeStage === 2 ? (
                    <NextLifeText
                        nextLifeStage={nextLifeStage}
                        textIsHidden={textIsHidden}
                        nextLifeTextareaString={nextLifeTextareaString}
                        setNextLifeTextareaString={setNextLifeTextareaString}
                    />
                ) : (
                    ''
                )}
                {nextLifeStage === 3 ? (
                    <NextLifeCube
                        nextLifeStage={nextLifeStage}
                        setNextLifeStage={setNextLifeStage}
                        meshesData={meshesData}
                        cubeAnimationState={cubeAnimationState}
                        setCubeAnimationState={setCubeAnimationState}
                    />
                ) : (
                    ''
                )}
            </div>
        </>
    );
}

export default NextLife;
