import React from 'react';

function FootViewBtn(props) {
    const { setMapView, IoList, text } = props;

    return (
        <>
            <button
                className="viewMapBtn place-btn"
                onClick={() => setMapView(false)}
            >
                <IoList />
                {text}
            </button>
            <div className="viewMapBtn-layer"></div>
        </>
    );
}

export default FootViewBtn;
