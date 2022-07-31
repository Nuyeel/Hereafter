import { useState } from 'react';
import { countries, postcodes, townships } from '../data/townships';
import '../styles/_cart.scss';

function TWZipCode(props) {
    // 代表目前被選中的縣市的索引值
    // 注意資料類型都是數字(索引值是數字)
    // -1代表目前沒有選中任何的陣列中的值
    // const [countryIndex, setCountryIndex] = useState(-1)
    // const [townshipIndex, setTownshipIndex] = useState(-1)

    const {
        countryIndex,
        setCountryIndex,
        townshipIndex,
        setTownshipIndex,
        handleChange,
    } = props;

    return (
        <>
            <select
                id="test-text"
                className="xuan-input-text"
                name="add_city"
                value={countryIndex}
                onChange={(e) => {
                    handleChange(e); //可以存入縣市鄉鎮代號(index)

                    // 注意e.target.value為字串類型(由網頁上傳入都是字串值)
                    // 為了保持countryIndex(state狀態)的資料類型都一致相同，所以要轉為數字
                    setCountryIndex(Number(e.target.value));

                    // 重置townshipIndex的值為-1
                    setTownshipIndex(-1);
                }}
            >
                <option value="-1">請選擇縣市</option>
                {countries.map((v, i) => {
                    return (
                        <option key={i} value={i}>
                            {v}
                        </option>
                    );
                })}
            </select>
            <select
                id="test-text"
                className="xuan-input-text"
                name="add_town"
                value={townshipIndex}
                onChange={(e) => {
                    handleChange(e);
                    // 注意e.target.value為字串類型(由網頁上傳入都是字串值)
                    // 為了保持setTownshipIndex(state狀態)的資料類型都一致相同，所以要轉為數字
                    setTownshipIndex(Number(e.target.value));
                }}
            >
                <option value="-1">請選擇區域</option>
                {/* 當有選擇縣市(countryIndex >)時才要作map，呈現其它的區域選項 */}
                {countryIndex > -1 &&
                    townships[countryIndex].map((v, i) => {
                        return (
                            <option key={i} value={i}>
                                {v}
                            </option>
                        );
                    })}
            </select>
            {/* <p>
        郵遞區號:
        {countryIndex > -1 &&
          townshipIndex > -1 &&
          postcodes[countryIndex][townshipIndex]}
      </p> */}
        </>
    );
}

export default TWZipCode;
