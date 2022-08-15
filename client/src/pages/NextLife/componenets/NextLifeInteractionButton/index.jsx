import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import Swal from 'sweetalert2';
import OutlineSoulAlert from '../../../../images/sweetalert2/outline_soul_alert.svg';

import './NextLifeInteractionButton.scss';

function NextLifeInteractionButton(props) {
    const {
        nextLifeStage,
        setNextLifeStage,
        nextLifeTextareaString,
        setTextIsHidden,
    } = props;

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
        console.log(NewNextLifeStage);

        setTextIsHidden(true);

        if (NewNextLifeStage === 3) {
            setTimeout(() => {
                setNextLifeStage(NewNextLifeStage);
            }, 2000);
        }
    };

    return (
        <div className={`container nlInteraction isShown`}>
            <button
                className={`nlInteraction-button nlInteraction-IoIosArrowUp-area d-flex justify-content-center align-items-center ${
                    nextLifeStage === 2 ? 'isDisabled' : ''
                }`}
            >
                <IoIosArrowUp className="nlInteraction-IoIosArrowUp" />
            </button>
            <button
                className="nlInteraction-button nlInteraction-IoIosArrowDown-area d-flex justify-content-center align-items-center"
                onClick={() => {
                    if (nextLifeStage === 2) {
                        handleTextSubmit();
                    }
                }}
            >
                <IoIosArrowDown className="nlInteraction-IoIosArrowDown" />
            </button>
        </div>
    );
}

export default NextLifeInteractionButton;
