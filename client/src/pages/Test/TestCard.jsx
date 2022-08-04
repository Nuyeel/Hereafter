import React, { useState } from 'react';
import './teststyle.scss';
function TestCard(props) {
    // radio - 題目＋選項
    const gooddeedTest = [
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
            ques: '當你遇到路邊有人推著輪椅兜售口香糖時，哪個更符合你的想法?',
            opt: [
                '希望對方快快賣完回家，立刻掏錢出來買',
                '說聲謝謝，但是真的先不用',
                '抖內自己都來不及了，對方說不定比我有錢',
            ],
        },
        {
            ques: '你最在意的是?',
            opt: ['我的家族', '我的事業', '我的靈魂'],
        },
        {
            ques: '人生中你最想要完成的夢想?',
            opt: [
                '幫助他人、貢獻自己',
                '可以高枕無憂的直到生命最後一刻',
                '得到後世的景仰讚嘆',
            ],
        },
        {
            ques: '你對於現在生活的看法?',
            opt: ['我終究還是幸運的', '已經生無可戀', '自私'],
        },
    ];
    const [gooddeed, setGooddeed] = useState({
        Q1: '',
        Q2: '',
        Q3: '',
        Q4: '',
        Q5: '',
        Q6: '',
        Q7: '',
        Q8: '',
        Q9: '',
        Q10: '',
    });
    const handleChange = (e) => {
        console.log(e.target.type, e.target.name, e.target.value);
        //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E5%90%8D
        setGooddeed({ ...gooddeed, [e.target.name]: e.target.value });
    };

    return (
        <>
            {gooddeedTest.map((v, i) => {
                // console.log(v.opt);
                let ques = v.ques;
                let opt = v.opt;

                console.log(ques);
                return (
                    <div key={i} className="yun-card">
                        <div className="yun-ques">
                            <h3>Q{i + 1}.</h3>
                            <h5>{ques}</h5>
                        </div>
                        <div className="yun-opts">
                            {opt.map((v2, i2) => {
                                console.log(`Q${i}`);
                                let inputName = `Q${i}`;
                                return (
                                    <div className="yun-radio-form">
                                        <input
                                            name={inputName}
                                            type="radio"
                                            value={v2}
                                            checked={gooddeed === v2}
                                            onChange={handleChange}
                                        />
                                        <label>{v2}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default TestCard;
