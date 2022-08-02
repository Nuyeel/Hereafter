import styled from '@emotion/styled';
import FaceImage from '../FaceData';
import { useContext } from 'react';
import ThemeContext from '../../../../../context/ThemeContext/ThemeContext';

function Style(props) {
    const { faceControlChange, setConbination, conbination } = props;
    const { theme } = useContext(ThemeContext);
    const plus = () => {
        const newConbination = { ...conbination };
        newConbination['face'][faceControlChange] =
            FaceImage[faceControlChange].length - 1 <=
            conbination['face'][faceControlChange]
                ? FaceImage[faceControlChange].length - 1
                : conbination['face'][faceControlChange] + 1;
        setConbination(newConbination);
    };
    const minus = () => {
        const newConbination = { ...conbination };
        newConbination['face'][faceControlChange] =
            conbination['face'][faceControlChange] <= 0
                ? 0
                : conbination['face'][faceControlChange] - 1;
        setConbination(newConbination);
    };

    const Circle = styled.div`
        margin: 0 15px;
        width: 70px;
        height: 70px;
        background-image: url(${FaceImage[faceControlChange][
            conbination['face'][faceControlChange]
        ]['preview']});
        background-color: #000;
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
            <div
                style={{
                    height: '180px',
                    borderTop: '1px solid #ccc',
                    paddingTop: '10px',
                }}
            >
                <h5>款式</h5>
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
                        FaceImage[faceControlChange][
                            conbination['face'][faceControlChange]
                        ]['price']
                    }
                </div>
                <div className="hint_text text-center">
                    陰德值超過
                    {
                        FaceImage[faceControlChange][
                            conbination['face'][faceControlChange]
                        ]['limit']
                    }
                    才可選購
                </div>
            </div>
        </>
    );
}

export default Style;
