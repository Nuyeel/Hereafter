import styled from '@emotion/styled';
import FaceData from './FaceData';
import BodyData from './BodyData';
//MING: Basic引入
import { ReactComponent as HeadSVG } from '../../../../images/avatar/basic/face.svg';
import { ReactComponent as BodyLSVG } from '../../../../images/avatar/basic/body-l.svg';
import { ReactComponent as BodyMSVG } from '../../../../images/avatar/basic/body-m.svg';
import { ReactComponent as BodySSVG } from '../../../../images/avatar/basic/body-s.svg';
import { ReactComponent as ArmLSVG } from '../../../../images/avatar/basic/arm-l.svg';
import { ReactComponent as ArmMSVG } from '../../../../images/avatar/basic/arm-m.svg';
import { ReactComponent as ArmSSVG } from '../../../../images/avatar/basic/arm-s.svg';
import { ReactComponent as HandSVG } from '../../../../images/avatar/basic/hand-l.svg';
import { ReactComponent as HandMSVG } from '../../../../images/avatar/basic/hand-m.svg';
import { ReactComponent as HandSSVG } from '../../../../images/avatar/basic/hand-s.svg';

//MING:可選身體元件引入
//MING:手
import { ReactComponent as HandSVGA } from '../../../../images/avatar/hand/hand-l-a.svg';
import { ReactComponent as HandMSVGA } from '../../../../images/avatar/hand/hand-m-a.svg';
import { ReactComponent as HandSSVGA } from '../../../../images/avatar/hand/hand-s-a.svg';
import { ReactComponent as HandSVGB } from '../../../../images/avatar/hand/hand-l-b.svg';
import { ReactComponent as HandMSVGB } from '../../../../images/avatar/hand/hand-m-b.svg';
import { ReactComponent as HandSSVGB } from '../../../../images/avatar/hand/hand-s-b.svg';
import { ReactComponent as HandSVGC } from '../../../../images/avatar/hand/hand-l-c.svg';
import { ReactComponent as HandMSVGC } from '../../../../images/avatar/hand/hand-m-c.svg';
import { ReactComponent as HandSSVGC } from '../../../../images/avatar/hand/hand-s-c.svg';
import { ReactComponent as HandSVGD } from '../../../../images/avatar/hand/hand-l-d.svg';
import { ReactComponent as HandMSVGD } from '../../../../images/avatar/hand/hand-m-d.svg';
import { ReactComponent as HandSSVGD } from '../../../../images/avatar/hand/hand-s-d.svg';

//MING:臉
//MING:頭髮
//MING:前髮
import { ReactComponent as HairFrontSVGA } from '../../../../images/avatar/hair/front-hair-a.svg';
import { ReactComponent as HairFrontSVGB } from '../../../../images/avatar/hair/front-hair-b.svg';
import { ReactComponent as HairFrontSVGC } from '../../../../images/avatar/hair/front-hair-c.svg';
import { ReactComponent as HairFrontSVGD } from '../../../../images/avatar/hair/front-hair-d.svg';
import { ReactComponent as HairFrontSVGE } from '../../../../images/avatar/hair/front-hair-e.svg';

//MING:後髮
import { ReactComponent as HairBackSVGA } from '../../../../images/avatar/hair/back-hair-a.svg';
import { ReactComponent as HairBackSVGB } from '../../../../images/avatar/hair/back-hair-b.svg';
import { ReactComponent as HairBackSVGC } from '../../../../images/avatar/hair/back-hair-c.svg';
import { ReactComponent as HairBackSVGD } from '../../../../images/avatar/hair/back-hair-d.svg';
import { ReactComponent as HairBackSVGE } from '../../../../images/avatar/hair/back-hair-e.svg';

