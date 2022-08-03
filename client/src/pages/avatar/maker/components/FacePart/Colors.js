import styled from '@emotion/styled';
import FaceData from '../FaceData';

const Btns = styled.div`
    padding-top: 5px;
    padding-right: 20px;
    padding-left: 10px;
    display: flex;
    flex-wrap: wrap;
`;

function Colors(props) {
    const {
        conbination,
        setConbination,
        colorControlSwitch,
        faceControlChange,
    } = props;
    const colors = {
        eye: FaceData['eyeColors'],
        nose: FaceData['noseColors'],
        hairFront: FaceData['hairColors'],
        hairBack: [],
        ear: [],
        lip: [],
        topEar: FaceData['topEarColors'],
    };

    if (colorControlSwitch) {
        return (
            <>
                <h4 style={{ paddingBottom: '15px' }}>顏色</h4>
                <Btns>
                    {colors[faceControlChange].map((v, i) => {
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
                                    newConbination.face_color[
                                        faceControlChange
                                    ] = i;
                                    setConbination(newConbination);
                                }}
                                style={{
                                    backgroundColor:
                                        colors[faceControlChange][i],
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
