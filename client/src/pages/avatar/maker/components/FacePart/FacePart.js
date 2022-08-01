import styled from "@emotion/styled";
import Styling from "./Styling";
import Colors from "./Colors";

function FacePart(props) {
    const {
        controlChange,
        setConbination,
        conbination,
        colorControlSwitch,
        setColorControlSwitch,
        faceControlChange,
        setFaceControlChange,
    } = props;
    const faceControl = [
        { v: "eye", title: "眼", color: 1 },
        { v: "ear", title: "耳", color: 0 },
        { v: "lip", title: "口", color: 0 },
        { v: "nose", title: "鼻", color: 1 },
        { v: "hairFront", title: "前髮", color: 1 },
        { v: "hairBack", title: "後髮", color: 0 },
        { v: "topEar", title: "獸耳", color:1  },
    ];
    const Face = styled.div`
        width: 375px;
        height: 100%;
        flex: 0 0 auto;
        padding-left: 60px;
        padding-right: 40px;
        padding-top: 70px;
        box-sizing: border-box;
        display: ${controlChange ? "block" : "none"};
    `;

    return (
        <>
            <Face>
                {faceControl.map((v, i) => {
                    const FaceControlText = styled.h4`
                        color: ${v.v === faceControlChange ? "#fff" : "#888"};
                    `;
                    return (
                        <FaceControlText
                            key={i}
                            onClick={() => {
                                setFaceControlChange(v.v);
                                setColorControlSwitch(v.color);
                            }}
                        >
                            {v.title}
                        </FaceControlText>
                    );
                })}
                <Styling
                    conbination={conbination}
                    setConbination={setConbination}
                    faceControlChange={faceControlChange}
                />

                <Colors
                    colorControlSwitch={colorControlSwitch}
                    controlChange={controlChange}
                    faceControlChange={faceControlChange}
                    conbination={conbination}
                    setConbination={setConbination}
                />
            </Face>
        </>
    );
}

export default FacePart;
