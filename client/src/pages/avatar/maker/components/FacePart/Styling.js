import styled from '@emotion/styled';
import FaceData from '../FaceData';
import { useContext, useEffect } from 'react';
import ThemeContext from '../../../../../context/ThemeContext/ThemeContext';

function Style(props) {
    const {
        faceControlChange,
        setCombination,
        combination,
        gooddeed,
        canSave,
        setCanSave,
    } = props;
    const { theme } = useContext(ThemeContext);
    const plus = () => {
        const newCombination = { ...combination };
        newCombination['face'][faceControlChange] =
            FaceData[faceControlChange].length - 1 <=
            combination['face'][faceControlChange]
                ? FaceData[faceControlChange].length - 1
                : combination['face'][faceControlChange] + 1;
        setCombination(newCombination);
    };
    const minus = () => {
        const newCombination = { ...combination };
        newCombination['face'][faceControlChange] =
            combination['face'][faceControlChange] <= 0
                ? 0
                : combination['face'][faceControlChange] - 1;
        setCombination(newCombination);
    };

    const Circle = styled.div`
        margin: 0 15px;
        width: 70px;
        height: 70px;
        background-image: url(${FaceData[faceControlChange][
            combination['face'][faceControlChange]
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
    const ItemPrice = styled.div`
        padding-top: 10px;
        padding-bottom: 10px;
    `;
    const HintText = styled.div`
        opacity: ${canSave[faceControlChange] ? 0 : 1};
        color: #fa49b6;
    `;
    const saveCount = () => {
        if (
            FaceData[faceControlChange][combination['face'][faceControlChange]][
                'limit'
            ] > gooddeed
        ) {
            const newCanSave = { ...canSave };
            newCanSave[faceControlChange] = 0;
            setCanSave(newCanSave);
        } else {
            const newCanSave = { ...canSave };
            newCanSave[faceControlChange] = 1;
            setCanSave(newCanSave);
        }
    };
    return (
        <>
            <div
                style={{
                    height: '180px',
                    borderTop: '1px solid #ccc',
                    paddingTop: '10px',
                }}
            >
                <h5>款式</h5>
                <div className="btns d-flex justify-content-center">
                    <ClickButton
                        onClick={() => {
                            minus();
                            saveCount();
                        }}
                    >
                        <i className="fa-solid fa-angle-left"></i>
                    </ClickButton>
                    <Circle></Circle>
                    <ClickButton
                        onClick={() => {
                            plus();
                            saveCount();
                        }}
                    >
                        <i className="fa-solid fa-angle-right"></i>
                    </ClickButton>
                </div>
                <ItemPrice className="text-center">
                    {
                        FaceData[faceControlChange][
                            combination['face'][faceControlChange]
                        ]['price']
                    }
                </ItemPrice>
                <HintText className="text-center">
                    陰德值超過
                    {
                        FaceData[faceControlChange][
                            combination['face'][faceControlChange]
                        ]['limit']
                    }
                    才可選購
                </HintText>
            </div>
        </>
    );
}

export default Style;
