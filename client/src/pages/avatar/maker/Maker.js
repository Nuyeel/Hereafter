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
import Swal from 'sweetalert2';

const Maker = (props) => {
    const { pageName, gooddeed } = props;
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
    const [canSave, setCanSave] = useState({
        hand: 1,
        foot: 1,
        tale: 1,
        special: 1,
        eye: 1,
        ear: 1,
        lip: 1,
        nose: 1,
        hairFront: 1,
        hairBack: 1,
        topEar: 1,
    });
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
        transition: 1s;
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
    const Line = styled.div`
        box-sizing: border-box;
        height: 3px;
        border-radius: 5px;
        background: ${theme.cHeader};
        position: absolute;
        opacity: 0;
    `;

    //動畫的前置作業
    //保存動畫結束狀態的鉤子
    const [keepChange, setKeepChange] = useState(false);
    const [keepLineChange, setKeepLineChange] = useState('hand');
    const basicRef = useRef();
    const centerRef = useRef();
    const faceRef = useRef();
    const faceViewRef = useRef();
    const bodyRef = useRef();
    const handLineRef = useRef();
    const footLineRef = useRef();
    const taleLineRef = useRef();
    const specialLineRef = useRef();
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
    useEffect(() => {
        if (bodyControlChange === 'hand') {
            const a = gsap.utils.selector(handLineRef.current);
            gsap.timeline()
                .fromTo(a('.line2'), { opacity: '0' }, { opacity: '1' })
                .fromTo(
                    a('.line1'),
                    { opacity: '0' },
                    {
                        opacity: '1',
                        onComplete: () => {
                            setKeepLineChange('hand');
                        },
                    }
                );
        } else if (bodyControlChange === 'foot') {
            const a = gsap.utils.selector(footLineRef.current);
            gsap.timeline()
                .fromTo(a('.line2'), { opacity: '0' }, { opacity: '1' })
                .fromTo(
                    a('.line1'),
                    { opacity: '0' },
                    {
                        opacity: '1',
                        onComplete: () => {
                            setKeepLineChange('foot');
                        },
                    }
                );
        } else if (bodyControlChange === 'tale') {
            const a = gsap.utils.selector(taleLineRef.current);
            gsap.timeline()
                .fromTo(a('.line2'), { opacity: '0' }, { opacity: '1' })
                .fromTo(
                    a('.line1'),
                    { opacity: '0' },
                    {
                        opacity: '1',
                        onComplete: () => {
                            setKeepLineChange('tale');
                        },
                    }
                );
        } else if (bodyControlChange === 'special') {
            const a = gsap.utils.selector(specialLineRef.current);
            gsap.fromTo(
                a('.line1'),
                { opacity: '0' },
                {
                    opacity: '1',
                    onComplete: () => {
                        setKeepLineChange('special');
                    },
                }
            );
        }
    }, [bodyControlChange]);
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
                        &nbsp;&nbsp;建立時間：{avatar.time}
                        </span>
                    </AvatarTitle>
                    <Back
                        onClick={() => {
                            Swal.fire({
                                title: '確定要放棄編輯嗎?',
                                confirmButtonText: `<p >確定</p>`,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    sessionStorage.removeItem('avatar_id');
                                    backtoShowCase();
                                }
                            });
                        }}
                    >
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
                        <div ref={handLineRef} style={{ position: 'relative' }}>
                            <Line
                                className="line1"
                                style={{
                                    width: '60px',
                                    top: '100px',
                                    left: '94%',
                                    opacity:
                                        controlChange === 0 &&
                                        keepLineChange === 'hand' &&
                                        bodyControlChange === 'hand'
                                            ? 1
                                            : 0,
                                }}
                            ></Line>
                            <Line
                                className="line2"
                                style={{
                                    width: '90px',
                                    top: '138px',
                                    transform: 'rotate(300deg)',
                                    left: '79.5%',
                                    opacity:
                                        controlChange === 0 &&
                                        keepLineChange === 'hand' &&
                                        bodyControlChange === 'hand'
                                            ? 1
                                            : 0,
                                }}
                            ></Line>
                        </div>
                        <div ref={footLineRef} style={{ position: 'relative' }}>
                            <Line
                                className="line1"
                                style={{
                                    width: '60px',
                                    top: '100px',
                                    left: '94%',
                                    opacity:
                                        controlChange === 0 &&
                                        keepLineChange === 'foot' &&
                                        bodyControlChange === 'foot'
                                            ? 1
                                            : 0,
                                }}
                            ></Line>
                            <Line
                                className="line2"
                                style={{
                                    width: '300px',
                                    top: '247px',
                                    transform: 'rotate(280deg)',
                                    left: '55.3%',
                                    opacity:
                                        controlChange === 0 &&
                                        keepLineChange === 'foot' &&
                                        bodyControlChange === 'foot'
                                            ? 1
                                            : 0,
                                }}
                            ></Line>
                        </div>
                        <div
                            ref={specialLineRef}
                            style={{ position: 'relative' }}
                        >
                            <Line
                                className="line1"
                                style={{
                                    width: '270px',
                                    top: '200px',
                                    transform: 'rotate(313deg)',
                                    left: '56%',
                                    opacity:
                                        controlChange === 0 &&
                                        keepLineChange === 'special' &&
                                        bodyControlChange === 'special'
                                            ? 1
                                            : 0,
                                }}
                            ></Line>
                        </div>
                        <div ref={taleLineRef} style={{ position: 'relative' }}>
                            <Line
                                className="line1"
                                style={{
                                    width: '40px',
                                    top: '100px',
                                    left: '98%',
                                    opacity:
                                        controlChange === 0 &&
                                        keepLineChange === 'tale' &&
                                        bodyControlChange === 'tale'
                                            ? 1
                                            : 0,
                                }}
                            ></Line>
                            <Line
                                className="line2"
                                style={{
                                    width: '200px',
                                    top: '186px',
                                    transform: 'rotate(300deg)',
                                    left: '65%',
                                    opacity:
                                        controlChange === 0 &&
                                        keepLineChange === 'tale' &&
                                        bodyControlChange === 'tale'
                                            ? 1
                                            : 0,
                                }}
                            ></Line>
                        </div>
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
                            setKeepLineChange={setKeepLineChange}
                            canSave={canSave}
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
                            theme={theme}
                            gooddeed={gooddeed}
                            combination={combination}
                            controlChange={controlChange}
                            bodyControlChange={bodyControlChange}
                            setCombination={setCombination}
                            colorControlSwitch={colorControlSwitch}
                            canSave={canSave}
                            setCanSave={setCanSave}
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
                            theme={theme}
                            combination={combination}
                            gooddeed={gooddeed}
                            controlChange={controlChange}
                            setCombination={setCombination}
                            colorControlSwitch={colorControlSwitch}
                            setColorControlSwitch={setColorControlSwitch}
                            faceControlChange={faceControlChange}
                            setFaceControlChange={setFaceControlChange}
                            canSave={canSave}
                            setCanSave={setCanSave}
                        />
                    </div>
                </AvatarMaker>
            </ContainerFluid>
        </>
    );
};

export default Maker;
