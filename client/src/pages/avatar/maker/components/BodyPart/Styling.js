import styled from '@emotion/styled';
import BodyData from '../BodyData';
import { useContext } from 'react';
import ThemeContext from '../../../../../context/ThemeContext/ThemeContext';

function Style(props) {
    const { bodyControlChange, setCombination, combination } = props;
    const { theme } = useContext(ThemeContext);
    const plus = () => {
        const newCombination = { ...combination };
        newCombination['body'][bodyControlChange] =
            BodyData[bodyControlChange].length - 1 <=
            combination['body'][bodyControlChange]
                ? BodyData[bodyControlChange].length - 1
                : combination['body'][bodyControlChange] + 1;
        setCombination(newCombination);
    };
    const minus = () => {
        const newCombination = { ...combination };
        newCombination['body'][bodyControlChange] =
            combination['body'][bodyControlChange] <= 0
                ? 0
                : combination['body'][bodyControlChange] - 1;
        setCombination(newCombination);
    };

    const Circle = styled.div`
        margin: 0 15px;
        width: 70px;
        height: 70px;
        background-image: url(${BodyData[bodyControlChange][
            combination['body'][bodyControlChange]
        ]['preview']});
        box-shadow: 0px 0px 5px 5px rgba(204, 204, 204, 0.6);
        background-color: rgba(204, 204, 204, 0.6);
        background-repeat: no-repeat;
        border-radius: 50%;
        background-size: contain;
    `;
    const ClickButton = styled.div`
        justify-content: center;
        padding-top: 15px;
        cursor: pointer;
        i {
            font-size: 40px;
            &:hover {
                filter: drop-shadow(0px 0px 2px ${theme.cHeader});
            }
        }
    `;
    return (
        <>
            <div style={{ height: '180px' }}>
                <h5 style={{ paddingTop: '10px' }}>款式</h5>
                <div className="btns d-flex justify-content-center">
                    <ClickButton onClick={minus}>
                        <i className="fa-solid fa-angle-left"></i>
                    </ClickButton>
                    <Circle></Circle>
                    <ClickButton onClick={plus}>
                        <i className="fa-solid fa-angle-right"></i>
                    </ClickButton>
                </div>
                <div className="text-center">
                    {
                        BodyData[bodyControlChange][
                            combination['body'][bodyControlChange]
                        ]['price']
                    }
                </div>
                <div className="hint_text text-center">
                    陰德值超過
                    {
                        BodyData[bodyControlChange][
                            combination['body'][bodyControlChange]
                        ]['limit']
                    }
                    才可選購
                </div>
            </div>
        </>
    );
}

export default Style;
