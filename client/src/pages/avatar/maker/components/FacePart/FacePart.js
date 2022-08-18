import styled from '@emotion/styled';
import Styling from './Styling';
import Colors from './Colors';

function FacePart(props) {
    const {
        controlChange,
        setCombination,
        combination,
        colorControlSwitch,
        setColorControlSwitch,
        faceControlChange,
        setFaceControlChange,
        gooddeed,
        canSave,
        setCanSave,
        theme,
    } = props;
    const faceControl = [
        { v: 'eye', title: '眼', color: 1 },
        { v: 'ear', title: '耳', color: 0 },
        { v: 'lip', title: '口', color: 0 },
        { v: 'nose', title: '鼻', color: 1 },
        { v: 'hairFront', title: '前髮', color: 1 },
        { v: 'hairBack', title: '後髮', color: 0 },
        { v: 'topEar', title: '獸耳', color: 1 },
    ];
    const Face = styled.div`
        width: 375px;
        height: 100%;
        flex: 0 0 auto;
        padding-left: 60px;
        padding-right: 40px;
        padding-top: 70px;
        box-sizing: border-box;
    `;
    const FaceButton = styled.div`
        display: flex;
        padding-top: 15px;
        padding-bottom: 15px;
        transition: 1s;
    `;

    return (
        <>
            <Face>
                <FaceButton>
                    {faceControl.map((v, i) => {
                        const FaceControlText = styled.h4`
                            color: ${v.v === faceControlChange && canSave[v.v]
                                ? theme.cHeader
                                : canSave[v.v]
                                ? '#888'
                                : '#fa49b6'};
                            padding-right: 15px;
                            font-size: 22px;
                            z-index: 3;
                            position: relative;
                            &:hover {
                                cursor: pointer;
                                &:before {
                                    content: '';
                                    display: block;
                                    background-color: ${theme.bgcAvatarMaker};
                                    z-index: -1;
                                    height: 40px;
                                    width: 25px;
                                    top: 5px;
                                    left: 5px;
                                    position: absolute;
                                }
                            }
                        `;
                        return (
                            <FaceControlText
                                key={i}
                                onClick={() => {
                                    setFaceControlChange(v.v);
                                    setColorControlSwitch(v.color);
                                }}
                            >
                                {v.title}
                            </FaceControlText>
                        );
                    })}
                </FaceButton>

                <Styling
                    combination={combination}
                    setCombination={setCombination}
                    faceControlChange={faceControlChange}
                    gooddeed={gooddeed}
                    canSave={canSave}
                    setCanSave={setCanSave}
                />

                <Colors
                    colorControlSwitch={colorControlSwitch}
                    controlChange={controlChange}
                    faceControlChange={faceControlChange}
                    combination={combination}
                    setCombination={setCombination}
                />
            </Face>
        </>
    );
}

export default FacePart;
