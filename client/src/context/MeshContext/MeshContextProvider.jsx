import { useState, useMemo } from 'react';
import MeshContext from './MeshContext';

import myTextureLoader from '../../pages/NextLife/utils/texture/myTextureLoader';
import myMaterialLoader from '../../pages/NextLife/utils/material/myMaterialLoader';

import boxMap from '../../pages/NextLife/utils/box/boxMap';
import fontColorMap from '../../pages/NextLife/utils/fontcolor/fontColorMap';

function MeshContextProvider(props) {
    const meshesData = useMemo(() => {
        const texturesData = myTextureLoader();

        let materialsData = [];

        boxMap.forEach((item, index) => {
            materialsData.push(myMaterialLoader(item.ID, texturesData[index]));
        });

        let fontColorsData = [];

        fontColorMap.forEach((item, index) => {
            fontColorsData.push({
                colorOne: item[0],
                colorTwo: item[1],
                colorTop: item[2],
            });
        });

        return { texturesData, materialsData, fontColorsData };
    }, []);

    console.log(meshesData);

    // setState() 永遠用不到
    const [meshesMemoData, setMeshesMemoData] = useState(meshesData);

    return (
        <MeshContext.Provider value={{ ...meshesMemoData, setMeshesMemoData }}>
            {props.children}
        </MeshContext.Provider>
    );
}

export default MeshContextProvider;
