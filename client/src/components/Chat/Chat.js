import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import './ChatCss.scss';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Ghost } from '../../pages/AboutUsThird/imgs/ghost.svg';
import { ReactComponent as Star } from './imgs/star-s.svg';
// import ghost from "./imgs/Vector.png";
const bot = require('./imgs/Vector.png');
const avatar = require('./imgs/avatar.png');

const theme = {
    fontFamily: 'Noto Sans',
    headerBgColor: 'linear-gradient(125deg,#9FC7FF,#FF95DB)',
    headerFontColor: '#fff',
    headerFontSize: '20px',
    botBubbleColor: '#9587E1',
    botFontColor: '#fff',
    userBubbleColor: '#EC92FB',
    userFontColor: '#fff',
};
const handleClick = () => {
    let random = new Date().getSeconds() % 3;

    switch (random) {
        case 0:
            document.querySelector(
                '#abCard'
            ).innerHTML = `<div class="ab-test-wrap">
            <img class="ab-t-img"src='/images/chatbot/turtle.png' alt="turtle"/>
          </div>
          <div class="ab-test">
            <p class="ab-test-title">小吉</p>
            <div>
              <p>龜，乃四靈獸之一，陪伴在您的人生左右，屬極為吉祥之兆，只可惜烏龜的腳步跟不上您將來成長的速度，只能在遠方祝福您一生平安</p>
              <ul class="ab-test-ul"><li>建議投胎時刻：2個時辰後</li><li>可以前往形象區多多挑選來生形象</li></ul><a class="ab-link-wrap" href="/showcase"><div class="ab-test-link01">挑個外表!</div></a>
            </div>
          </div>`;
            break;
        case 1:
            document.querySelector(
                '#abCard'
            ).innerHTML = `<div class="ab-test-wrap">
            <img class="ab-t-img02"src='/images/chatbot/blackcat.png' alt="turtle"/>
          </div>
          <div class="ab-test-2">
            <p class="ab-test-title-2">大吉</p>
            <div>
              <p>喵喵喵!喵喵喵喵喵!喵喵喵喵喵喵喵!!!喵喵喵喵!</p>
              <ul class="ab-test-ul"><li>建議投胎時刻：現在</li><li>請立即投胎</li></ul>
              <a class="ab-link-wrap" href="/reborn-cart"><div class="ab-test-link02" >投胎囉!</div></a>
            </div>
          </div>`;
            break;
        case 2:
            document.querySelector(
                '#abCard'
            ).innerHTML = `<div class="ab-test-wrap">
            <img class="ab-t-img03"src='/images/chatbot/cockroach.png' alt="turtle"/>
          </div>
          <div class="ab-test-3">
            <p class="ab-test-title-3">小凶</p>
            <div>
              <p>此運勢是吉是凶全依靠您個人的喜好評斷，不管您喜不喜歡蟑螂，他們都會伴您一生，趕也趕不走，真愛</p>
              <ul class="ab-test-ul"><li>建議投胎時刻：...先不要吧</li><li>多做點善事轉運轉運</li></ul><a class="ab-link-wrap" href="/events"><div class="ab-test-link03">做好事!</div></a>
            </div>
          </div>`;
            break;
        default:
            break;
    }
};

const steps = [
    {
        id: '1',
        message: '哈囉，需要幫助嗎?',
        trigger: '2',
    },
    {
        id: '2',
        options: [
            { value: 1, label: '這是哪裡...', trigger: '3' },
            { value: 2, label: '我要投胎', trigger: '8' },
            {
                value: 3,
                label: '不知道要不要開始現在新的人生...',
                trigger: '5',
            },
        ],
    },
    {
        id: '3',
        message: '這裡是決定您來生的場所-來生投放所',
        trigger: '4',
    },
    {
        id: '4',
        component: (
            <Link className="ab-q" to="/aboutusfirst">
                <Star className="ab-rsc-s1" width="15px" />
                <Star className="ab-rsc-s2" width="10px" />
                <Ghost className="ab-rsc-g1" width="23px" />
                <Ghost className="ab-rsc-g2" width="15px" />
                <Ghost className="ab-rsc-g3" width="18px" />
                投放所介紹
            </Link>
        ),
        trigger: '7',
    },
    {
        id: '5',
        message: '請選擇任一張卡片,測試您現在的運勢',
        trigger: '6',
    },
    {
        id: '6',
        component: (
            <div id="abCard" className="ab-card-c-wrap">
                <div className="ab-card-c">
                    <div className="ab-card-b" onClick={handleClick}>
                        <div className="ab-card-wrap">
                            <img
                                className="ab-card-bf"
                                src={require('./imgs/card01.png')}
                                alt="Background"
                            />
                            <img
                                className="ab-card-bg"
                                src={require('./imgs/card.png')}
                                alt="Background"
                            />
                        </div>
                    </div>
                    <div className="ab-card-b" onClick={handleClick}>
                        <div className="ab-card-wrap">
                            <img
                                className="ab-card-bf"
                                src={require('./imgs/card02.png')}
                                alt="Background"
                            />
                            <img
                                className="ab-card-bg"
                                src={require('./imgs/card.png')}
                                alt="Background"
                            />
                        </div>
                    </div>
                    <div className="ab-card-b" onClick={handleClick}>
                        <div className="ab-card-wrap">
                            <img
                                className="ab-card-bf"
                                src={require('./imgs/card03.png')}
                                alt="Background"
                            />
                            <img
                                className="ab-card-bg"
                                src={require('./imgs/card.png')}
                                alt="Background"
                            />
                        </div>
                    </div>
                </div>
            </div>
        ),
        end: true,
    },
    {
        id: '7',
        message: '還有其他疑問嗎?',
        trigger: '2',
    },
    {
        id: '8',
        message: '依照投胎步驟選擇您的來生套裝後,即可投胎!',
        trigger: '9',
    },
    {
        id: '9',
        component: (
            <Link className="ab-q-2" to="/aboutusthird">
                <Star className="ab-rsc-s1" width="15px" />
                <Star className="ab-rsc-s2" width="10px" />
                <Ghost className="ab-rsc-g4" width="23px" />
                <Ghost className="ab-rsc-g5" width="15px" />
                <Ghost className="ab-rsc-g6" width="18px" />
                <Ghost className="ab-rsc-g7" width="23px" />
                <Ghost className="ab-rsc-g8" width="15px" />
                <Ghost className="ab-rsc-g9" width="18px" />
                轉生3步驟
            </Link>
        ),
        trigger: '7',
    },
];

function Chat() {
    const location = useLocation();

    return (
        <>
            {location.pathname !== '/' && location.pathname !== '/intro' ? (
                <ThemeProvider theme={theme}>
                    <ChatBot
                        headerTitle="來生問事處"
                        botAvatar={bot}
                        userAvatar={avatar}
                        botDelay="1200"
                        floating={true}
                        steps={steps}
                        placeholder="說點什麼吧！"
                    />
                </ThemeProvider>
            ) : (
                ''
            )}
        </>
    );
}

export default Chat;
