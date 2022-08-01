import styled from "@emotion/styled";
import FaceImage from "../FaceData";

function Style(props) {
    const { faceControlChange, setConbination, conbination } = props;

    const Circle = styled.div`
        width: 70px;
        height: 70px;
        background-image: url(${FaceImage[faceControlChange][
            conbination["face"][faceControlChange]
        ]["preview"]});
        background-color: #000;
        background-repeat: no-repeat;
        border-radius: 50%;
        background-size: contain;
    `;
    return (
        <>
            <div className="styling">
                <h5>款式</h5>
                <div className="btns d-flex justify-content-center">
                    <div
                        onClick={() => {
                            const newConbination = { ...conbination };
                            newConbination["face"][faceControlChange] =
                                conbination["face"][faceControlChange] <= 0
                                    ? 0
                                    : conbination["face"][faceControlChange] -
                                      1;
                            setConbination(newConbination);
                        }}
                    >
                        <i className="fa-solid fa-angle-left"></i>
                    </div>
                    <Circle></Circle>
                    <div
                        onClick={() => {
                            const newConbination = { ...conbination };
                            newConbination["face"][faceControlChange] =
                                FaceImage[faceControlChange].length - 1 <=
                                conbination["face"][faceControlChange]
                                    ? FaceImage[faceControlChange].length - 1
                                    : conbination["face"][faceControlChange] +
                                      1;
                            setConbination(newConbination);
                        }}
                    >
                        <i className="fa-solid fa-angle-right"></i>
                    </div>
                </div>
                <div className="text-center">300</div>
                <div className="hint_text text-center">
                    陰德值超過3000才可選購
                </div>
            </div>
        </>
    );
}

export default Style;
