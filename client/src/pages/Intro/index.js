import React from 'react';
import Card from './Card';

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
import './introstyle.scss';

function intro() {
    const ZoomInScrollOut = batch(MoveIn(0, 200));
    const FadeUp = batch(Fade(), Move(), Sticky());

    return (
        <>
            <div className="intro-container">
                <div className="yun-fix-scroll">scroll down</div>
                <div className="yun-intro-skip"> skip</div>

                <ScrollContainer>
                    <ScrollPage>
                        <div className="otherStars">
                            <div className="otherStar"></div>
                            <div className="otherStar"></div>
                            <div className="otherStar"></div>
                            <div className="otherStar"></div>
                            <div className="otherStar"></div>
                            <div className="otherStar"></div>
                            <div className="otherStar"></div>
                        </div>

                        <Animator
                            animation={batch(Sticky(25, 85), Fade(), MoveOut())}
                        >
                            <h2>曾以為自己是萬中選一的璀璨星星</h2>
                        </Animator>
                        <Animator animation={batch(Sticky(50, 50))}>
                            <div className="star"></div>
                        </Animator>

                        <Animator
                            animation={batch(Sticky(45, 40), ZoomOut(1, 1.3))}
                        >
                            <div className="starmask"></div>
                        </Animator>
                        <Animator
                            animation={batch(Sticky(55, 40), ZoomOut(1, 1.3))}
                        >
                            <div className="starmask"></div>
                        </Animator>
                        <Animator
                            animation={batch(Sticky(45, 60), ZoomOut(1, 1.3))}
                        >
                            <div className="starmask"></div>
                        </Animator>
                        <Animator
                            animation={batch(Sticky(55, 60), ZoomOut(1, 1.3))}
                        >
                            <div className="starmask"></div>
                        </Animator>
                        <Animator
                            animation={batch(Sticky(50, 50), ZoomOut(0, 5))}
                        >
                            <div className="mainstar"></div>
                        </Animator>

                        {/* </Animator> */}
                    </ScrollPage>
                    <ScrollPage>
                        <Animator animation={batch(Sticky(50, 50))}>
                            {/* <div className="god"></div> */}
                        </Animator>
                        <Animator animation={batch(Sticky(50, 50))}>
                            <div className="god-hand"></div>
                        </Animator>
                        <Animator animation={batch(Move(50, 50))}>
                            <div className="god-work"></div>
                        </Animator>
                        <Animator
                            animation={batch(Sticky(35, 85), Fade(), MoveOut())}
                        >
                            <h2>
                                此刻卻懷疑自己是此刻卻懷疑自己是一個帶著瑕疵的作品
                            </h2>
                        </Animator>
                    </ScrollPage>{' '}
                    <Animator
                        animation={batch(Sticky(50, 50), Fade(), MoveOut())}
                    >
                        <Card></Card>
                    </Animator>
                    <ScrollPage>
                        <Animator
                            animation={batch(Sticky(25, 85), Fade(), MoveOut())}
                        >
                            <h2>也許覺得自己生不逢時？</h2>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage>
                        <Animator
                            animation={batch(Sticky(25, 85), Fade(), MoveOut())}
                        >
                            <h2>還是沒有誕生在適合自己的位置？</h2>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage>
                        <Animator
                            animation={batch(Sticky(25, 85), Fade(), MoveOut())}
                        >
                            <h2>又或者是不滿意自己與生俱來的樣子？</h2>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage>
                        <Animator animation={batch(Sticky(50, 50), FadeIn())}>
                            <h2>那麼即刻開始打造下一段人生吧</h2>
                            <h2>你此生的遺憾，將於來生圓滿</h2>
                            <h2>歡迎光臨 來生投放所</h2>
                        </Animator>
                    </ScrollPage>
                </ScrollContainer>
            </div>
        </>
    );
}

export default intro;
