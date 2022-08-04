import { Outlet } from 'react-router-dom';

function ShareWall() {
    return (
        <>
            {/* <div className="container"> */}
            {/* <h2>ShareWall.jsx</h2> */}
            {/* {Array(100)
                .fill(1)
                .map((v, i) => (
                    <p key={i}>{i + 1}</p>
                ))} */}
            {/* <p style={{ wordWrap: 'break-word', wordBreak: 'normal' }}>
                bubububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububububu
            </p> */}
            {/* </div> */}
            <Outlet />
        </>
    );
}

export default ShareWall;
