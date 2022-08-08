import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// SimpleBar
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Prev } from 'react-bootstrap/esm/PageItem';

// scss
import '../../Event/_xuan_styles.scss';
import '../styles/_new_cart.scss';
import delete_cross from '../imgs/delete-cross.svg';

// 我要接收 eventPick的參數 然後把它呈現出來
// 這邊僅供瀏覽，沒有要編輯
function ReadyToBuy(props) {
    const navigate = useNavigate(); //跳轉頁面用
    // eventPick存有勾選項目的清單
    const { eventPick, setEventPick, detailVisible, setDetailVisible, prev } =
        props;

    let fetchbody = '';

    // 先把eventPick跑迴圈，再塞進body裡面fetch
    if (eventPick.length !== 0) {
        eventPick.map((v, i) => {
            fetchbody += `&detailnum=${v}`;
        });

        console.log('fetchbody', fetchbody);
    }

    // 建立一個useSate來放從MySQL取回的訂單細項資料
    const [readyToBuy, setReadyToBuy] = useState([]);

    // 一進訂單細項，發fetch去取得 eventPick 裡sid的活動資訊
    const fetchReadyToBuy = async () => {
        fetch(`http://localhost:3500/eventcarts/readytobuy?${fetchbody}`, {
            method: 'GET',
        })
            .then((r) => r.json())
            .then((obj) => {
                console.log(obj);
                setReadyToBuy(obj); //把取回的活動資料放進readyToBuy裡
                console.log(readyToBuy);
            });
    };

    // 避免無窮迴圈(DidMount)
    useEffect(() => {
        fetchReadyToBuy();
    }, [eventPick]);

    return (
        <>
            {/* 背景黑色底 */}
            <div className={detailVisible}>
                {/* 中間白色區塊 */}
                <div className="xuan-center-block">
                    <div
                        className="xuan-readytobuy-cross"
                        onClick={() => {
                            setDetailVisible(
                                'xuan-readytobuy-container-hidden'
                            );
                            fetchReadyToBuy();
                        }}
                    >
                        <img src={delete_cross} alt="" />
                    </div>
                    <p className="xuan-title">
                        訂單明細(共{eventPick.length}項)
                    </p>

                    <SimpleBar className="xuan-readytobuy-simplebar">
                        <div className="xuan-simple-bar">
                            {/* 明細item */}

                            {readyToBuy.map((v, i) => {
                                return (
                                    <div
                                        className="xuan-readytobuy-item"
                                        key={v.sid}
                                    >
                                        <div className="xuan-readytobuy-img">
                                            <img src="" alt="" />
                                        </div>

                                        <div className="xuan-readytobuy-intro">
                                            <div className="d-flex">
                                                <p className="xuan-readytobuy-program">
                                                    {v.program_type}
                                                </p>
                                                <p className="xuan-subtitle">
                                                    {v.act_title}
                                                </p>
                                            </div>

                                            <p>
                                                {v.start}
                                                {v.start_time}
                                            </p>
                                            <p>NT${v.price}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </SimpleBar>

                    <div className="xuan-readytobuy-edit-btn">
                        <button
                            className="xuan-btn-m xuan-btn-pri"
                            onClick={() => {
                                prev();
                                setDetailVisible(
                                    'xuan-readytobuy-container-hidden'
                                );
                                navigate('/ordersteps', { replace: true });
                            }}
                        >
                            修改訂單
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReadyToBuy;
