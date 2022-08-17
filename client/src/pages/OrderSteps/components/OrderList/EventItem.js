import delete_cross from '../../imgs/delete-cross.svg';
// import '../../styles/sub-pages.scss';
import '../../../Event/_xuan_styles.scss';

function EventItem(props) {
    // 定義每個商品物件
    // {
    //     sid: 1,
    //     act_title: '流浪狗認養活動',
    //     type_sid: 2,
    //     program_type: '贊助',
    //     price: 500,
    //     value: 50,
    //     start: 2022-06-18 22:24:00,
    //     npo_name: '喵喵' ,
    //     place_city: '台北市',
    //     place_other: '中正路一段',
    //     limit_num: 50
    // }

    // 部分屬性值是從{...v}裡取得
    const {
        sid,
        act_title,
        program_type,
        price,
        start,
        start_time,
        npo_name,
        img,
        place_location,
        count, //因為活動限定選一件，所以不提供+-功能
        setCount, //因為活動限定選一件，所以不提供+-功能
        removeItem,
        eventPick,
        setEventPick,
    } = props;

    // 之後可以直接把變數用{}方法放進DOM
    return (
        <>
            <div className="xuan-cart-list">
                <div className="xuan-cart-check">
                    <input
                        className="xuan-input-checkbox"
                        type="checkbox"
                        id="cbox"
                        checked={eventPick.includes(`${sid}`)}
                        value={sid}
                        onChange={(e) => {
                            //如果原本有(true)則從array移除 (拷貝後再用set方法設定回去)
                            if (eventPick.includes(e.target.value)) {
                                const newEventPick = eventPick.filter(
                                    (v, i) => {
                                        return v !== e.target.value;
                                    }
                                );
                                console.log('勾選的結帳項目', newEventPick);
                                setEventPick(newEventPick);
                            } else {
                                //如果沒有(false)則新加入array中 ( 拷貝後加入進去)
                                const newEventPick = [
                                    ...eventPick,
                                    e.target.value,
                                ];
                                console.log('勾選的結帳項目', newEventPick);
                                setEventPick(newEventPick);
                            }
                        }}
                    />
                </div>

                <div className="xuan-cart-img">
                    <img
                        src={'http://localhost:3500/event/eventlist/' + img}
                        alt=""
                    />
                </div>

                <div className="xuan-cart-intro">
                    <div className="xuan-cart-intro-title">
                        <span className="xuan-body">{program_type}</span>
                        <span className="xuan-subtitle xuan-act-title">{act_title}</span>
                    </div>

                    <div className="xuan-time-location">
                        <p className="xuan-body">{start}</p>

                        <p className="xuan-body">{start_time}</p>
                        <p className="xuan-location xuan-body">
                            {place_location}
                        </p>
                    </div>

                    <p className="xuan-body">{npo_name}</p>
                </div>

                {/* 活動/贊助限定1場，不提供+-功能 */}
                <div className="xuan-num-choose">
                    {/* <a href="#/" onClick={()=>{setCount(count - 1);}}> 
                    -</a> */}
                    {/* <a href="#/" className="border"> {count} </a> */}
                    {/* <a href="#/" onClick={()=>{ setCount(count + 1);}}>
                    +</a> */}
                </div>

                <div className="xuan-cost">
                    <h5 className="xuan-body">NT${price}</h5>
                </div>

                {/* 建立刪除鍵功能 */}
                <div className="xuna-delete-cross">
                    <img src={delete_cross} alt="" onClick={removeItem} />
                </div>
            </div>
        </>
    );
}

export default EventItem;
