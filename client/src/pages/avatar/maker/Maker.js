import BasicPart from "./components/BasicPart/BasicPart.js";
import BodyPart from "./components/BodyPart/BodyPart.js";
import CenterPart from "./components/CenterPart.js";
import FacePart from "./components/FacePart/FacePart.js";
import FaceView from "./components/FaceView.js";
//import "./maker.css";
import { useState } from "react";
import styled from "@emotion/styled";

const Maker = () => {
    const [conbination, setConbination] = useState({
        basic: [1, 1, 1],
        basic_color: "0",
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
    const [bodyControlChange, setBodyControlChange] = useState("hand");
    const [faceControlChange, setFaceControlChange] = useState("eye");
    const [colorControlSwitch, setColorControlSwitch] = useState(0);
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
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 16px;
        position: relative;
        display: flex;
        margin: 0 auto;
        box-sizing: border-box;
        color: white;
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

    return (
        <>
            <ContainerFluid>
                <AvatarMaker>
                    <AvatarTitle>
                        <h2 style={{ margin: 0 }}>投生形象1</h2>
                        <p className="created_time">
                            建立時間：20220616/Thr/08:12:23
                        </p>
                    </AvatarTitle>
                    <div className="back">
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                    <BasicPart
                        controlChange={controlChange}
                        conbination={conbination}
                        setConbination={setConbination}
                    />
                    <CenterPart
                        conbination={conbination}
                        controlChange={controlChange}
                        setControlChange={setControlChange}
                        setBodyControlChange={setBodyControlChange}
                        setColorControlSwitch={setColorControlSwitch}
                    />
                    <BodyPart
                        conbination={conbination}
                        controlChange={controlChange}
                        bodyControlChange={bodyControlChange}
                        setConbination={setConbination}
                        colorControlSwitch={colorControlSwitch}
                    />
                    <FaceView
                        conbination={conbination}
                        controlChange={controlChange}
                    />
                    <FacePart
                        conbination={conbination}
                        controlChange={controlChange}
                        setConbination={setConbination}
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
