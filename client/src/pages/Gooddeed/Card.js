import { useContext } from 'react';
// 會員登入context
import AuthContext from '../../context/AuthContext/AuthContext';

import { API_GOODDEED_GET } from '../../config/ajax-path';

function Card(props) {
    const {
        questionID,
        Id,
        ques,
        opt,
        title,
        gooddeedValue,
        handleChange,
        active,
        setActive,
        setShows,
        setRandomScore,
        setUserGooddeed,
        ...otherProps
    } = props;

    const { token } = useContext(AuthContext);
    // const ref = [];
    // const qRef_0 = useRef(null);
    // ref.push(qRef_0);
    // const qRef_1 = useRef(null);
    // ref.push(qRef_1);
    // const qRef_2 = useRef(null);
    // ref.push(qRef_2);
    const MAX_VISIBILITY = 3;
    // const [active, setActive] = useState(1);
    console.log(otherProps);

    const fetchRandomScore = async () => {
        const r = await fetch(`${API_GOODDEED_GET}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const result = await r.json();
        setRandomScore(result.randomScore);
        setUserGooddeed({ show: true, gooddeed: result.randomScore });
        return setTimeout(() => {
            setUserGooddeed({ show: false, gooddeed: result.randomScore });
        }, 3000);
    };

    return (
        <div
            className="yun-card-container"
            style={{
                '--active': Id === active ? 1 : 0,
                '--offset': (active - Id) / 3,
                '--direction': Math.sign(active - Id),
                '--abs-offset': Math.abs(active - Id) / 3,
                pointerEvents: active === Id ? 'auto' : 'none',
                opacity: Math.abs(active - Id) >= MAX_VISIBILITY ? '0' : '1',
                display:
                    Math.abs(active - Id) > MAX_VISIBILITY ? 'none' : 'block',
            }}
        >
            <div className="yun-card">
                <div className="yun-ques">
                    <h3>{title}</h3>
                    <h5>{ques}</h5>
                </div>
                <div className="yun-opts">
                    {opt.map((v2, i2) => {
                        // console.log(ref[i2]);
                        return (
                            <div className="yun-radio-form" key={i2}>
                                <input
                                    name={questionID}
                                    type="radio"
                                    value={v2}
                                    // ref={ref[i2]}
                                    checked={gooddeedValue === v2}
                                    onChange={handleChange}
                                />
                                {active < questionID && (
                                    <label
                                        htmlFor={v2}
                                        onClick={() => {
                                            console.log('按了按鈕');
                                            setActive((Id) => Id + 1);
                                            if (questionID === 12) {
                                                // setShows([
                                                //     'none',
                                                //     'none',
                                                //     'block',
                                                // ]);
                                                fetchRandomScore();

                                                setShows({
                                                    opacity: ['0', '0', '1'],
                                                    height: ['0', '0', ''],
                                                });
                                            }
                                        }}
                                    >
                                        {v2}
                                    </label>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Card;
