import BasicPart from './components/BasicPart/BasicPart.js';
import BodyPart from './components/BodyPart/BodyPart.js';
import CenterPart from './components/CenterPart.js';
import FacePart from './components/FacePart/FacePart.js';
import FaceView from './components/FaceView.js';
import { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from '../../../context/AuthContext/AuthContext';
import ThemeContext from '../../../context/ThemeContext/ThemeContext.js';
import HeaderContext, {
    headers,
} from '../../../context/HeaderContext/HeaderContext';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Avatar_GetData } from '../../../config/ajax-path';
import axios from 'axios';
import gsap from 'gsap';
import getDatestr from '../components/getDatestr.js';

const Maker = (props) => {
    const { pageName } = props;
    const [combination, setCombination] = useState({
        basic: [1, 1, 1],
        basic_color: 0,
        body: { hand: 0, foot: 0, tale: 0, special: 0 },
        special_color: { tale: 0, special: 0 },
        face: {
            eye: 0,
            ear: 0,
            lip: 0,
            nose: 0,
            hairFront: 0,
            hairBack: 0,
            topEar: 0,
        },
        face_color: { eye: 0, nose: 0, hairFront: 0, topEar: 0 },
    });
    const [controlChange, setControlChange] = useState(0);
    const [bodyControlChange, setBodyControlChange] = useState('hand');
    const [faceControlChange, setFaceControlChange] = useState('eye');
    const [colorControlSwitch, setColorControlSwitch] = useState(0);
    const [avatar, setAvatar] = useState({ id: 0, time: '' });
    const navigate = useNavigate();
    //Header的資料
    const { setHeader } = useContext(HeaderContext);
    //拉取訂單資料的前置作業
    const { authorized, sid } = useContext(AuthContext);
    const aid = sessionStorage.getItem('avatar_id');
    const getAvatarData = async () => {
        const postData = { id: sid, avatar_id: aid };
        const r = await axios.post(Avatar_GetData, postData);
        const oldCombination = JSON.parse(r.data.data[0]['combination']);
        const avatarData = { ...avatar };
        avatarData.id = r.data.data[0]['avatar_id'];
        avatarData.time = getDatestr(r.data.data[0]['avatar_created_at']);
        setAvatar(avatarData);
        setCombination(oldCombination);
    };
    //根據主題換色的context
    const { theme } = useContext(ThemeContext);

    const ContainerFluid = styled.div`
        margin: 0;
        padding-top: 50px;
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    `;
    const AvatarMaker = styled.div`
        width: 1200px;
        height: 610px;
        background: radial-gradient(
            47.11% 47.11% at 50% 50%,
            ${theme.bgcAvatarMaker2} 0%,
            ${theme.bgcAvatarMaker} 100%
        );
        backdrop-filter: blur(5px);
        border-radius: 16px;
        position: relative;
        display: flex;
        margin: 0 auto;
        box-sizing: border-box;
        color: ${theme.cHeader};
        i {
            color: ${theme.cHeader};
        }
    `;
    const AvatarTitle = styled.div`
        padding-top: 30px;
        padding-left: 60px;
        position: absolute;
        align-items: flex-end !important;
        flex-wrap: wrap !important;
        display: flex !important;
        flex-shrink: 0;
        box-sizing: border-box;
    `;
    const Back = styled.div`
        position: absolute;
        top: 8px;
        right: 10px;
        width: 50px;
        height: 50px;
        z-index: 10;
        text-align: center;
        cursor: pointer;
        i {
            font-size: 40px;
        }
    `;
    //動畫的前置作業
    //保存動畫結束狀態的鉤子
    const [keepChange, setKeepChange] = useState(false);
    const basicRef = useRef();
    const centerRef = useRef();
    const faceRef = useRef();
    const faceViewRef = useRef();
    const bodyRef = useRef();
    const changeAnime = () => {
        if (controlChange === 1) {
            gsap.to(basicRef.current, {
                opacity: '0',
                left: '-100px',
                display: 'none',
                onComplete: () => setKeepChange(true),
            });
            gsap.to(centerRef.current, {
                opacity: '0.3',
                left: '0px',
            });
            gsap.fromTo(
                faceRef.current,
                {
                    opacity: '0',
                    display: 'none',
                },
                {
                    opacity: '1',
                    display: 'block',
                }
            );
            gsap.fromTo(
                faceViewRef.current,
                {
                    opacity: '0',
                    display: 'none',
                },
                {
                    opacity: '1',
                    display: 'block',
                }
            );
            gsap.fromTo(
                bodyRef.current,
                {
                    opacity: '1',
                    display: 'block',
                },
                {
                    opacity: '0',
                    display: 'none',
                }
            );
        } else {
            gsap.fromTo(
                basicRef.current,
                {
                    opacity: '0',
                    left: '-80px',
                    display: 'none',
                },
                {
                    opacity: '1',
                    left: '0px',
                    display: 'block',
                }
            );
            gsap.fromTo(
                centerRef.current,
                {
                    opacity: '0.3',
                },
                {
                    opacity: '1',
                    left: '375px',
                    onComplete: () => setKeepChange(false),
                }
            );
            gsap.fromTo(
                faceRef.current,
                {
                    opacity: '1',
                    display: 'block',
                },
                {
                    opacity: '0',
                    display: 'none',
                }
            );
            gsap.fromTo(
                faceViewRef.current,
                {
                    opacity: '1',
                    display: 'block',
                },
                {
                    opacity: '0',
                    display: 'none',
                }
            );
            gsap.fromTo(
                bodyRef.current,
                {
                    opacity: '0',
                    display: 'none',
                },
                {
                    opacity: '1',
                    display: 'block',
                }
            );
        }
    };
    //抓取訂單舊資料 如果拉到null會直接不送 防止後端crash 更新訂單資料的方法在Center.js
    useEffect(() => {
        if (sid !== null && aid !== null) {
            getAvatarData();
        }
        console.log('目前沒有訂單編號或未登入');
    }, []);

    //更換面板的動畫
    useEffect(() => {
        changeAnime();
    }, [controlChange]);

    //回到衣櫥
    const backtoShowCase = () => {
        navigate('/showcase', { replace: true });
    };

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, [pageName, setHeader]);
    return (
        <>
            <ContainerFluid>
                <AvatarMaker>
                    <AvatarTitle>
                        <h3 className="subtitle" style={{ margin: 0 }}>
                            投生形象{avatar.id}
                        </h3>
                        <span style={{ font: '14px 400' }}>
                            建立時間：{avatar.time}
                        </span>
                    </AvatarTitle>
                    <Back onClick={backtoShowCase}>
                        <i className="fa-solid fa-xmark"></i>
                    </Back>
                    <div
                        ref={basicRef}
                        style={{
                            position: 'relative',
                            display: keepChange ? 'none' : 'block',
                        }}
                    >
                        <BasicPart
                            combination={combination}
                            setCombination={setCombination}
                        />
                    </div>
                    <div
                        ref={centerRef}
                        style={{
                            position: 'absolute',
                            left: keepChange ? '0px' : '375px',
                            opacity: keepChange ? 0.3 : 1,
                        }}
                    >
                        <CenterPart
                            keepChange={keepChange}
                            combination={combination}
                            setCombination={setCombination}
                            controlChange={controlChange}
                            setControlChange={setControlChange}
                            setBodyControlChange={setBodyControlChange}
                            setFaceControlChange={setFaceControlChange}
                            setColorControlSwitch={setColorControlSwitch}
                            backtoShowCase={backtoShowCase}
                            theme={theme}
                        />
                    </div>
                    <div
                        ref={bodyRef}
                        style={{
                            position: 'absolute',
                            left: '800px',
                            display: keepChange ? 'none' : 'block',
                        }}
                    >
                        <BodyPart
                            combination={combination}
                            controlChange={controlChange}
                            bodyControlChange={bodyControlChange}
                            setCombination={setCombination}
                            colorControlSwitch={colorControlSwitch}
                        />
                    </div>

                    <div
                        ref={faceViewRef}
                        style={{
                            position: 'absolute',
                            left: '450px',
                            top: '120px',
                            display: keepChange ? 'block' : 'none',
                        }}
                    >
                        <FaceView
                            combination={combination}
                            controlChange={controlChange}
                        />
                    </div>

                    <div
                        ref={faceRef}
                        style={{
                            position: 'absolute',
                            left: '800px',
                            display: keepChange ? 'block' : 'none',
                        }}
                    >
                        <FacePart
                            combination={combination}
                            controlChange={controlChange}
                            setCombination={setCombination}
                            colorControlSwitch={colorControlSwitch}
                            setColorControlSwitch={setColorControlSwitch}
                            faceControlChange={faceControlChange}
                            setFaceControlChange={setFaceControlChange}
                        />
                    </div>
                </AvatarMaker>
            </ContainerFluid>
        </>
    );
};

export default Maker;
