import styled from "@emotion/styled";
import BodyData from "../BodyData";

function Style(props) {
    const { bodyControlChange, setConbination, conbination } = props;

    const Circle = styled.div`
        width: 70px;
        height: 70px;
        background-image: url(${BodyData[bodyControlChange][
            conbination["body"][bodyControlChange]
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
                            newConbination["body"][bodyControlChange] =
                                conbination["body"][bodyControlChange] <= 0
                                    ? 0
                                    : conbination["body"][bodyControlChange] -
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
                            newConbination["body"][bodyControlChange] =
                                BodyData[bodyControlChange].length-1 <=
                                conbination["body"][bodyControlChange]
                                    ? BodyData[bodyControlChange].length-1
                                    : conbination["body"][bodyControlChange] +
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
