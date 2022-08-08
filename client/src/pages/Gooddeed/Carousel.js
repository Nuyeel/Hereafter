import React, { useState } from 'react';
import Card from './Card';

// import './testCard.scss';

// const MAX_VISIBILITY = 3;

function Carousel(props) {
    const { setShows, ...otherProps } = props;
    const gooddeedTest = [
        {
            ques: '',
            opt: ['', '', ''],
        },
        {
            ques: '',
            opt: ['', '', ''],
        },
        {
            ques: '你認為人性的本質是...?',
            opt: ['善良', '邪惡', '自私'],
        },
        {
            ques: '你覺得人與人之間的相處應該?',
            opt: ['銀貨兩訖', '不求回報', '自私自利'],
        },
        {
            ques: '你小時候最常玩什麼遊戲?',
            opt: ['閃電布丁', '鬼抓人', '躲貓貓'],
        },
        {
            ques: '傷心的時候聽?',
            opt: ['哀傷的歌', '歡樂的歌', '佛經'],
        },
        {
            ques: '你覺得人生像...?',
            opt: ['一場旅行', '一場災難', '一盒巧克力'],
        },
        {
            ques: '若有人打你的左臉，你會怎麼做?',
            opt: ['以牙還牙', '右臉也奉上', '告到他脫褲'],
        },
        {
            ques: '路邊有人推著輪椅兜售口香糖時...',
            opt: [
                '立刻掏錢出來買',
                '說聲謝謝，但是真的先不用',
                '抖內自己都來不及，還是算了',
            ],
        },
        {
            ques: '你最在意的是?',
            opt: ['我的家族', '我的事業', '我的靈魂'],
        },
        {
            ques: '人生中你最想要完成的夢想?',
            opt: ['幫助他人、貢獻自己', '高枕無憂一世人', '得到後世的景仰讚嘆'],
        },
        {
            ques: '你對於現在生活的看法?',
            opt: ['我還是幸運的', '已經生無可戀', '自私'],
        },
    ];
    const [gooddeed, setGooddeed] = useState({
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
        10: '',
        11: '',
        12: '',
    });
    const handleChange = (e) => {
        console.log(e.target.type, e.target.name, e.target.value);
        // radio, 2, [HTML element...]
        const newGoodDeed = { ...gooddeed, [e.target.name]: e.target.value };
        //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E5%90%8D
        setGooddeed({ ...gooddeed, [e.target.name]: e.target.value });
        console.log(newGoodDeed);
    };
    const [active, setActive] = useState(2);

    return (
        <>
            {/* /整個卡片包 */}
            <div className="yun-carousel">
                {/* card component */}

                {gooddeedTest.map((v, i) => {
                    let ques = v.ques;
                    let opt = v.opt;

                    return (
                        <Card
                            key={i}
                            questionID={i + 1}
                            Id={i}
                            ques={ques}
                            opt={opt}
                            title={'Q' + (i - 1)}
                            gooddeedValue={gooddeed[`${i + 1}`]}
                            handleChange={handleChange}
                            active={active}
                            setActive={setActive}
                            setShows={setShows}
                            // content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        />
                    );
                })}
                {/* nav right button */}
            </div>
        </>
    );
}

export default Carousel;
