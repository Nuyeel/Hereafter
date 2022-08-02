import BasicContorl from "./BasicContorl";
import Colors from "./Colors";
import styled from "@emotion/styled";

function BasicPart(props) {
    const { conbination, setConbination, controlChange } = props;
    const Basic = styled.div`
        width: 375px;
        height: 100%;
        flex: 0 0 auto;
        padding-left: 60px;
        padding-top: 70px;
        box-sizing: border-box;
        position: relative;
        display: ${controlChange ? "none" : "block"};
        transition: all 1.5s ease-in;
    `;

    const basic = ["體型", "手臂", "腿"];
    return (
        <>
            <Basic>
                {basic.map((v, i) => {
                    return (
                        <BasicContorl
                            key={i}
                            title={v}
                            conbination={conbination}
                            setConbination={setConbination}
                            index={i}
                        />
                    );
                })}
                <Colors
                    conbination={conbination}
                    setConbination={setConbination}
                />
            </Basic>
        </>
    );
}

export default BasicPart;
