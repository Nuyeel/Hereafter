import { useCallback, useEffect, useRef, useState } from 'react';
import { toPng, toSvg } from 'html-to-image';
import styled from '@emotion/styled';
import BodyData from './BodyData';
import FaceData from './FaceData';
import { Avatar_Update } from '../../../../config/ajax-path';
import axios from 'axios';
import Soul from '../../components/Soul.js';
import Swal from 'sweetalert2';
import gsap from 'gsap';
import getRandomCombination from './getRandomCombination';

//MING: Basic引入
import { ReactComponent as HeadSVG } from '../../../../images/avatar/basic/face.svg';
import { ReactComponent as BodyLSVG } from '../../../../images/avatar/basic/body-l.svg';
import { ReactComponent as BodyMSVG } from '../../../../images/avatar/basic/body-m.svg';
import { ReactComponent as BodySSVG } from '../../../../images/avatar/basic/body-s.svg';
import { ReactComponent as ArmLSVG } from '../../../../images/avatar/basic/arm-l.svg';
import { ReactComponent as ArmMSVG } from '../../../../images/avatar/basic/arm-m.svg';
import { ReactComponent as ArmSSVG } from '../../../../images/avatar/basic/arm-s.svg';
import { ReactComponent as LegLSVG } from '../../../../images/avatar/basic/leg-l.svg';
import { ReactComponent as LegMSVG } from '../../../../images/avatar/basic/leg-m.svg';
import { ReactComponent as LegSSVG } from '../../../../images/avatar/basic/leg-s.svg';
import { ReactComponent as HandLSVG } from '../../../../images/avatar/basic/hand-l.svg';
import { ReactComponent as HandMSVG } from '../../../../images/avatar/basic/hand-m.svg';
import { ReactComponent as HandSSVG } from '../../../../images/avatar/basic/hand-s.svg';
import { ReactComponent as FootSSVG } from '../../../../images/avatar/basic/foot-s.svg';
import { ReactComponent as FootMSVG } from '../../../../images/avatar/basic/foot-m.svg';
import { ReactComponent as FootLSVG } from '../../../../images/avatar/basic/foot-l.svg';

//MING:可選身體元件引入
//MING:手
import { ReactComponent as HandLSVGA } from '../../../../images/avatar/hand/hand-l-a.svg';
import { ReactComponent as HandMSVGA } from '../../../../images/avatar/hand/hand-m-a.svg';
import { ReactComponent as HandSSVGA } from '../../../../images/avatar/hand/hand-s-a.svg';
import { ReactComponent as HandLSVGB } from '../../../../images/avatar/hand/hand-l-b.svg';
import { ReactComponent as HandMSVGB } from '../../../../images/avatar/hand/hand-m-b.svg';
import { ReactComponent as HandSSVGB } from '../../../../images/avatar/hand/hand-s-b.svg';
import { ReactComponent as HandLSVGC } from '../../../../images/avatar/hand/hand-l-c.svg';
import { ReactComponent as HandMSVGC } from '../../../../images/avatar/hand/hand-m-c.svg';
import { ReactComponent as HandSSVGC } from '../../../../images/avatar/hand/hand-s-c.svg';
import { ReactComponent as HandLSVGD } from '../../../../images/avatar/hand/hand-l-d.svg';
import { ReactComponent as HandMSVGD } from '../../../../images/avatar/hand/hand-m-d.svg';
import { ReactComponent as HandSSVGD } from '../../../../images/avatar/hand/hand-s-d.svg';

//MING:腳
import { ReactComponent as FootLSVGA } from '../../../../images/avatar/foot/foot-l-a.svg';
import { ReactComponent as FootMSVGA } from '../../../../images/avatar/foot/foot-m-a.svg';
import { ReactComponent as FootSSVGA } from '../../../../images/avatar/foot/foot-s-a.svg';
import { ReactComponent as FootLSVGB } from '../../../../images/avatar/foot/foot-l-b.svg';
import { ReactComponent as FootMSVGB } from '../../../../images/avatar/foot/foot-m-b.svg';
import { ReactComponent as FootSSVGB } from '../../../../images/avatar/foot/foot-s-b.svg';
import { ReactComponent as FootLSVGC } from '../../../../images/avatar/foot/foot-l-c.svg';
import { ReactComponent as FootMSVGC } from '../../../../images/avatar/foot/foot-m-c.svg';
import { ReactComponent as FootSSVGC } from '../../../../images/avatar/foot/foot-s-c.svg';
import { ReactComponent as FootLSVGD } from '../../../../images/avatar/foot/foot-l-d.svg';
import { ReactComponent as FootMSVGD } from '../../../../images/avatar/foot/foot-m-d.svg';
import { ReactComponent as FootSSVGD } from '../../../../images/avatar/foot/foot-s-d.svg';

