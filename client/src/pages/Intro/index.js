// import { React, useEffect } from 'react';
import React from 'react';
import './introstyle.scss';

import Clock from './componets/Clock';
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
                transform: (p) => `rotate(${-(10 + p * 50)}deg)`,
                transformOrigin: 'top center  ',
            },
        },
        out: {
            style: {
                // `p` is number (0~1)
                // When this page filled your screen, `p` will be 0
                // When just after this page disappear, `p` will be 1
                // transform: (p) => `rotate(${(50 + p * 40)}deg)`,
                transform: `rotate (40deg)`,

                transformOrigin: 'top center  ',
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
                <div className="yun-fix-scroll">scroll down</div>
                <div className="yun-intro-skip" onClick={backtoMainpage}>
                    {' '}
                    skip
                </div>

                <ScrollContainer>
                    <ScrollPage>
                        {/* <div className="otherStars">
                            <div className="otherStar"></div>
                            <div className="otherStar"></div>
                            <div className="otherStar"></div>
                            <div className="otherStar"></div>
                            <div className="otherStar"></div>
                            <div className="otherStar"></div>
                            <div className="otherStar"></div>
                        </div> */}
                        <Animator
                            animation={batch(Sticky(50, 50), Fade(0.8, 1))}
                        >
                            <BgStar />
                        </Animator>
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
                            animation={batch(Sticky(50, 50), ZoomOut(0, 5))}
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
                            <h2>曾以為自己是萬中選一的璀璨星星</h2>
                        </Animator>
                    </ScrollPage>

                    <ScrollPage>
                        <Animator
                            animation={batch(Sticky(50, 50), Fade(0.8, 1))}
                        >
                            <BgStar />
                        </Animator>
                    </ScrollPage>

                    <ScrollPage>
                        <Animator
                            animation={batch(Sticky(50, 50), Fade(0.8, 1))}
                        >
                            <BgStar />
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(50, 50, -25, -17),
                                Push(),
                                MoveIn()
                            )}
                        >
                            <div className="god-hand"></div>
                        </Animator>
                        <Animator animation={batch(Sticky(50, 50), MoveIn())}>
                            <div className="god"></div>
                        </Animator>
                        <Animator animation={batch(Move(50, 50))}>
                            <div className="god-work"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(8, 80, 0, 0),
                                Fade(),
                                MoveOut()
                            )}
                        >
                            <h2>此刻卻懷疑自己是一個帶著瑕疵的作品</h2>
                        </Animator>
                    </ScrollPage>

                    <ScrollPage>
                        <Animator
                            animation={batch(Sticky(50, 50), Fade(0.8, 1))}
                        >
                            <BgStar />
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(60, 30, 0, 0),
                                Fade(),
                                MoveOut()
                            )}
                        >
                            <Clock />
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(8, 80, 0, 0),
                                Fade(),
                                MoveOut()
                            )}
                        >
                            <h2>也許覺得自己生不逢時？</h2>
                        </Animator>
                    </ScrollPage>

                    <ScrollPage>
                        <Animator
                            animation={batch(Sticky(50, 50), Fade(0.8, 1))}
                        >
                            <BgStar />
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(60, 30, 0, 0),
                                Fade(),
                                MoveOut()
                            )}
                        >
                            <Earth />
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(8, 80, 0, 0),
                                Fade(),
                                MoveOut()
                            )}
                        >
                            <h2>還是沒有誕生在適合自己的位置？</h2>
                        </Animator>
                    </ScrollPage>

                    <ScrollPage>
                        <Animator
                            animation={batch(Sticky(50, 50), Fade(0.8, 1))}
                        >
                            <BgStar />
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(55, 15, 0, 0),
                                Fade(),
                                MoveOut()
                            )}
                        >
                            <div className="intro-box"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(60, 30, 0, 0),
                                Fade(),
                                MoveOut()
                            )}
                        >
                            <div className="Mirror2"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(60, 30, 0, 0),
                                Fade(),
                                MoveOut()
                            )}
                        >
                            <div className="Mirror1"></div>
                        </Animator>
                        <Animator
                            animation={batch(
                                Pos(8, 80, 0, 0),
                                Fade(),
                                MoveOut()
                            )}
                        >
                            <h2>又或是不滿意</h2>
                            <h2>自己與生俱來的樣子？</h2>
                        </Animator>
                    </ScrollPage>

                    <ScrollPage>
                        <Animator
                            animation={batch(Sticky(50, 50), Fade(0.8, 1))}
                        >
                            <BgStar />
                        </Animator>
                    </ScrollPage>

                    <ScrollPage>
                        <Animator
                            animation={batch(Sticky(50, 50), Fade(0.8, 1))}
                        >
                            <BgStar />
                        </Animator>
                        <Animator
                            animation={batch(Pos(20, 30, 0, 0), FadeIn())}
                        >
                            <div className="intro-final-logo"></div>
                        </Animator>
                        <Animator
                            animation={batch(Pos(50, 40, 0, 0), FadeIn())}
                        >
                            <h2>那麼即刻開始打造下一段人生吧</h2>
                            <h2>你此生的遺憾，將於來生圓滿</h2>
                            <h2>歡迎光臨 來生投放所</h2>
                        </Animator>
                    </ScrollPage>

                    <ScrollPage>
                        <Animator
                            animation={batch(Sticky(50, 50), Fade(0.8, 1))}
                        >
                            <BgStar />
                        </Animator>
                        <div>END</div>
                    </ScrollPage>
                </ScrollContainer>
            </div>
        </>
    );
}

export default Intro;
