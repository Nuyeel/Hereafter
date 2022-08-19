import { useContext, useState, useEffect, useRef, createRef } from 'react';
// 會員登入context
import AuthContext from '../../context/AuthContext/AuthContext';
//載入資料
//TODO:後端修改資料獲取
import axios from 'axios';
import { API_GAMES_GET } from '../../config/ajax-path';
// 標題（不會用）
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
import { useNavigate } from 'react-router-dom';

// import Canvas from './Canvas';
import './game.scss';

function Games(props) {
    const { pageName, setUserGooddeed } = props;
    const { setHeader } = useContext(HeaderContext);
    const navigate = useNavigate();

    const { authorized, sid, account, token } = useContext(AuthContext);
    const backtoMain = () => {
        navigate('/', { replace: true });
    };
    // const gamesRef = createRef();
    const canvasRef = useRef();
    const canvas = canvasRef.current;
    const [playtimes, setPlaytimes] = useState(0);
    const [alert, setAlert] = useState(false);
    const [gooddeedAdd, setGooddeedAdd] = useState(0);
    const fetchGameScore = async () => {
        const r = await fetch(`${API_GAMES_GET}?score=${gooddeedAdd}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const result = await r.json();
        console.log(result);
    };
    console.log(canvasRef);

    useEffect(() => {
        setHeader(headers[pageName]);
    }, []);

    useEffect(() => {
        draw(canvas);
    }, [canvas]);
    const turnoffstart = () => {
        let gameContext = document.querySelector('.game-context1');
        gameContext.style.display = 'none';
    };
    const draw = (canvas) => {
        if (canvas) {
            let ctx = canvas.getContext('2d');

            function rand(min, max, interval) {
                if (interval === undefined) interval = 1;
                return (
                    Math.round(
                        (Math.floor(Math.random() * (max - min + 1)) + min) /
                            interval
                    ) * interval
                );
            }

            function randIndex(thearray) {
                return thearray[rand(1, thearray.length) - 1];
            }

            let player = (function () {
                let x = 0,
                    y = canvas.height / 2,
                    w = 60,
                    h = 25,
                    speed = 5,
                    dead = false,
                    death = 0;

                return {
                    getX: function () {
                        return x;
                    },

                    getY: function () {
                        return y;
                    },

                    getW: function () {
                        return w;
                    },

                    getH: function () {
                        return h;
                    },

                    die: function () {
                        dead = true;
                        ++death;
                    },

                    getDeath: function () {
                        return death;
                    },

                    resurrect: function () {
                        this.moveTo(100, canvas.height / 2);
                        dead = false;
                        console.log('偶數了');
                        this.draw();
                    },

                    respawn: function () {
                        this.moveTo(100, canvas.height / 2);
                        this.draw();
                        console.log('偶升等嚕');
                        blocks.nextLevel();
                    },

                    isDead: function () {
                        return dead;
                    },
                    draw: function () {
                        const playerAlive =
                            document.querySelector('.player-alive');
                        const playerDead =
                            document.querySelector('.player-dead');
                        if (player.isDead()) {
                            ctx.drawImage(playerDead, x, y, w, h);
                        } else {
                            ctx.drawImage(playerAlive, x, y, w, h);
                        }
                    },

                    moveTo: function (a, b) {
                        if (dead) return;
                        x = a;
                        y = b;
                        if (y + h > canvas.height) {
                            y = canvas.height - h;
                        }
                    },
                };
            })();

            let blocks = (function () {
                let blocks = [],
                    level = 0,
                    level_factor = 1.2,
                    start = {
                        n: 6,
                        x1: 210,
                        x2: 700,
                        h_min: 65,
                        h_max: 100,
                        speed_min: 0.5,
                        speed_max: 3,
                        direction: ['up', 'down'],
                        color: ['#F0C860', '#5D9CFB', '#FFFFFF'],
                    },
                    blocksIndex = 0;

                function Block(direction) {
                    this.w = 50;
                    this.h = rand(start.h_min, start.h_max);
                    //FIXME: this.x = rand(290, 680, 70);
                    this.x = blocksIndex * 70 + 294;
                    this.y = 0;
                    this.speed = rand(start.speed_min, start.speed_max);
                    this.direction = direction;
                    if (blocksIndex % 2 === 0) {
                        this.direction = 'up';
                    } else {
                        this.direction = 'down';
                    }

                    if (direction === 'up') {
                        this.y = canvas.height + rand(25, 350);
                    } else {
                        this.y -= rand(25, 350);
                    }
                    blocksIndex++;
                    blocksIndex = blocksIndex % 6;
                }

                return {
                    curLevel: function () {
                        return level;
                    },

                    nextLevel: function () {
                        ++level;
                        blocks = [];

                        // let n = Math.ceil(start.n + level * level_factor);
                        let n = 6;

                        this.direction = 'up';

                        //console.log(n);

                        this.createXBlocks(n);
                    },

                    draw: function (b) {
                        if (player.isDead()) ctx.fillStyle = '#800000';
                        // 車子顏色
                        else ctx.fillStyle = '#D98D00';
                        ctx.fillRect(b.x, b.y, b.w, b.h);
                    },

                    drawZone: function () {
                        ctx.fillStyle = '#676767';
                        ctx.fillRect(
                            start.x1,
                            0,
                            start.x2 - start.x1 + 10,
                            canvas.height
                        );
                        ctx.fillStyle = '#C26345';
                        ctx.fillRect(190, 0, 100, canvas.height);
                        ctx.fillRect(710, 0, 80, canvas.height);

                        ctx.fillStyle = '#DFC6B7';
                        ctx.fillRect(285, 0, 5, canvas.height);
                        ctx.fillRect(705, 0, 5, canvas.height);

                        ctx.fillStyle = '#ffffff';

                        for (let k = 0; k < 3; k++) {
                            for (let i = 0; i < 10; i++) {
                                ctx.fillRect(350 + 140 * k, i * 45, 5, 30);
                            }
                        }

                        ctx.fillRect(420, 0, 5, canvas.height);

                        ctx.fillRect(560, 0, 5, canvas.height);
                    },

                    createXBlocks: function (n) {
                        for (let i = 0; i < n; ++i) {
                            blocks.push(new Block(randIndex(start.direction)));
                        }
                    },

                    moveAll: function () {
                        //if(pause) return;

                        let px = player.getX(),
                            py = player.getY(),
                            pw = player.getW(),
                            ph = player.getH();

                        if (player.isDead()) return;
                        else if (px > start.x2) {
                            //level pass
                            ctrl.x = 200;
                            ctrl.y = canvas.height / 2;
                            ctrl.velX = 0;
                            ctrl.velY = 0;
                            player.respawn();
                            return;
                        }

                        let len = blocks.length;
                        for (let i = 0; i < len; ++i) {
                            if (blocks[i].direction === 'up') {
                                blocks[i].y -= blocks[i].speed;
                                if (blocks[i].y + blocks[i].h < 0) {
                                    // blocks[i].y = canvas.height + rand(10, 350);
                                    blocks[i].y = canvas.height + rand(10, 350);
                                }
                            } else {
                                blocks[i].y += blocks[i].speed;
                                if (blocks[i].y > canvas.height) {
                                    blocks[i].y = 0;
                                    blocks[i].y -= rand(10, 350);
                                }
                            }

                            //colission detection
                            if (
                                px >= blocks[i].x &&
                                px <= blocks[i].x + blocks[i].w &&
                                py >= blocks[i].y &&
                                py <= blocks[i].y + blocks[i].h
                            ) {
                                player.die();
                            } else if (
                                px + pw <= blocks[i].x + blocks[i].w &&
                                px + pw >= blocks[i].x &&
                                py + ph <= blocks[i].y + blocks[i].h &&
                                py + ph >= blocks[i].y
                            ) {
                                player.die();
                            }
                        }
                    },

                    drawAll: function () {
                        for (let i in blocks) {
                            this.draw(blocks[i]);
                        }
                    },
                };
            })();

            let ctrl = {
                x: 200, //initial x
                y: canvas.height / 2, // initial y
                velY: 0,
                velX: 0,
                speed: 1400, // max speed
                friction: 0.68, // friction
                keys: [],
            };

            function updateCtrl() {
                // restart
                if (ctrl.keys[32]) {
                    if (player.isDead()) {
                        ctrl.x = 200;
                        ctrl.y = canvas.height / 2;
                        ctrl.velX = 0;
                        ctrl.velY = 0;
                        player.resurrect();
                    }
                }

                // check the keys and do the movement.
                if (ctrl.keys[38] || ctrl.keys[87]) {
                    if (ctrl.velY > -ctrl.speed) {
                        ctrl.velY--;
                    }
                }

                if (ctrl.keys[40] || ctrl.keys[83]) {
                    if (ctrl.velY < ctrl.speed) {
                        ctrl.velY++;
                    }
                }
                if (ctrl.keys[39] || ctrl.keys[68]) {
                    if (ctrl.velX < ctrl.speed) {
                        ctrl.velX++;
                    }
                }
                if (ctrl.keys[37] || ctrl.keys[65]) {
                    if (ctrl.velX > -ctrl.speed) {
                        ctrl.velX--;
                    }
                }

                // apply some friction to y velocity.
                ctrl.velY *= ctrl.friction;
                ctrl.y += ctrl.velY;

                // apply some friction to x velocity.
                ctrl.velX *= ctrl.friction;
                ctrl.x += ctrl.velX;

                // bounds checking
                if (ctrl.x >= canvas.width) {
                    ctrl.x = canvas.width;
                } else if (ctrl.x <= 5) {
                    ctrl.x = 5;
                }

                if (ctrl.y > canvas.height) {
                    ctrl.y = canvas.height;
                } else if (ctrl.y <= 5) {
                    ctrl.y = 5;
                }

                player.moveTo(ctrl.x, ctrl.y);

                setTimeout(updateCtrl, 10);
            }

            updateCtrl();

            // key events
            document.body.addEventListener('keydown', function (e) {
                ctrl.keys[e.keyCode] = true;
            });
            document.body.addEventListener('keyup', function (e) {
                ctrl.keys[e.keyCode] = false;
            });

            blocks.nextLevel();

            function update() {
                blocks.moveAll();
            }

            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                blocks.drawZone();
                blocks.drawAll();
                player.draw();

                if (player.isDead()) {
                    ctx.fillStyle = '#9F000C';
                    ctx.font = '16px Noto Sans TC';
                    ctx.fillText('Game over!', 20, 50);
                    ctx.fillText('過馬路失敗!', 20, 30);
                    ctx.fillText('Press [SPACE]', 20, 70);
                    setAlert(true);
                } else {
                    ctx.fillStyle = '#D98D00';
                    ctx.font = '16px Verdana';
                    ctx.fillText('Cross to the other side', 10, 20);
                    ctx.fillText('---------------------->', 10, 40);

                    ctx.fillText('Use keyboard arrows', 10, 60);
                    ctx.fillText('or [A] [W] [S] [D]', 10, 80);

                    let gooddeedPlus = (blocks.curLevel() - 1) * 50;
                    ctx.fillText('gooddeedPlus : ' + gooddeedPlus, 10, 130);
                    ctx.fillText('Level : ' + blocks.curLevel(), 10, 150);

                    ctx.fillText('Death : ' + player.getDeath(), 10, 170);
                    setGooddeedAdd(gooddeedPlus);
                    let playTimestotal = blocks.curLevel() + player.getDeath();
                    setPlaytimes(playTimestotal);
                    setAlert(false);
                }
            }

            let fps = 0,
                now,
                lastUpdate = new Date() * 1;

            // The higher this value, the less the FPS will be affected by quick changes
            // Setting this to 1 will show you the FPS of the last sampled frame only
            let fpsFilter = 50;

            function drawFrame() {
                let thisFrameFPS = 1000 / ((now = new Date()) - lastUpdate);
                if (now !== lastUpdate) {
                    fps += (thisFrameFPS - fps) / fpsFilter;
                    lastUpdate = now;

                    if (isNaN(fps)) fps = 1;

                    ctx.fillStyle = '#ffffff';
                    ctx.font = '10px Verdana';
                    ctx.fillText(fps.toFixed(0) + ' fps', 5, canvas.height - 5);
                }
            }

            let animation_fps = 60;

            console.log(gooddeedAdd);

            setInterval(function () {
                update();
                draw(canvas);
                drawFrame();
            }, 1000 / animation_fps);
        }
    };
    const Canvas = (
        <canvas
            ref={canvasRef}
            width={800}
            height={400}
            style={{
                position: 'absolute',
                outline: '1px solid green',
                left: '50%',

                top: '50%',
                transform: 'translate(-50% ,calc(-50% + 20px))',

                // margin: 'auto',
                zIndex: -1,
            }}
        />
    );
    const saveBtn = (
        <div>
            <h4 className='yun-end-game'
           
            >
                遊戲結束
            </h4>
            <div
                className="saveBtn"
                onClick={() => {
                    fetchGameScore();
                    backtoMain();
                }}
            >
                儲存遊戲獲得的陰德值！
            </div>
        </div>
    );
    return (
        <>
            {playtimes <= 5 ? Canvas : ''}

            <div className="gameframe">
                <img
                    src="http://localhost:3500/games/Player-alive.svg"
                    className="player-alive"
                    style={{ display: 'none' }}
                />
                <img
                    src="http://localhost:3500/games/Player-dead.svg"
                    className="player-dead"
                    style={{ display: 'none' }}
                />

                <div className="game-screen">
                    <div className="game-border">
                        <div className="game-context1">
                            <h4>《扶老奶奶過馬路》</h4>
                            <p>啊罵需要你的幫助！</p>
                            <p>透過遊戲行善積德，不落人後！</p>
                            <div className="grandma"></div>
                            <div className="kindman"></div>
                            <div
                                className="game-start-btn"
                                onClick={() => {
                                    turnoffstart();
                                }}
                            >
                                <p>開始行善！</p>
                            </div>
                        </div>
                        <div className="game-context2">
                            {playtimes > 5 ? saveBtn : ''}

                            <div>
                                {alert ? (
                                    <h4
                                        style={{
                                            lineHeight: '1.5rem',
                                            fontSize: '14px',
                                            textAlign: 'center',
                                            color: '#FF52BA',
                                        }}
                                    >
                                        按下空白鍵
                                        <br />
                                        再玩一次
                                    </h4>
                                ) : (
                                    <h4
                                        style={{
                                            lineHeight: '1.5rem',
                                            fontSize: '14px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        透過鍵盤方向鍵
                                        <br />
                                        控制上下左右
                                    </h4>
                                )}
                            </div>
                            <div
                                style={{
                                    lineHeight: '1.5rem',
                                    fontSize: '16px',
                                    textAlign: 'center',
                                    marginTop: '20px',
                                }}
                            >
                                <p>
                                    累計陰德值：
                                    <br />
                                    <span
                                        style={{
                                            lineHeight: '2rem',
                                            fontSize: '24px',
                                            color: '#E384F2',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {gooddeedAdd}
                                    </span>
                                    <div
                                        className="yun-ghost-cash"
                                        style={{
                                            display: 'inline-block',
                                            width: '20px',
                                            height: '20px',
                                            marginLeft: '4px',
                                        }}
                                    ></div>
                                </p>
                                <p>
                                    本日遊戲機會剩：
                                    <br />
                                    <span
                                        style={{
                                            lineHeight: '2rem',
                                            fontSize: '24px',
                                            color: '#E384F2',
                                            fontWeight: 600,
                                            marginRight: '4px',
                                        }}
                                    >
                                        {playtimes > 5 ? 0 : 6 - playtimes}
                                    </span>
                                    次
                                </p>
                            </div>
                            <div
                                style={{
                                    lineHeight: '1.5rem',
                                    fontSize: '14px',
                                    color: '#F3F59F',
                                    textAlign: 'center',
                                    marginTop: '20px',
                                }}
                            >
                                <p>帶領啊罵突破車潮！</p>
                                <p>行善積德，不落人後！</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="game-btm"></div>
            </div>
            <div className="yun-controlpanel1"></div>
            <div className="yun-controlpanel2">
                <div className="control-table">
                    <div className="control-button"></div>
                    <div className="control-button"></div>
                    <div className="control-button"></div>
                    <div className="control-button"></div>
                </div>
                <div className="control-bar"></div>
            </div>
        </>
    );
}

export default Games;
