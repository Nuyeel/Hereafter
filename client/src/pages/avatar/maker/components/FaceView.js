import styled from "@emotion/styled";
import FaceData from "./FaceData";
import BodyData from "./BodyData";

function FaceView(props) {
    const { controlChange, conbination } = props;
    const FaceView = styled.div`
        position: relative;
        top: 23%;
        margin: 0 50px;
        width: 230px;
        height: 230px;
        background-color: rgb(0,0,0,0.1);
        overflow: hidden;
        display: ${controlChange ? "block" : "none"};
    `;
    const Body = styled.div`
        position: absolute;
        top: 74%;
        left: -3%;
        width: 246px;
        height: 147.6px;
        mask-image: url(${BodyData["bodycenter"][conbination["basic"][0]]});
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData["basicColors"][
            conbination["basic_color"]
        ]};
    `;
    const Arm = styled.div`
        position: absolute;
        top: 47%;
        left: -65%;
        width: 530.4px;
        height: 122.4px;
        mask-image: url(${BodyData["arm"][conbination["basic"][1]]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData["basicColors"][
            conbination["basic_color"]
        ]};
    `;
    const handLPosition = [
        { top: "38%", left: "-42%" },
        { top: "100%", left: "7.2%" },
        { top: "100%", left: "3%" },
    ];
    const HandL = styled.div`
        position: absolute;
        top: ${handLPosition[conbination["basic"][1]]["top"]};
        left: ${handLPosition[conbination["basic"][1]]["left"]};
        width: 122.4px;
        height: 122.4px;
        mask-image: url(${BodyData["hand"][conbination["body"]["hand"]][
            "left"
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData["basicColors"][
            conbination["basic_color"]
        ]};
    `;
    const HandPalmL = styled.div`
        position: absolute;
        top: ${handLPosition[conbination["basic"][1]]["top"]};
        left: ${handLPosition[conbination["basic"][1]]["left"]};
        width: 122.4px;
        height: 122.4px;
        mask-image: url(${BodyData["hand"][conbination["body"]["hand"]][
            "palmLeft"
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: #555;
        opacity: 0.3;
    `;
    const handRPosition = [
        { top: "38%", left: "88%" },
        { top: "100%", left: "71%" },
        { top: "100%", left: "75.5%" },
    ];
    const HandR = styled.div`
        position: absolute;
        top: ${handRPosition[conbination["basic"][1]]["top"]};
        left: ${handRPosition[conbination["basic"][1]]["left"]};
        width: 122.4px;
        height: 122.4px;
        mask-image: url(${BodyData["hand"][conbination["body"]["hand"]][
            "right"
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData["basicColors"][
            conbination["basic_color"]
        ]};
    `;
    const HandPalmR = styled.div`
        position: absolute;
        top: ${handRPosition[conbination["basic"][1]]["top"]};
        left: ${handRPosition[conbination["basic"][1]]["left"]};
        width: 102px;
        height: 102px;
        mask-image: url(${BodyData["hand"][conbination["body"]["hand"]][
            "palmRight"
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: #555;
        opacity: 0.3;
    `;
    const Face = styled.div`
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        width: 130.8px;
        height: 114px;
        mask-image: url(${BodyData["head"][0]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        mask-size: cover;
        background-color: ${BodyData["basicColors"][
            conbination["basic_color"]
        ]};
    `;
    const Eye = styled.div`
        position: absolute;
        top: 3%;
        left: 0%;
        width: 130.8px;
        height: 81.6px;
        mask-image: url(${FaceData["eye"][conbination["face"]["eye"]]["eye"]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${FaceData["eyeColors"][
            conbination["face_color"]['eye']
        ]};
    `;
    const EyeWhite = styled.div`
        position: absolute;
        top: 3%;
        left: 0%;
        width: 130.8px;
        height: 81.6px;
        mask-image: url(${FaceData["eye"][conbination["face"]["eye"]]["eyeW"]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: #fff;
    `;
    const Ear = styled.div`
        position: absolute;
        top: 28%;
        left: 1%;
        width: 224.4px;
        height: 114px;
        mask-image: url(${FaceData["ear"][conbination["face"]["ear"]]["src"]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData["basicColors"][
            conbination["basic_color"]
        ]};
        display: ${conbination["face"]["topEar"] > 0 ? "none" : "block"};
    `;
    const TopEar = styled.div`
        position: absolute;
        top: -0.8%;
        left: 2%;
        width: 224.4px;
        height: 142.8px;
        -webkit-mask-image: url(${FaceData["topEar"][
            conbination["face"]["topEar"]
        ]["src"]});
        mask-image: url(${FaceData["topEar"][conbination["face"]["topEar"]][
            "src"
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${FaceData["topEarColors"][
            conbination["face_color"]["topEar"]
        ]};
    `;
    const Nose = styled.div`
        position: absolute;
        top: 55.5%;
        left: 38%;
        width: 32.4px;
        height: 32.4px;
        -webkit-mask-image: url(${FaceData["nose"][conbination["face"]["nose"]][
            "nose"
        ]});
        mask-image: url(${FaceData["nose"][conbination["face"]["nose"]][
            "src"
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${FaceData["noseColors"][
            conbination["face_color"]["nose"]
        ]};
    `;
    const Lip = styled.div`
        position: absolute;
        top: 76%;
        left: 31%;
        width: 61.2px;
        height: 30px;
        background: url(${FaceData["lip"][conbination["face"]["lip"]]["src"]});
    `;
    const HairFront = styled.div`
        position: absolute;
        top: -0.5%;
        left: -16%;
        width: 270px;
        height: 142.8px;
        -webkit-mask-image: url(${FaceData["hairFront"][
            conbination["face"]["hairFront"]
        ]["src"]});
        mask-image: url(${FaceData["hairFront"][
            conbination["face"]["hairFront"]
        ]["src"]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${FaceData["hairColors"][
            conbination["face_color"]["hairFront"]
        ]};
    `;
    const HairBack = styled.div`
        position: absolute;
        top: 6%;
        left: -29.9%;
        width: 362.4px;
        height: 248.4px;
        -webkit-mask-image: url(${FaceData["hairBack"][
            conbination["face"]["hairBack"]
        ]["src"]});
        mask-image: url(${FaceData["hairBack"][conbination["face"]["hairBack"]][
            "src"
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${
            FaceData["hairColors"][conbination["face_color"]["hairFront"]]
        };
    `;
    return (
        <>
            <FaceView>
                <HairBack></HairBack>
                <Ear></Ear>
                <TopEar></TopEar>
                <Face>
                    <EyeWhite></EyeWhite>
                    <Eye></Eye>
                    <Nose></Nose>
                    <Lip></Lip>
                </Face>
                <HairFront></HairFront>
                <Body></Body>
                <Arm></Arm>
                <HandL></HandL>
                <HandPalmL></HandPalmL>
                <HandR></HandR>
                <HandPalmR></HandPalmR>
            </FaceView>
        </>
    );
}

export default FaceView;
