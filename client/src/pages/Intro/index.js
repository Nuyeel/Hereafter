import { React, useEffect, useState } from 'react';

import './introstyle.scss';

// import Clock from './componets/Clock';
import Clock2 from './componets/Clock2';

import Earth from './componets/Earth';
import BgStar from './componets/BgStar';
import { useNavigate } from 'react-router-dom';
import {
    Animator,
    ScrollContainer,
    ScrollPage,
    batch,
    Fade,
    FadeIn,
    FadeOut,
    Move,
    MoveIn,
    MoveOut,
    Sticky,
    StickyIn,
    StickyOut,
    Zoom,
    ZoomIn,
    ZoomOut,
} from 'react-scroll-motion';
// import Clock from './components/Clock';
// import Earth from './components/Earth';
// import Heros from './heroes/HeroesDemo';
var utils_1 = require('../../../node_modules/react-scroll-motion/dist/utils');

function Intro() {
    const navigate = useNavigate();

    const backtoMainpage = () => {
        console.log('click skip');
        navigate('/', { replace: true });
    };
    const [show, setShow] = useState(false);
    const GoMainpage = (
        <>
            <div className="yun-intro-button" onClick={backtoMainpage}>
                <p>規劃我的來生</p>
            </div>
            <div className="intro-end">
                <p>END</p>
                <div className="yun-scroll-img"></div>
            </div>
        </>
    );
    const ScrollGuide = (
        <>
            <div className="yun-intro-skip" onClick={backtoMainpage}>
                <p>SKIP</p>
            </div>

            <div className="yun-fix-scroll">
                <p>SCROLL</p>
                <div className="yun-scroll-img"></div>
            </div>
        </>
    );

    const Push = () => ({
        in: {
            style: {
                // `p` is number (0~1)
                // When just before this page appear, `p` will be 0
                // When this page filled your screen, `p` will be 1
                transformOrigin: `right top`,
                transform: (p) =>
                    `
                    
                    rotate(${-(20 + p * 50)}deg)`,
            },
        },
        out: {
            style: {
                // `p` is number (0~1)
                // When this page filled your screen, `p` will be 0
                // When just after this page disappear, `p` will be 1
                // transform: (p) => `rotate(${(50 + p * 40)}deg)`,
                transformOrigin: `right top`,
                transform: (p) => `
              
                 rotate (${50 - p * 50}deg)`,
            },
        },
    });
    const FadeStay = () => ({
        in: {
            style: {
                opacity: (p) => 0 * p,
            },
        },
        out: {
            style: {
                opacity: (p) => 3 * p,
            },
        },
    });
    const Glass = () => ({
        in: {
            style: {
                // `p` is number (0~1)
                // When just before this page appear, `p` will be 0
                // When this page filled your screen, `p` will be 1
                transformOrigin: `right bottom`,
                transform: (p) => {
                    if (0.5 <= p) {
                        return `rotate(${(p - 0.5) * 180}deg)`;
                    } else {
                        return `rotate(0deg)`;
                    }
                },
            },
        },
        out: {
            style: {
                // `p` is number (0~1)
                // When this page filled your screen, `p` will be 0
                // When just after this page disappear, `p` will be 1
                // transform: (p) => `rotate(${(50 + p * 40)}deg)`,
                transformOrigin: `right bottom`,

                transform: (p) => `
                 rotate (90deg)`,
            },
        },
    });
    const Pos = (left, top, x, y) => {
        if (left === void 0) {
            left = 50;
        }
        if (top === void 0) {
            top = 50;
        }
        return {
            in: {
                style: {
                    left: function () {
                        return ''.concat(
                            (left * utils_1.environment.width) / 100,
                            'px'
                        );
                    },
                    top: function () {
                        return ''.concat(
                            (top * utils_1.environment.height) / 100,
                            'px'
                        );
                    },
                    transform: `translate(${x}%, ${y}%)`,
                    position: 'fixed',
                },
            },
            out: {
                style: {
                    left: function () {
                        return ''.concat(
                            (left * utils_1.environment.width) / 100,
                            'px'
                        );
                    },
                    top: function () {
                        return ''.concat(
                            (top * utils_1.environment.height) / 100,
                            'px'
                        );
                    },
                    transform: `translate(${x}%, ${y}%)`,

                    position: 'fixed',
                },
            },
        };
    };

    useEffect(() => {
        const handleScroll = (event) => {
            const body = document.body;
            const html = document.documentElement;

            const height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
            );
            const scrollDetect = window.innerHeight + window.scrollY;
            console.log('pageHeight', height);
            console.log('window.scrollY', window.scrollY);
            console.log('window.innerHeight', window.innerHeight);
            console.log('scrollDetect', scrollDetect);

            if (scrollDetect == height) {
                // window.removeEventListener('scroll', handleScroll);
                setShow(true);
            } else {
                setShow(false);
                console.log('false');
            }
        };

        window.addEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className="intro-container">
                <ScrollContainer>
                    <BgStar />

                    <ScrollPage>
                        <Animator animation={batch(Sticky(50, 50))}>
                            <div className="star"></div>
                        </Animator>

                        <Animator
                            animation={batch(
                                Pos(50, 50, -99, -96),
                                ZoomOut(1, 1.3)
                            )}
                        >
                            <div className="starmask"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(50, 50, -99, -4),
                                ZoomOut(1, 1.3)
                            )}
                        >
                            <div className="starmask"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(50, 50, -1, -96),
                                ZoomOut(1, 1.3)
                            )}
                        >
                            <div className="starmask"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(50, 50, -1, -4),
                                ZoomOut(1, 1.3)
                            )}
                        >
                            <div className="starmask"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Sticky(50, 50),
                                ZoomOut(0, 5),
                                FadeStay()
                            )}
                        >
                            <div className="mainstar"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(8, 80, 0, 0),
                                Fade(),
                                Move(0, 50, 0, -50)
                            )}
                        >
                            <div className="intro-h2">
                                曾以為自己是萬中選一的璀璨星星
                            </div>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage> </ScrollPage>
                    <ScrollPage>
                        <Animator
                            animation={batch(
                                Fade(),
                                Sticky(50, 50),
                                ZoomIn(0, 1)
                            )}
                        >
                            <div className="god"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(8, 80, 0, 0),
                                FadeIn(),
                                MoveIn(0, 50)
                            )}
                        >
                            <div className="intro-h2">
                                此刻卻懷疑自己是一個帶著瑕疵的作品
                            </div>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage>
                        <Animator
                            animation={batch(
                                Pos(50, 50, -50, 0),
                                ZoomIn(0, 1),
                                Fade()
                            )}
                        >
                            <div className="god-table"></div>
                        </Animator>

                        <Animator animation={batch(Sticky(50, 50))}>
                            <div className="god"></div>
                        </Animator>
                        <Animator animation={batch(Pos(8, 80, 0, 0))}>
                            <div className="intro-h2">
                                此刻卻懷疑自己是一個帶著瑕疵的作品
                            </div>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage>
                        <Animator animation={batch(Pos(50, 50, -50, 0))}>
                            <div className="god-table"></div>
                        </Animator>

                        <Animator
                            animation={batch(
                                FadeIn(),
                                Pos(50, 50, 250, 30),
                                MoveOut(30, 0),
                                Glass()
                            )}
                        >
                            <div className="god-glass1"></div>
                        </Animator>

                        <Animator
                            animation={batch(Pos(50, 50, 0, -25), Push())}
                        >
                            <div className="god-hand"></div>
                        </Animator>
                        <Animator animation={batch(Sticky(50, 50))}>
                            <div className="god"></div>
                        </Animator>

                        <Animator
                            animation={batch(
                                Pos(8, 80, 0, 0),
                                FadeOut(1, 0),
                                MoveOut(0, -50)
                            )}
                        >
                            <div className="intro-h2">
                                此刻卻懷疑自己是一個帶著瑕疵的作品
                            </div>
                        </Animator>
                    </ScrollPage>
                    {/* <ScrollPage>
                        <Animator animation={batch(Pos(50, 50, -50, 0))}>
                            <div className="god-table"></div>
                        </Animator>

                        <Animator
                            animation={batch(FadeIn(), Pos(50, 50, 250, 30))}
                        >
                            <div className="god-glass1"></div>
                        </Animator>

                        <Animator
                            animation={batch(Pos(50, 50, 0, -25), Push())}
                        >
                            <div className="god-hand"></div>
                        </Animator>
                        <Animator animation={batch(Sticky(50, 50))}>
                            <div className="god"></div>
                        </Animator>

                        <Animator
                            animation={batch(
                                Pos(8, 80, 0, 0),
                                FadeOut(1, 0),
                                MoveOut(0, -50)
                            )}
                        >
                            <div className="intro-h2">
                                此刻卻懷疑自己是一個帶著瑕疵的作品
                            </div>
                        </Animator>
                    </ScrollPage> */}
                    <ScrollPage> </ScrollPage>
                    <ScrollPage>
                        <Animator
                            animation={batch(
                                Pos(40, 20, 0, 0),
                                ZoomOut(),
                                FadeOut(1, 0)
                            )}
                        >
                            <Clock2 />
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(8, 50, 0, 0),
                                Fade(),
                                Move(0, 50, 0, -50)
                            )}
                        >
                            <div className="intro-h2">
                                也許覺得自己生不逢時？
                            </div>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage></ScrollPage>
                    <ScrollPage>
                        <Animator
                            animation={batch(
                                ZoomIn(),
                                Pos(40, 25, 0, 0),
                                Fade(),
                                MoveOut()
                            )}
                        >
                            <Earth />
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(8, 50, 0, 0),
                                Fade(),
                                Move(0, 50, 0, -50)
                            )}
                        >
                            <div className="intro-h2">
                                還是沒有誕生在適合自己的位置？
                            </div>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage>
                        <Animator
                            animation={batch(
                                Pos(50, 10, 335, 305),
                                FadeOut(1, 0)
                            )}
                        >
                            <div className="intro-box-front-pin"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(50, 10, 40, 40),
                                ZoomIn(0, 1)
                                // Fade()
                            )}
                        >
                            <div className="intro-box-front"></div>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage>
                        <Animator animation={batch(Pos(50, 10, 0, 0), Fade())}>
                            <div className="intro-box"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(50, 10, 40, 40),
                                ZoomIn(0, 1),
                                FadeOut()
                            )}
                        >
                            <div className="intro-box-front"></div>
                        </Animator>
                        <Animator
                            animation={batch(Pos(50, 10, 40, 40), Fade())}
                        >
                            <div className="mirror"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(50, 10, 0, 0),
                                Fade()
                                // MoveOut()
                            )}
                        >
                            <div className="intro-boxborder"></div>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage>
                        <Animator animation={batch(Pos(50, 10, 0, 0))}>
                            <div className="intro-box"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(50, 10, 125, 190),
                                // FadeIn(),
                                MoveIn(100, 100)
                            )}
                        >
                            <div className="InsideMirror"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(50, 10, 160, 640),
                                FadeStay(),
                                MoveIn(100, 100)
                            )}
                        >
                            <div className="mirrorEar"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(50, 10, 340, 1470),
                                // Fade(),
                                Move(100, 100, 2, -4)
                            )}
                        >
                            <div className="mirrorEye"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(50, 10, 340, 1470),
                                FadeStay(),
                                Move(100, 100, 2, -4)
                            )}
                        >
                            <div className="mirrorEye1"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(50, 10, 40, 40)
                                // Fade(),
                            )}
                        >
                            <div className="mirror1"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(50, 10, 110, 105),
                                // Fade(),
                                MoveIn(100, 100)
                            )}
                        >
                            <div className="mirrorMan"></div>
                        </Animator>

                        <Animator
                            animation={batch(
                                Pos(8, 50, 0, 0),
                                Fade(),
                                Move(0, 50, 0, -50)
                            )}
                        >
                            <div className="intro-h2">又或是不滿意</div>
                            <div className="intro-h2">自己與生俱來的樣子？</div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(50, 10, 0, 0)
                                // Fade(),
                                // MoveOut()
                            )}
                        >
                            <div className="intro-boxborder"></div>
                        </Animator>
                    </ScrollPage>

                    <ScrollPage></ScrollPage>

                    <ScrollPage>
                        <Animator
                            animation={batch(
                                Pos(10, 10, 0, 0),
                                Fade(),
                                Move(0, 50, 0, -50)
                            )}
                        >
                            <div className="intro-final-logo"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(50, 40, 0, 0),
                                Fade(),
                                Move(0, 50, 0, -50)
                            )}
                        >
                            <div className="intro-h2">
                                即刻開始打造下一段人生吧
                                <br />
                                你此生的遺憾，將於來生圓滿 <br />
                                歡迎光臨 來生投放所
                            </div>
                        </Animator>
                        {show ? GoMainpage : ScrollGuide}
                    </ScrollPage>

                    <ScrollPage></ScrollPage>
                </ScrollContainer>
            </div>
        </>
    );
}

export default Intro;
