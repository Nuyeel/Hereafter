import styled from '@emotion/styled';

const BasicC = styled.div`
    padding-bottom: 20px;
`;

const Btns = styled.div`
    padding-top: 5px;
    display: flex;
`;

function BasicContorl(props) {
    const { title, combination, setCombination, index } = props;
    const sizebtns = Array.from({ length: 3 }, (_, index) => index);

    return (
        <>
            <BasicC>
                <h4 style={{ marginBottom: '12px' }}>{title}</h4>
                <Btns>
                    <p>小&nbsp;&nbsp;</p>
                    {sizebtns.map((v, i) => {
                        const Sizebtn = styled.div`
                            height: 20px;
                            width: 90px;
                            border: 1px solid #d259dd;
                            &:hover {
                                background-color: MintCream;
                            }
                        `;
                        return (
                            <Sizebtn
                                key={i}
                                onClick={() => {
                                    const newCombination = { ...combination };
                                    newCombination['basic'][index] = i;
                                    setCombination(newCombination);
                                }}
                                style={
                                    combination['basic'][index] === i
                                        ? { backgroundColor: '#FFE9F6' }
                                        : {}
                                }
                            ></Sizebtn>
                        );
                    })}
                    <p>&nbsp;&nbsp;大</p>
                </Btns>
            </BasicC>
        </>
    );
}

export default BasicContorl;
