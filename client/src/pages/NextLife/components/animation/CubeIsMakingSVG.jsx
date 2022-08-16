function CubeIsMakingSVG(props) {
    const { colorOne, colorTwo } = props;

    return (
        <svg viewBox="0 0 100 100">
            <defs>
                <style></style>
            </defs>
            <path d="M 0,50 a 50,50 0 1,1 0,1 z" id="nlCircle" />
            <text>
                <textPath xlinkHref="#nlCircle">
                    <tspan
                        className="cimSVG-tspan-one"
                        style={{
                            fill: colorOne,
                            fontFamily: 'M PLUS Rounded 1c',
                        }}
                    >
                        NOW LOADING
                    </tspan>
                    <tspan
                        className="cimSVG-tspan-separator"
                        style={{
                            fill: 'transparent',
                            fontSize: '9px',
                        }}
                    >
                        __
                    </tspan>
                    <tspan
                        className="cimSVG-tspan-one"
                        style={{ fill: colorTwo }}
                    >
                        NOW LOADING
                    </tspan>
                    <tspan
                        className="cimSVG-tspan-separator"
                        style={{
                            fill: 'transparent',
                            fontSize: '9px',
                        }}
                    >
                        __
                    </tspan>
                    <tspan
                        className="cimSVG-tspan-one"
                        style={{
                            fill: colorOne,
                        }}
                    >
                        NOW LOADING
                    </tspan>
                    <tspan
                        className="cimSVG-tspan-separator"
                        style={{
                            fill: 'transparent',
                            fontSize: '9px',
                        }}
                    >
                        __
                    </tspan>
                    <tspan
                        className="cimSVG-tspan-one"
                        style={{ fill: colorTwo }}
                    >
                        NOW LOADING
                    </tspan>
                    <tspan
                        className="cimSVG-tspan-separator"
                        style={{
                            fill: 'transparent',
                            fontSize: '9px',
                        }}
                    >
                        __
                    </tspan>
                </textPath>
            </text>
        </svg>
    );
}

export default CubeIsMakingSVG;