//MING:耳朵
import { ReactComponent as EarSVGA } from '../../../../images/avatar/ear/ear-a.svg';
import { ReactComponent as EarSVGB } from '../../../../images/avatar/ear/ear-b.svg';
import { ReactComponent as EarSVGC } from '../../../../images/avatar/ear/ear-c.svg';
import { ReactComponent as EarSVGD } from '../../../../images/avatar/ear/ear-d.svg';
import { ReactComponent as EarSVG } from '../../../../images/avatar/ear/ear-default.svg';
//MING:獸耳
import { ReactComponent as TopEarSVGA } from '../../../../images/avatar/topear/topear-a.svg';
import { ReactComponent as TopEarSVGB } from '../../../../images/avatar/topear/topear-b.svg';
import { ReactComponent as TopEarSVGC } from '../../../../images/avatar/topear/topear-c.svg';
import { ReactComponent as TopEarSVGD } from '../../../../images/avatar/topear/topear-d.svg';
import { ReactComponent as TopEarSVGE } from '../../../../images/avatar/topear/topear-e.svg';
import { ReactComponent as TopEarSVGF } from '../../../../images/avatar/topear/topear-f.svg';
//MING:眼睛
import { ReactComponent as EyeSVGA } from '../../../../images/avatar/eye/eye-a.svg';
import { ReactComponent as EyeSVGB } from '../../../../images/avatar/eye/eye-b.svg';
import { ReactComponent as EyeSVGC } from '../../../../images/avatar/eye/eye-c.svg';
import { ReactComponent as EyeSVGD } from '../../../../images/avatar/eye/eye-d.svg';
import { ReactComponent as EyeSVGE } from '../../../../images/avatar/eye/eye-e.svg';
//MING:鼻子
import { ReactComponent as NoseSVGA } from '../../../../images/avatar/nose/nose-a.svg';
import { ReactComponent as NoseSVGB } from '../../../../images/avatar/nose/nose-b.svg';
import { ReactComponent as NoseSVGC } from '../../../../images/avatar/nose/nose-c.svg';
import { ReactComponent as NoseSVGD } from '../../../../images/avatar/nose/nose-d.svg';
import { ReactComponent as NoseSVGE } from '../../../../images/avatar/nose/nose-e.svg';
//MING:嘴巴
import { ReactComponent as LipSVGA } from '../../../../images/avatar/lip/lip-a.svg';
import { ReactComponent as LipSVGB } from '../../../../images/avatar/lip/lip-b.svg';
import { ReactComponent as LipSVGC } from '../../../../images/avatar/lip/lip-c.svg';
import { ReactComponent as LipSVGD } from '../../../../images/avatar/lip/lip-d.svg';
import { ReactComponent as LipSVGE } from '../../../../images/avatar/lip/lip-e.svg';

