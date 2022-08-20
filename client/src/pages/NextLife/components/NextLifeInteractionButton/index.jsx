import { useContext } from 'react';
import axios from 'axios';

import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import Swal from 'sweetalert2';
// import OutlineSoul from '../../../../images/sweetalert2/outline_soul.svg';
import OutlineSoulAlert from '../../../../images/sweetalert2/outline_soul_alert.svg';

import AuthContext from '../../../../context/AuthContext/AuthContext';

import { API_NEXTLIFE } from '../../../../config/ajax-path';

import boxMap from '../../utils/box/boxMap';

import './NextLifeInteractionButton.scss';

function NextLifeInteractionButton(props) {
    const {
        nextLifeStage,
        setNextLifeStage,
        nextLifeTextareaString,
        setTextIsHidden,
        cubeIsMaking,
        setCubeIsMaking,
        currentCubeOptionIndex,
        handleCubeTextDraw,
    } = props;

    // console.log(canvasRef);

    const { token } = useContext(AuthContext);

    const axiosCubeIsMakingPOST = async () => {
        const result = await axios(API_NEXTLIFE, {
            method: 'POST',
            data: {
                cubeStyleID: boxMap[currentCubeOptionIndex].ID,
                nextLifeTextareaString: nextLifeTextareaString,
            },
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        // console.log(result.data);

        if (!result.data.cubeCreateResult) {
            return Swal.fire({
                title: '好像出了一點問題...',
                imageUrl: OutlineSoulAlert,
                imageHeight: 50,
                imageWidth: 50,
                showConfirmButton: false,
            });
        }

        handleCubeTextDraw();
        setCubeIsMaking(true);
    };

    const handleTextSubmit = () => {
        if (nextLifeTextareaString.trim() === '') {
            return Swal.fire({
                title: '請不要讓一生留白～',
                imageUrl: OutlineSoulAlert,
                imageHeight: 50,
                imageWidth: 50,
                showConfirmButton: false,
            });
        }

        const NewNextLifeStage = 3;
        // console.log(NewNextLifeStage);

        setTextIsHidden(true);

        if (NewNextLifeStage === 3) {
            setTimeout(() => {
                setNextLifeStage(NewNextLifeStage);
            }, 2000);
        }
    };

    const handleTextRevise = () => {
        const NewNextLifeStage = 2;
        // console.log(NewNextLifeStage);

        setTextIsHidden(false);

        if (NewNextLifeStage === 2) {
            setTimeout(() => {
                setNextLifeStage(NewNextLifeStage);
            }, 0);
        }
    };

    const handleCubeMaking = () => {
        // console.log('該開始做方塊了');
        axiosCubeIsMakingPOST();
        // console.log('nextLifeTextareaString', nextLifeTextareaString);
    };

    return (
        <div
            className={`container nlInteraction ${
                cubeIsMaking ? 'isMaking' : 'isShown'
            }`}
        >
            <button
                className={`nlInteraction-button nlInteraction-IoIosArrowUp-area d-flex justify-content-center align-items-center ${
                    nextLifeStage === 2 ? 'isDisabled' : 'isAbled'
                }`}
                onClick={() => {
                    if (nextLifeStage === 3) {
                        handleTextRevise();
                    }
                }}
            >
                <IoIosArrowUp className="nlInteraction-IoIosArrowUp" />
            </button>
            <button
                className={`nlInteraction-button nlInteraction-IoIosArrowDown-area d-flex justify-content-center align-items-center ${
                    nextLifeStage === 2 ? '' : 'isFinale'
                }`}
                onClick={() => {
                    if (nextLifeStage === 2) {
                        return handleTextSubmit();
                    } else if (nextLifeStage === 3) {
                        // TODO:
                        return handleCubeMaking();
                    }
                }}
            >
                {nextLifeStage === 2 ? (
                    <IoIosArrowDown className="nlInteraction-IoIosArrowDown" />
                ) : (
                    <p className="nlInteraction-OK-paragraph">OK</p>
                )}
            </button>
        </div>
    );
}

export default NextLifeInteractionButton;
