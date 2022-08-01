import styled from "@emotion/styled";
import Style from "./Styling";
import Colors from "./Colors";

function BodyPart(props) {
    const {
        controlChange,
        bodyControlChange,
        setConbination,
        conbination,
        colorControlSwitch,
    } = props;
    const title = { hand: "手", foot: "腳", tale: "尾巴", special: "特殊" };
    const Body = styled.div`
        width: 375px;
        height: 100%;
        flex: 0 0 auto;
        padding-left: 60px;
        padding-right: 40px;
        padding-top: 70px;
        box-sizing: border-box;
        display: ${controlChange ? "none" : "block"};
    `;

    return (
        <>
            <Body>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <h4>
                    {title[bodyControlChange]}
                    <i className="fa-solid fa-dice"></i>
                </h4>
                <div className="controlarea" id="controlareaEyes">
                    <Style
                        conbination={conbination}
                        bodyControlChange={bodyControlChange}
                        setConbination={setConbination}
                    />
                    <Colors
                        conbination={conbination}
                        bodyControlChange={bodyControlChange}
                        setConbination={setConbination}
                        colorControlSwitch={colorControlSwitch}
                    />
                </div>
            </Body>
        </>
    );
}

export default BodyPart;
