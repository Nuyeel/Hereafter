import { useState } from 'react';
import HeaderContext, { headers } from './HeaderContext';

function HeaderContextProvider(props) {
    const [header, setHeader] = useState(headers.default);

    return (
        <HeaderContext.Provider value={{ ...header, setHeader }}>
            {props.children}
        </HeaderContext.Provider>
    );
}

export default HeaderContextProvider;
