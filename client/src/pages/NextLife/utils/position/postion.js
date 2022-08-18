function position(eachCubeSize, gutters) {
    const positionArray = [
        [
            eachCubeSize * gutters,
            eachCubeSize * gutters,
            eachCubeSize * gutters,
        ],
        [eachCubeSize * gutters, eachCubeSize * gutters, 0],
        [
            eachCubeSize * gutters,
            eachCubeSize * gutters,
            -eachCubeSize * gutters,
        ],
        [eachCubeSize * gutters, 0, eachCubeSize * gutters],
        [eachCubeSize * gutters, 0, 0],
        [eachCubeSize * gutters, 0, -eachCubeSize * gutters],
        [
            eachCubeSize * gutters,
            -eachCubeSize * gutters,
            eachCubeSize * gutters,
        ],
        [eachCubeSize * gutters, -eachCubeSize * gutters, 0],
        [
            eachCubeSize * gutters,
            -eachCubeSize * gutters,
            -eachCubeSize * gutters,
        ],
        [0, eachCubeSize * gutters, eachCubeSize * gutters],
        [0, eachCubeSize * gutters, 0],
        [0, eachCubeSize * gutters, -eachCubeSize * gutters],
        [0, 0, eachCubeSize * gutters],
        [0, 0, 0],
        [0, 0, -eachCubeSize * gutters],
        [0, -eachCubeSize * gutters, eachCubeSize * gutters],
        [0, -eachCubeSize * gutters, 0],
        [0, -eachCubeSize * gutters, -eachCubeSize * gutters],
        [
            -eachCubeSize * gutters,
            eachCubeSize * gutters,
            eachCubeSize * gutters,
        ],
        [-eachCubeSize * gutters, eachCubeSize * gutters, 0],
        [
            -eachCubeSize * gutters,
            eachCubeSize * gutters,
            -eachCubeSize * gutters,
        ],
        [-eachCubeSize * gutters, 0, eachCubeSize * gutters],
        [-eachCubeSize * gutters, 0, 0],
        [-eachCubeSize * gutters, 0, -eachCubeSize * gutters],
        [
            -eachCubeSize * gutters,
            -eachCubeSize * gutters,
            eachCubeSize * gutters,
        ],
        [-eachCubeSize * gutters, -eachCubeSize * gutters, 0],
        [
            -eachCubeSize * gutters,
            -eachCubeSize * gutters,
            -eachCubeSize * gutters,
        ],
    ];

    return positionArray;
}

export default position;
