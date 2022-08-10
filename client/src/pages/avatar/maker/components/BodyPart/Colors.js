import styled from '@emotion/styled';
import BodyData from '../BodyData';

const Btns = styled.div`
    padding-top: 5px;
    padding-right: 20px;
    padding-left: 10px;
    display: flex;
    flex-wrap: wrap;
`;

function Colors(props) {
    const {
        combination,
        setCombination,
        colorControlSwitch,
        bodyControlChange,
    } = props;
    const colors = {
        hand: [],
        foot: [],
        tale: BodyData['taleColors'],
        special: BodyData['specialColors'],
    };
    if (colorControlSwitch) {
        return (
            <>
                <h4 style={{ paddingBottom: '15px' }}>顏色</h4>
                <Btns>
                    {colors[bodyControlChange].map((v, i) => {
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
                                    const newCombination = { ...combination };
                                    newCombination.special_color[
                                        bodyControlChange
                                    ] = i;
                                    setCombination(newCombination);
                                }}
                                style={{
                                    backgroundColor:
                                        colors[bodyControlChange][i],
                                }}
                            ></Circle>
                        );
                    })}
                </Btns>
            </>
        );
    }
}

export default Colors;
