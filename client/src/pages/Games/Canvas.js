import React from 'react';
import PropTypes from 'prop-types';
const Canvas = ({ draw, height, width }) => {
    const canvas = React.useRef();
    React.useEffect(() => {
        const ctx = canvas.current.getContext('2d');
        draw(ctx);
    });
    return <canvas ref={canvas} height={height} width={width} />;
};
Canvas.propTypes = {
    draw: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
};
export default Canvas;
