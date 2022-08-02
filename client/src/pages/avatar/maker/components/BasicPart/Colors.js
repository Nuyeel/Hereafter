import styled from '@emotion/styled';
import BodyData from '../BodyData';

const Btns = styled.div`
    padding-top: 5px;
    padding-right: 80px;
    display: flex;
    flex-wrap: wrap;
`;

const Colors = (props) => {
    const { conbination, setConbination } = props;

    return (
        <>
            <h4>顏色</h4>
            <Btns>
                {BodyData['basicColors'].map((v, i) => {
                    const Circle = styled.div`
                        width: 40px;
                        height: 40px;
                        margin-bottom: 10px;
                        margin-left: 10px;
                        margin-right: 10px;
                        border-radius: 50%;
                    `;
                    return (
                        <Circle
                            key={i}
                            onClick={(e) => {
                                const newConbination = { ...conbination };
                                newConbination.basic_color = i;
                                setConbination(newConbination);
                            }}
                            style={{
                                backgroundColor: BodyData['basicColors'][i],
                            }}
                        ></Circle>
                    );
                })}
            </Btns>
            <div className="btns d-flex flex-wrap"></div>
        </>
    );
};

export default Colors;
