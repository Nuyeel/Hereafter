import BasicPart from './components/BasicPart/BasicPart.js';
import BodyPart from './components/BodyPart/BodyPart.js';
import CenterPart from './components/CenterPart.js';
import FacePart from './components/FacePart/FacePart.js';
import FaceView from './components/FaceView.js';
import { useState, useContext, useEffect } from 'react';
import ThemeContext from '../../../context/ThemeContext/ThemeContext.js';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Avatar_GetData } from '../../../config/ajax-path';
import axios from 'axios';

const Maker = () => {
    const [combination, setCombination] = useState({
        basic: [1, 1, 1],
        basic_color: '0',
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
    const navigate = useNavigate();
    const member = JSON.parse(localStorage.getItem('auth'));
    const aid = sessionStorage.getItem('avatar_id');

    const getAvatarData = async () => {
        const postData = { id: member['sid'], avatar_id: aid };
        const r = await axios.post(Avatar_GetData, postData);
        const oldCombination = JSON.parse(r.data.data[0]['combination']);
        setCombination(oldCombination);
    };
    useEffect(() => {
        if (member !== null) {
            getAvatarData();
        }
    }, []);
    const { theme } = useContext(ThemeContext);
    const ContainerFluid = styled.div`
        margin: 0;
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
        top: 5px;
        right: 18px;
        cursor: pointer;
        i {
            font-size: 40px;
        }
    `;
    const backtoShowCase = () => {
        navigate('/showcase', { replace: true });
    };
    return (
        <>
            <ContainerFluid>
                <AvatarMaker>
                    <AvatarTitle>
                        <h3 className="subtitle" style={{ margin: 0 }}>
                            投生形象1
                        </h3>
                        <p className="created_time">
                            建立時間：20220616/Thr/08:12:23
                        </p>
                    </AvatarTitle>
                    <Back onClick={backtoShowCase}>
                        <i className="fa-solid fa-xmark"></i>
                    </Back>
                    <BasicPart
                        controlChange={controlChange}
                        combination={combination}
                        setCombination={setCombination}
                    />
                    <CenterPart
                        combination={combination}
                        controlChange={controlChange}
                        setControlChange={setControlChange}
                        setBodyControlChange={setBodyControlChange}
                        setFaceControlChange={setFaceControlChange}
                        setColorControlSwitch={setColorControlSwitch}
                    />
                    <BodyPart
                        combination={combination}
                        controlChange={controlChange}
                        bodyControlChange={bodyControlChange}
                        setCombination={setCombination}
                        colorControlSwitch={colorControlSwitch}
                    />
                    <FaceView
                        combination={combination}
                        controlChange={controlChange}
                    />
                    <FacePart
                        combination={combination}
                        controlChange={controlChange}
                        setCombination={setCombination}
                        colorControlSwitch={colorControlSwitch}
                        setColorControlSwitch={setColorControlSwitch}
                        faceControlChange={faceControlChange}
                        setFaceControlChange={setFaceControlChange}
                    />
                </AvatarMaker>
            </ContainerFluid>
        </>
    );
};

export default Maker;
