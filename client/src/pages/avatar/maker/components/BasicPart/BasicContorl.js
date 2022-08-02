import styled from "@emotion/styled";

const BasicC = styled.div`
    padding-bottom: 10px;
`;

const Btns = styled.div`
    padding-top: 5px;
    display: flex;
`;

function BasicContorl(props) {
    const { title, conbination, setConbination, index } = props;
    const sizebtns = Array.from({ length: 3 }, (_, index) => index);

    return (
        <>
            <BasicC>
                <h4>{title}</h4>
                <Btns>
                    {sizebtns.map((v, i) => {
                        const Sizebtn = styled.div`
                            height: 20px;
                            width: 90px;
                            border: 1px solid #d259dd;
                        `;
                        return (
                            <Sizebtn
                                key={i}
                                onClick={() => {
                                    const newConbination = { ...conbination };
                                    newConbination["basic"][index] = i;
                                    setConbination(newConbination);
                                }}
                                style={
                                    conbination["basic"][index] === i
                                        ? { backgroundColor: "#FFE9F6" }
                                        : {  }
                                }
                            ></Sizebtn>
                        );
                    })}
                </Btns>
            </BasicC>
        </>
    );
}

export default BasicContorl;