function FaceView(props) {
    const { controlChange, combination } = props;
    const BodyArray = [<BodySSVG />, <BodyMSVG />, <BodyLSVG />];
    const ArmArray = [<ArmSSVG />, <ArmMSVG />, <ArmLSVG />];
    const HandArray = [
        [<HandSSVG />, <HandMSVG />, <HandSVG />],
        [<HandSSVGA />, <HandMSVGA />, <HandSVGA />],
        [<HandSSVGB />, <HandMSVGB />, <HandSVGB />],
        [<HandSSVGC />, <HandMSVGC />, <HandSVGC />],
        [<HandSSVGD />, <HandMSVGD />, <HandSVGD />],
    ];
    const HairFrontArray = [
        <HairFrontSVGA />,
        <HairFrontSVGB />,
        <HairFrontSVGC />,
        <HairFrontSVGD />,
        <HairFrontSVGE />,
    ];
    const HairBackArray = [
        '',
        <HairBackSVGA />,
        <HairBackSVGB />,
        <HairBackSVGC />,
        <HairBackSVGD />,
        <HairBackSVGE />,
    ];
    const EarArray = [
        <EarSVG />,
        <EarSVGA />,
        <EarSVGB />,
        <EarSVGC />,
        <EarSVGD />,
    ];
    const TopEarArray = [
        '',
        <TopEarSVGA />,
        <TopEarSVGB />,
        <TopEarSVGC />,
        <TopEarSVGD />,
        <TopEarSVGE />,
        <TopEarSVGF />,
    ];
    const EyeArray = [
        <EyeSVGA />,
        <EyeSVGB />,
        <EyeSVGC />,
        <EyeSVGD />,
        <EyeSVGE />,
    ];
    const NoseArray = [
        '',
        <NoseSVGA />,
        <NoseSVGB />,
        <NoseSVGC />,
        <NoseSVGD />,
        <NoseSVGE />,
    ];
    const LipArray = [
        '',
        <LipSVGA />,
        <LipSVGB />,
        <LipSVGC />,
        <LipSVGD />,
        <LipSVGE />,
    ];
    const FaceView = styled.div`
        position: relative;
        top: 23%;
        margin: 0 50px;
        width: 230px;
        height: 230px;
        background-color: rgb(0, 0, 0, 0.1);
        overflow: hidden;
        display: ${controlChange ? 'block' : 'none'};
    `;
    const Body = styled.div`
        position: absolute;
        left: -68%;
        svg {
            width: 550px;
            height: 550px;
            path {
                fill: ${BodyData['basicColors'][combination['basic_color']]};
            }
        }
    `;
    const Arm = styled.div`
        position: absolute;
        left: -68%;
        svg {
            width: 550px;
            height: 550px;
            path {
                fill: ${BodyData['basicColors'][combination['basic_color']]};
            }
        }
    `;
    const Hand = styled.div`
        position: absolute;
        left: -68%;
        svg {
            width: 550px;
            height: 550px;
            path {
                fill: ${BodyData['basicColors'][combination['basic_color']]};
            }
            path.palm {
                fill: #555555;
                fill-opacity: 0.3;
            }
        }
    `;

    const Face = styled.div`
        position: absolute;
        left: -68%;
        svg {
            width: 550px;
            height: 550px;
            path {
                fill: ${BodyData['basicColors'][combination['basic_color']]};
            }
        }
    `;
    const Eye = styled.div`
        position: absolute;
        left: -68%;
        svg {
            width: 550px;
            height: 550px;
            path {
                fill: #ffffff;
            }
            path.pupil {
                fill: ${FaceData['eyeColors'][
                    combination['face_color']['eye']
                ]};
            }
        }
    `;
    const Ear = styled.div`
        position: absolute;
        left: -68%;
        svg {
            width: 550px;
            height: 550px;
            path {
                fill: ${BodyData['basicColors'][combination['basic_color']]};
            }
        }
        display: ${combination['face']['topEar'] > 0 ? 'none' : 'block'};
    `;
    const TopEar = styled.div`
        position: absolute;
        left: -68%;
        svg {
            width: 550px;
            height: 550px;
            path {
                fill: ${FaceData['topEarColors'][
                    combination['face_color']['topEar']
                ]};
            }
        }
    `;
    const Nose = styled.div`
        position: absolute;
        left: -68%;
        svg {
            width: 550px;
            height: 550px;
            path {
                fill: ${FaceData['noseColors'][
                    combination['face_color']['nose']
                ]};
            }
        }
    `;
    const Lip = styled.div`
        position: absolute;
        left: -68%;
        svg {
            width: 550px;
            height: 550px;
        }
    `;
    const HairFront = styled.div`
        position: absolute;
        left: -68%;
        svg {
            width: 550px;
            height: 550px;
            path {
                fill: ${FaceData['hairColors'][
                    combination['face_color']['hairFront']
                ]};
            }
        }
    `;
    const HairBack = styled.div`
        position: absolute;
        left: -68%;
        svg {
            width: 550px;
            height: 550px;
            path {
                fill: ${FaceData['hairColors'][
                    combination['face_color']['hairFront']
                ]};
            }
        }
    `;
    return (
        <>
            <FaceView>
                <HairBack>
                    {HairBackArray[combination['face']['hairBack']]}
                </HairBack>
                <Ear>{EarArray[combination['face']['ear']]}</Ear>
                <TopEar>{TopEarArray[combination['face']['topEar']]}</TopEar>
                <Face>
                    <HeadSVG />
                </Face>
                <Eye>{EyeArray[combination['face']['eye']]}</Eye>
                <Lip>{LipArray[combination['face']['lip']]}</Lip>
                <Nose>{NoseArray[combination['face']['nose']]}</Nose>
                <HairFront>
                    {HairFrontArray[combination['face']['hairFront']]}
                </HairFront>
                <Body>{BodyArray[combination['basic'][0]]}</Body>
                <Arm>{ArmArray[combination['basic'][1]]}</Arm>
                <Hand>
                    {
                        HandArray[combination['body']['hand']][
                            combination['basic'][1]
                        ]
                    }
                </Hand>
            </FaceView>
        </>
    );
}

export default FaceView;