//MING:特殊
import { ReactComponent as TaleSVG } from '../../../../images/avatar/tale/tail-a.svg';
import { ReactComponent as SpecialSVGA } from '../../../../images/avatar/special/tail-special-a.svg';
import { ReactComponent as SpecialSVGB } from '../../../../images/avatar/special/tail-special-b.svg';

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

function CenterPart(props) {
    const {
        combination,
        controlChange,
        setControlChange,
        setBodyControlChange,
        setColorControlSwitch,
        setFaceControlChange,
        backtoShowCase,
        keepChange,
        theme,
        setCombination,
        setKeepLineChange,
        canSave,
    } = props;
    //用來製作圖檔的ref 沒了會死
    const ref = useRef(null);

    //MING:素材陣列
    const BodyArray = [<BodySSVG />, <BodyMSVG />, <BodyLSVG />];
    const ArmArray = [<ArmSSVG />, <ArmMSVG />, <ArmLSVG />];
    const LegArray = [<LegSSVG />, <LegMSVG />, <LegLSVG />];
    const HandArray = [
        [<HandSSVG />, <HandMSVG />, <HandLSVG />],
        [<HandSSVGA />, <HandMSVGA />, <HandLSVGA />],
        [<HandSSVGB />, <HandMSVGB />, <HandLSVGB />],
        [<HandSSVGC />, <HandMSVGC />, <HandLSVGC />],
        [<HandSSVGD />, <HandMSVGD />, <HandLSVGD />],
    ];
    const FootArray = [
        [<FootSSVG />, <FootMSVG />, <FootLSVG />],
        [<FootSSVGA />, <FootMSVGA />, <FootLSVGA />],
        [<FootSSVGB />, <FootMSVGB />, <FootLSVGB />],
        [<FootSSVGC />, <FootMSVGC />, <FootLSVGC />],
        [<FootSSVGD />, <FootMSVGD />, <FootLSVGD />],
    ];
    const TaleArray = ['', <TaleSVG />];
    const SpecialArray = ['', <SpecialSVGA />, <SpecialSVGB />];
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
    //MING:總價計算
    const avatarTotalPrice =
        BodyData['hand'][combination['body']['hand']]['price'] +
        (combination['body']['special']
            ? BodyData['special'][combination['body']['special']]['price']
            : BodyData['foot'][combination['body']['foot']]['price']) +
        BodyData['tale'][combination['body']['tale']]['price'] +
        FaceData['eye'][combination['face']['eye']]['price'] +
        FaceData['nose'][combination['face']['nose']]['price'] +
        FaceData['lip'][combination['face']['lip']]['price'] +
        FaceData['hairFront'][combination['face']['hairFront']]['price'] +
        FaceData['hairBack'][combination['face']['hairBack']]['price'] +
        (combination['face']['topEar']
            ? FaceData['topEar'][combination['face']['topEar']]['price']
            : FaceData['ear'][combination['face']['ear']]['price']);
    const combinationText = {
        hand: BodyData['hand'][combination['body']['hand']]['name'],
        foot: combination['body']['special']
            ? BodyData['special'][combination['body']['special']]['name']
            : BodyData['foot'][combination['body']['foot']]['name'],
        bodyColor: BodyData['basicColorsName'][combination['basic_color']],
        specialColor: combination['body']['special']
            ? BodyData['specialColorsName'][
                  combination['special_color']['special']
              ]
            : '',
        tale: combination['body']['tale'] ? '有' : '無',
        taleColor: combination['body']['tale']
            ? BodyData['taleColorsName'][combination['special_color']['tale']]
            : '',
        eye: FaceData['eye'][combination['face']['eye']]['name'],
        eyeColor: FaceData['eyeColorsName'][combination['face_color']['eye']],
        nose: FaceData['nose'][combination['face']['nose']]['name'],
        noseColor:
            FaceData['noseColorsName'][combination['face_color']['nose']],
        hair:
            FaceData['hairFront'][combination['face']['hairFront']]['name'] +
            '+' +
            FaceData['hairBack'][combination['face']['hairBack']]['name'],
        hairColor:
            FaceData['hairColorsName'][combination['face_color']['hairFront']],
        ear: combination['face']['topEar']
            ? FaceData['topEar'][combination['face']['topEar']]['name']
            : FaceData['ear'][combination['face']['ear']]['name'],
        topearColor: combination['face']['topEar']
            ? FaceData['topEarColorsName'][combination['face_color']['topEar']]
            : '',
        lip: FaceData['lip'][combination['face']['lip']]['name'],
    };
    const orderData = { combination: { ...combination } };
    const aid = sessionStorage.getItem('avatar_id');
    const member = JSON.parse(localStorage.getItem('auth'));
    if (member !== null) {
        orderData.id = member['sid'];
    }
    orderData.avatar_id = aid;
    orderData.combinationText = combinationText;
    orderData.totalPrice = avatarTotalPrice;
    const onButtonClick = useCallback(async () => {
        if (
            canSave['hand'] &&
            canSave['foot'] &&
            canSave['tale'] &&
            canSave['special'] &&
            canSave['eye'] &&
            canSave['ear'] &&
            canSave['lip'] &&
            canSave['nose'] &&
            canSave['hairFront'] &&
            canSave['hairBack'] &&
            canSave['topEar']
        ) {
            Swal.fire({
                title: '形象準備中',
                didOpen: () => {
                    setTimeout(
                        Swal.update({
                            confirmButtonText:
                                '<i class="fa fa-thumbs-up"></i> 我知道了',
                        }),
                        2000
                    );
                },
            });
            if (ref.current === null) {
                return;
            }
            await toPng(ref.current, {
                cacheBust: true,
                pixelRatio: 1.2,
                canvasWidth: 900,
                canvasHeight: 900,
            })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = 'my-image-name.png';
                    link.href = dataUrl;
                    orderData.img = dataUrl;
                    if (sessionStorage.getItem('avatar_id') === null) {
                        link.click();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            if (sessionStorage.getItem('avatar_id') === null) {
                console.log('Meow 目前沒有訂單編號!');
            } else {
                const r = await axios.post(Avatar_Update, orderData);
                console.log(orderData);
                console.log(r.data);
                if (r.data.success) {
                    Swal.fire({
                        title: '形象保存成功',
                        confirmButtonText: `<p >我知道了</p>`,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            console.log('訂單ID已清除');
                            sessionStorage.removeItem('avatar_id');
                            backtoShowCase();
                        }
                    });
                }
            }
        } else {
            Swal.fire({
                title: '陰德值不足',
                confirmButtonText: `<p >我知道了</p>`,
            });
        }
    }, [ref]);

    const Center = styled.div`
        width: 450px;
        height: 100%;
        flex: 0 0 auto;
        padding: 50px 0 0 0;
        box-sizing: border-box;
        position: relative;
    `;
    const BGSquare = styled.div`
        position: absolute;
        border: ${theme.bcAvatarFrame} 3px solid;
        height: 68%;
        width: 68%;
        top: 20%;
        left: 16%;
    `;
    const BGCircle = styled.div`
        position: absolute;
        border: ${theme.bcAvatarFrame} 3px solid;
        border-radius: 50%;
        height: 82%;
        width: 82%;
        top: 6%;
        left: 9%;
    `;
    //*MING:Body區
    const Face = styled.div`
        position: absolute;
        svg {
            path {
                fill: ${BodyData['basicColors'][combination['basic_color']]};
            }
        }
    `;
    const Body = styled.div`
        position: absolute;
        svg {
            path {
                fill: ${BodyData['basicColors'][combination['basic_color']]};
            }
        }
    `;
    const Arm = styled.div`
        position: absolute;
        svg {
            path {
                fill: ${BodyData['basicColors'][combination['basic_color']]};
            }
        }
    `;
    const Hand = styled.div`
        position: absolute;
        svg {
            path {
                fill: ${BodyData['basicColors'][combination['basic_color']]};
            }
            path.palm {
                fill: #555555;
                fill-opacity: 0.3;
            }
        }
    `;
    const Leg = styled.div`
        position: absolute;
        svg {
            path {
                fill: ${BodyData['basicColors'][combination['basic_color']]};
            }
        }
        display: ${combination['body']['special'] > 0 ? 'none' : 'block'};
    `;
    const Foot = styled.div`
        position: absolute;
        svg {
            path {
                fill: ${BodyData['basicColors'][combination['basic_color']]};
            }
            path.palm {
                fill: #555555;
                fill-opacity: 0.3;
            }
        }
        display: ${combination['body']['special'] > 0 ? 'none' : 'block'};
    `;
    //MING:臉區
    const Eye = styled.div`
        position: absolute;
        svg {
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
        svg {
            path {
                fill: ${BodyData['basicColors'][combination['basic_color']]};
            }
        }
        display: ${combination['face']['topEar'] > 0 ? 'none' : 'block'};
    `;
    const TopEar = styled.div`
        position: absolute;
        svg {
            path {
                fill: ${FaceData['topEarColors'][
                    combination['face_color']['topEar']
                ]};
            }
        }
    `;
    const Nose = styled.div`
        position: absolute;
        svg {
            path {
                fill: ${FaceData['noseColors'][
                    combination['face_color']['nose']
                ]};
            }
        }
    `;
    const Lip = styled.div`
        position: absolute;
    `;
    const HairFront = styled.div`
        position: absolute;
        svg {
            path {
                fill: ${FaceData['hairColors'][
                    combination['face_color']['hairFront']
                ]};
            }
        }
    `;
    const HairBack = styled.div`
        position: absolute;
        svg {
            path {
                fill: ${FaceData['hairColors'][
                    combination['face_color']['hairFront']
                ]};
            }
        }
    `;
    //MING:特殊
    const Tale = styled.div`
        position: absolute;
        svg {
            path {
                fill: ${BodyData['taleColors'][
                    combination['special_color']['tale']
                ]};
            }
        }
    `;
    const Special = styled.div`
        position: absolute;
        top: 0%;
        left: 0%;
        svg {
            path {
                fill: ${BodyData['specialColorsid'][
                    combination['special_color']['special']
                ]};
            }
        }
    `;

    //MING:控制面板
    const FaceControl = styled.div`
        position: absolute;
        ${'' /* border: #ffc 5px dotted; */}
        height: 135px;
        width: 135px;
        border-radius: 50%;
        top: 6%;
        left: 34.5%;
        cursor: pointer;
        display: ${controlChange ? 'none' : 'block'};
        div {
            opacity: 0;
            position: absolute;
            width: 80px;
            top: -20px;
            left: 140px;
        }
    `;
    const HandRControl = styled.div`
        position: absolute;
        ${'' /* border: #ffc 5px dotted; */}
        height: 120px;
        width: 90px;
        border-radius: 50%;
        top: 15%;
        left: 70%;
        cursor: pointer;
        display: ${controlChange ? 'none' : 'block'};
        div {
            opacity: 0;
            position: absolute;
            width: 80px;
            top: -30px;
            left: 30px;
        }
    `;
    const HandLControl = styled.div`
        position: absolute;
        ${'' /* border: #ffc 5px dotted; */}
        height: 120px;
        width: 90px;
        border-radius: 50%;
        top: 15%;
        left: 10%;
        cursor: pointer;
        display: ${controlChange ? 'none' : 'block'};
        div {
            opacity: 0;
            position: absolute;
            width: 80px;
            top: -30px;
            left: 25px;
        }
    `;
    const FootRControl = styled.div`
        position: absolute;
        ${'' /* border: #ffc 5px dotted; */}
        height: 130px;
        width: 120px;
        border-radius: 50%;
        top: 67%;
        left: 60%;
        cursor: pointer;
        display: ${controlChange ? 'none' : 'block'};
        div {
            opacity: 0;
            position: absolute;
            width: 80px;
            top: 100px;
            left: 120px;
        }
    `;
    const FootLControl = styled.div`
        position: absolute;
        ${'' /* border: #ffc 5px dotted; */}
        height: 130px;
        width: 120px;
        border-radius: 50%;
        top: 67%;
        left: 16%;
        cursor: pointer;
        display: ${controlChange ? 'none' : 'block'};
        div {
            opacity: 0;
            position: absolute;
            width: 80px;
            top: 100px;
            left: -55px;
        }
    `;
    const TaleControl = styled.div`
        position: absolute;
        ${'' /* border: #cff 5px dotted; */}
        height: 60px;
        width: 150px;
        border-radius: 50%;
        top: 46%;
        left: 62%;
        cursor: pointer;
        display: ${controlChange ? 'none' : 'block'};
        div {
            opacity: 0;
            position: absolute;
            width: 80px;
            top: 35px;
            left: 130px;
        }
    `;
    const SpecialControl = styled.div`
        position: absolute;
        height: 60px;
        width: 150px;
        border-radius: 50%;
        top: 55%;
        left: 32%;
        cursor: pointer;
        display: ${controlChange ? 'none' : 'block'};
        div {
            opacity: 0;
            position: absolute;
            width: 80px;
            top: 50px;
            left: -145px;
        }
    `;
    const BodyControl = styled.div`
        ${'' /* border: #cff 5px dotted; */}
        position: absolute;
        height: 450px;
        width: 450px;
        display: ${controlChange ? 'block' : 'none'};
        cursor: pointer;
        z-index: 20;
        div {
            padding-left: 15px;
            opacity: 0;
            position: absolute;
            top: 100%;
            i {
                position: relative;
                top: 10px;
                font-size: 50px;
            }
            span {
                padding-left: 10px;
                font-size: 30px;
            }
        }
    `;
    const Info = styled.div`
        position: relative;
        top: -22px;
        left: 40%;
    `;
    const SaveBtn = styled.div`
        position: relative;
        top: -13px;
        left: 3%;
        display: ${keepChange ? 'none' : 'flex'};
        justify-content: center;
        div {
            border: 1px solid;
            padding: 10px 30px;
            border-radius: 12px;
            margin: 0 10px;
            font-size: 20px;
            cursor: pointer;
            i {
                font-size: 24px;
            }
        }
    `;
    const SoulColor = styled.div`
        path {
            fill: ${theme.cHeader};
        }
        circle {
            stroke: ${theme.cHeader};
        }
    `;
    const onEnter = ({ currentTarget }) => {
        gsap.to(gsap.utils.selector(currentTarget)('.showBackHint'), {
            opacity: '1',
        });
    };

    const onLeave = ({ currentTarget }) => {
        gsap.to(gsap.utils.selector(currentTarget)('.showBackHint'), {
            opacity: '0',
        });
    };
    return (
        <>
            <Center>
                <div
                    style={{
                        position: 'relative',
                        width: '450px',
                        height: '450px',
                    }}
                >
                    <BodyControl
                        onClick={() => {
                            setControlChange(0);
                            setBodyControlChange('hand');
                            setKeepLineChange('hand');
                            setColorControlSwitch(0);
                        }}
                        onMouseEnter={onEnter}
                        onMouseLeave={onLeave}
                    >
                        <div className="showBackHint">
                            <i className="fa-solid fa-arrow-left-long"></i>
                            <span>Back to edit Body</span>
                        </div>
                    </BodyControl>
                    <BGSquare></BGSquare>
                    <BGCircle></BGCircle>
                    <div
                        ref={ref}
                        className="pic text-center mb-4"
                        style={{
                            width: '450px',
                            height: '450px',
                            position: 'relative',
                            boxSizing: 'border-box',
                        }}
                    >
                        <HairBack>
                            {HairBackArray[combination['face']['hairBack']]}
                        </HairBack>
                        <Ear>{EarArray[combination['face']['ear']]}</Ear>
                        <Tale>{TaleArray[combination['body']['tale']]}</Tale>
                        <TopEar>
                            {TopEarArray[combination['face']['topEar']]}
                        </TopEar>
                        <Special>
                            {SpecialArray[combination['body']['special']]}
                        </Special>
                        <Body>{BodyArray[combination['basic'][0]]}</Body>
                        <Face>
                            <HeadSVG />
                        </Face>
                        <Eye>{EyeArray[combination['face']['eye']]}</Eye>
                        <Lip>{LipArray[combination['face']['lip']]}</Lip>
                        <Nose>{NoseArray[combination['face']['nose']]}</Nose>
                        <HairFront>
                            {HairFrontArray[combination['face']['hairFront']]}
                        </HairFront>
                        <Arm>{ArmArray[combination['basic'][1]]}</Arm>
                        <Hand>
                            {
                                HandArray[combination['body']['hand']][
                                    combination['basic'][1]
                                ]
                            }
                        </Hand>
                        <Leg>{LegArray[combination['basic'][2]]}</Leg>
                        <Foot>
                            {
                                FootArray[combination['body']['foot']][
                                    combination['basic'][2]
                                ]
                            }
                        </Foot>
                    </div>
                    <FaceControl
                        onClick={() => {
                            setControlChange(1);
                            setColorControlSwitch(1);
                            setFaceControlChange('eye');
                        }}
                        onMouseEnter={onEnter}
                        onMouseLeave={onLeave}
                    >
                        <div className="showBackHint">
                            <Soul />
                            <span>臉</span>
                        </div>
                    </FaceControl>
                    <HandRControl
                        onClick={() => {
                            setColorControlSwitch(0);
                            setBodyControlChange('hand');
                        }}
                        onMouseEnter={onEnter}
                        onMouseLeave={onLeave}
                    >
                        <div className="showBackHint">
                            <Soul />
                            <span>手</span>
                        </div>
                    </HandRControl>
                    <HandLControl
                        onClick={() => {
                            setColorControlSwitch(0);
                            setBodyControlChange('hand');
                        }}
                        onMouseEnter={onEnter}
                        onMouseLeave={onLeave}
                    >
                        <div className="showBackHint">
                            <Soul />
                            <span>手</span>
                        </div>
                    </HandLControl>
                    <FootRControl
                        onClick={() => {
                            setBodyControlChange('foot');
                            setColorControlSwitch(0);
                        }}
                        onMouseEnter={onEnter}
                        onMouseLeave={onLeave}
                    >
                        <div className="showBackHint">
                            <Soul />
                            <span>腳</span>
                        </div>
                    </FootRControl>
                    <FootLControl
                        onClick={() => {
                            setBodyControlChange('foot');
                            setColorControlSwitch(0);
                        }}
                        onMouseEnter={onEnter}
                        onMouseLeave={onLeave}
                    >
                        <div className="showBackHint">
                            <Soul />
                            <span>腳</span>
                        </div>
                    </FootLControl>
                    <SpecialControl
                        onClick={() => {
                            setBodyControlChange('special');
                            setColorControlSwitch(1);
                        }}
                        onMouseEnter={onEnter}
                        onMouseLeave={onLeave}
                    >
                        <div className="showBackHint">
                            <Soul />
                            <span>特殊</span>
                        </div>
                    </SpecialControl>
                    <TaleControl
                        onClick={() => {
                            setBodyControlChange('tale');
                            setColorControlSwitch(1);
                        }}
                        onMouseEnter={onEnter}
                        onMouseLeave={onLeave}
                    >
                        <div className="showBackHint">
                            <Soul />
                            <span>尾巴</span>
                        </div>
                    </TaleControl>
                </div>

                <Info>
                    <SoulColor>
                        <p>
                            總計:{avatarTotalPrice}
                            <Soul />
                        </p>
                    </SoulColor>
                </Info>
                <SaveBtn>
                    <div onClick={onButtonClick}>
                        <i className="fa-solid fa-floppy-disk"></i> 儲存
                    </div>
                    <div
                        onClick={() => {
                            const randomCombination =
                                getRandomCombination(combination);
                            setCombination(randomCombination);
                        }}
                    >
                        <i className="fa-solid fa-dice"></i> 隨機
                    </div>
                </SaveBtn>
            </Center>
        </>
    );
}

export default CenterPart;
