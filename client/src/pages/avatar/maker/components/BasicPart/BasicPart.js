import BasicContorl from './BasicContorl';
import Colors from './Colors';
import styled from '@emotion/styled';

function BasicPart(props) {
    const { combination, setCombination } = props;
    const Basic = styled.div`
        width: 375px;
        height: 100%;
        flex: 0 0 auto;
        padding-left: 60px;
        padding-top: 100px;
        box-sizing: border-box;
        position: relative;
        transition: all 1.5s ease-in;
    `;

    const basic = ['體型', '手臂', '腿'];
    return (
        <>
            <Basic>
                <div style={{ marginBottom: '20px' }}>
                    {basic.map((v, i) => {
                        return (
                            <BasicContorl
                                key={i}
                                title={v}
                                combination={combination}
                                setCombination={setCombination}
                                index={i}
                            />
                        );
                    })}
                </div>

                <Colors
                    combination={combination}
                    setCombination={setCombination}
                />
            </Basic>
        </>
    );
}

export default BasicPart;
