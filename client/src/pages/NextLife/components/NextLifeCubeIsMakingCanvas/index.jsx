import { forwardRef } from 'react';

function NextLifeCubeIsMakingCanvas(props, ref) {
    return (
        <canvas
            ref={ref}
            width="512px"
            height="512px"
            style={{
                backgroundColor: 'transparent',
                position: 'fixed',
                left: 0,
                top: 0,
                width: '512px',
                height: '512px',
                display: 'none',
            }}
        ></canvas>
    );
}

export default forwardRef(NextLifeCubeIsMakingCanvas);
