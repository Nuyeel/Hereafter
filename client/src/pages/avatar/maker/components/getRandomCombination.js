import BodyData from './BodyData';
import FaceData from './FaceData';
function getRandomCombination(combination) {
    const hand = BodyData['hand'].length;
    const foot = BodyData['foot'].length;
    const basicColors = BodyData['basicColors'].length;
    const eye = FaceData['eye'].length;
    const ear = FaceData['ear'].length;
    const nose = FaceData['nose'].length;
    const lip = FaceData['lip'].length;
    const hairFront = FaceData['hairFront'].length;
    const hairBack = FaceData['hairBack'].length;
    const eyeColors = FaceData['eyeColors'].length;
    const noseColors = FaceData['noseColors'].length;
    const hairColors = FaceData['noseColors'].length;

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    };
    const randomCombination = { ...combination };
    randomCombination.basic = [
        getRandomInt(3),
        getRandomInt(3),
        getRandomInt(3),
    ];
    randomCombination.basic_color = getRandomInt(basicColors);
    randomCombination.body['hand'] = getRandomInt(hand);
    randomCombination.body['foot'] = getRandomInt(foot);
    randomCombination.face['eye'] = getRandomInt(eye);
    randomCombination.face['ear'] = getRandomInt(ear);
    randomCombination.face['nose'] = getRandomInt(nose);
    randomCombination.face['lip'] = getRandomInt(lip);
    randomCombination.face['hairFront'] = getRandomInt(hairFront);
    randomCombination.face['hairBack'] = getRandomInt(hairBack);
    randomCombination.face_color['eye'] = getRandomInt(eyeColors);
    randomCombination.face_color['nose'] = getRandomInt(noseColors);
    randomCombination.face_color['hairFront'] = getRandomInt(hairColors);
    return randomCombination;
}
export default getRandomCombination;
