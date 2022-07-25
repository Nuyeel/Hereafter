import { useState, useEffect, useContext } from 'react';
import ShareWallTagbar from './ShareWallTagbar';
import ShareWallSearchBar from './ShareWallSearchBar';

import HeaderContext, { headers } from '../../context/HeaderContext/HeaderContext';

function ShareWallList(props) {
    const { pageName } = props;
    const { setHeader } = useContext(HeaderContext);

    useEffect(()=> {
        setHeader(headers[pageName]);
    }, []);

    return (
        <div className="container">
            <ShareWallTagbar />
            <ShareWallSearchBar />
            <h3 style={{ color: '#FFFFFF' }}>ShareWallList.jsx</h3>
        </div>
    );
}

export default ShareWallList;
