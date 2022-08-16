// import { React, useEffect } from 'react';
import React from 'react';
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
    const ZoomInScrollOut = batch(MoveIn(0, 200));
    const FadeUp = batch(Fade(), Move(), Sticky());
    const backtoMainpage = () => {
        console.log('click skip');
        navigate('/', { replace: true });
    };

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
    return (
        <>
            <div className="intro-container">
                <div className="yun-fix-scroll">
                    <p>SCROLL</p>
                    <div className="yun-scroll-img">

                    </div>
                </div>
                <div className="yun-intro-skip" onClick={backtoMainpage}>
                    <p>SKIP</p>
                    
                </div>

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
                                FadeIn(0, 1)
                            )}
                        >
                            <div className="mainstar"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(8, 80, 0, 0),
                                Fade(),
                                MoveOut()
                            )}
                        >
                            <div className="intro-h2">
                                曾以為自己是萬中選一的璀璨星星
                            </div>
                        </Animator>
                    </ScrollPage>

                    <ScrollPage></ScrollPage>

                    <ScrollPage>
                        <Animator animation={batch(Pos(50, 50, -50, 0))}>
                            <div className="god-table"></div>
                        </Animator>

                        <Animator
                            animation={batch(
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
                        <Animator animation={batch(Move(50, 50))}>
                            <div className="god-work"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(8, 80, 0, 0),
                                Fade(),
                                Move(0, 50, 0, -50)
                            )}
                        >
                            <div className="intro-h2">
                                此刻卻懷疑自己是一個帶著瑕疵的作品
                            </div>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage></ScrollPage>

                    <ScrollPage>
                        <Animator
                            animation={batch(
                                Pos(40, 20, 0, 0),
                                Fade(),
                                MoveOut()
                            )}
                        >
                            <Clock2 />
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(8, 50, 0, 0),
                                Fade(),
                                MoveOut()
                            )}
                        >
                            <div className="intro-h2">
                                也許覺得自己生不逢時？
                            </div>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage>
                        <Animator
                            animation={batch(
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
                                MoveOut()
                            )}
                        >
                            <div className="intro-h2">
                                還是沒有誕生在適合自己的位置？
                            </div>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage></ScrollPage>

                    <ScrollPage>
                        <Animator
                            animation={batch(
                                Pos(50, 10, 0, 0)
                                // Fade(),
                                // MoveOut()
                            )}
                        >
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
                                Pos(50, 10, 340, 1460),
                                // Fade(),
                                Move(100, 100, 2, -4)
                            )}
                        >
                            <div className="mirrorEye"></div>
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
                                Fade()
                                // MoveOut()
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
                            animation={batch(Pos(10, 10, 0, 0), FadeIn())}
                        >
                            <div className="intro-final-logo"></div>
                        </Animator>
                        <Animator
                            animation={batch(Pos(50, 40, 0, 0), FadeIn())}
                        >
                            <div className="intro-h2">
                                即刻開始打造下一段人生吧
                                <br />
                                你此生的遺憾，將於來生圓滿 <br />
                                歡迎光臨 來生投放所
                            </div>
                        </Animator>
                    </ScrollPage>

                    <ScrollPage></ScrollPage>
                </ScrollContainer>
            </div>
        </>
    );
}

export default Intro;
