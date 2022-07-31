import React, { useState } from 'react';
import TWZipCode from './TWZipCode';
import '../styles/_cart.scss';
import './styles/_personform.scss';

function PersonForm(props) {
    const {
        myInfor,
        setMyInfor,
        countryIndex,
        setCountryIndex,
        townshipIndex,
        setTownshipIndex,
    } = props;

    // 透過localStorage 取得登入會員sid
    let memberinfor = JSON.parse(localStorage.getItem('auth'));
    const membersid = Object.values(memberinfor)[1];

    // multiple State
    //   const [myInfor, setMyInfor] = useState({
    //   member_sid: `${membersid}`,
    //   fullname: "",
    //   mobile_city:"",
    //   mobile:"",
    //   email:"",
    //   gender:"",
    //   ID:"",
    //   birthday:"",
    //   address:""
    // })

    const genderOptions = ['不提供', '男', '女']; //選性別使用
    const mobileOptions = [
        '台灣 +886',
        '中國 +86',
        '香港 +852',
        '澳門 +853',
        'Malaysia +60',
        'Singapore +65',
        '日本 +81',
        'South Korea +82',
        'United States +1',
        'Canada +1',
        'Thailand +66',
        'Philippines +63',
        'Vietnam +84',
        'Indonesia +62',
        'Afghanistan +93',
        'Albania +355',
        'Algeria +213',
        'Andorra +376',
        'Angola +244',
        'Argentina +54',
        'Armenia +374',
        'Aruba +297',
        'Ascension +247',
        'Australia +61',
        'Austria +43',
    ]; //電話區域代碼

    const handleChange = (e) => {
        setMyInfor({ ...myInfor, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // 先阻擋預設送出行為(預設用GET URLencoded)

        // 這裡可以得到目前輸入的值
        // 第一種方式: 從狀態得到
        console.log(myInfor);

        // 第二種方式: 用FormData物件
        const formData = new FormData(e.target);

        console.log(
            formData.get('member_sid'),
            formData.get('fullname'),
            formData.get('mobile_city'),
            formData.get('mobile_town'),
            formData.get('mobile'),
            formData.get('email'),
            formData.get('gender'),
            formData.get('ID'),
            formData.get('birthday'),
            formData.get('add_city'),
            formData.get('add_town'),
            formData.get('address')
        );

        // 作更多驗証

        const fd = new FormData(document.form1); //建立一個formdata

        // 如果Router已有upload功能，可直接用formdata
        // 送到伺服器(fetch/ajax)
        fetch('http://localhost:3500/eventcarts/person', {
            method: 'POST',
            body: fd, //目前送出格式為multiple formdata
        })
            .then((r) => r.json())
            .then((obj) => {
                console.log('收到的res', obj);
            });
    };

    // TODO: 這一段可以把 button 改成 reset 就可以不用把inputErrors改成 ''
    // 此段處理表單驗證/錯誤訊息
    // 紀錄表單每個欄位有錯誤時的訊息
    const [inputErrors, setInputErrors] = useState({
        fullname: '',
        mobile_city: '', //select
        mobile: '',
        email: '',
        gender: '',
        ID: '',
        birthday: '',
        add_city: '', //select
        add_town: '', //select
        address: '',
    });

    // 表單用，有錯誤驗證時會觸發
    const handleInvalid = (e) => {
        e.preventDefault(); //阻擋HTML5原生錯誤訊息

        // 把原生泡泡訊息改放console
        console.log(e.target.validationMessage);

        // 把原生錯誤泡泡訊息填入
        setInputErrors({
            ...inputErrors,
            [e.target.name]: e.target.validationMessage,
        });
    };

    // 當使用者重新輸入時，先把錯誤訊息拿掉
    // 等填完按下submit後再檢查一次
    const handleFormChange = (e) => {
        setInputErrors({
            ...inputErrors,
            [e.target.name]: '',
        });
    };

    // FIXME: 按下重新填寫時，錯誤訊息無法清零

    // 「重新填寫」 按下的時候，把myInfor都清空(變回預設值'')
    const handleClearForm = () => {
        // 值都變回 ''
        setMyInfor({
            ...myInfor,
            member_sid: '',
            fullname: '',
            mobile_city: '',
            mobile: '',
            email: '',
            gender: '',
            ID: '',
            birthday: '',
            add_city: '', //目前這個沒辦法清空
            add_town: '', //目前這個沒辦法清空
            address: '',
        });

        // 錯誤訊息也都清空
        setInputErrors({
            ...inputErrors,
            fullname: '',
            mobile_city: '', //select
            mobile: '',
            email: '',
            gender: '',
            ID: '',
            birthday: '',
            add_city: '', //select
            add_town: '', //select
            address: '',
        });
    };

    return (
        <>
            <div className="col col-9">
                {/* 沒有內容，對位用 */}
                <div className="xuan-personform-top"></div>

                <div className="xuan-person-infor-window">
                    <div className="xuan-form-wrap">
                        <div className="xuan-person-infor-title">
                            <div className="xuan-title-left">
                                <span className="xuan-check">
                                    <span className="xuan-h5">
                                        填寫參加人資訊
                                    </span>

                                    <input
                                        className="xuan-input-checkbox"
                                        type="checkbox"
                                        id="cbox"
                                    />
                                    <span>同會員資訊</span>
                                </span>

                                <p className="xuan-caption">
                                    報名資料將用於主辦單位安排活動，活動票券相關資訊將寄至訂購人信箱。
                                </p>
                            </div>

                            <button
                                className="xuan-btn-m xuan-btn-pri"
                                style={{ margin: 20 + 'px' }}
                            >
                                查看訂單明細
                            </button>
                        </div>

                        {/* 當表單input有錯誤時，就會觸發 onInvalid 事件 */}
                        <form
                            onSubmit={handleSubmit}
                            onInvalid={handleInvalid}
                            onChange={handleFormChange}
                            name="form1"
                            className="xuan-personform"
                        >
                            <div className="xuan-infor-left">
                                {/* 從localStorage獲得membersid，設一個隱藏欄位進fd一起送 */}
                                <input
                                    style={{ display: 'none' }}
                                    className="xuan-input-text"
                                    name="member_sid"
                                    type="text"
                                    id="test-text"
                                    defaultValue={membersid}
                                />

                                <label
                                    className="xuan-label"
                                    htmlFor="test-text"
                                >
                                    姓名：
                                </label>
                                <input
                                    className="xuan-input-text"
                                    name="fullname"
                                    type="text"
                                    id="test-text"
                                    placeholder="請輸入真實姓名"
                                    value={myInfor.fullname}
                                    onChange={handleChange}
                                    required
                                />

                                <br />
                                <span className="xuan-error-text">
                                    {inputErrors.fullname}
                                </span>
                                <br /><br />

                                {/* mobileOptions */}
                                <label htmlFor="test-text">行動電話：</label>

                                <select
                                    className="xuan-input-select"
                                    value={myInfor.mobile_city}
                                    name="mobile_city"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">請選擇</option>
                                    {mobileOptions.map((v, i) => {
                                        return (
                                            <option key={i} value={v}>
                                                {v}
                                            </option>
                                        );
                                    })}
                                    ;
                                </select>

                                <input
                                    className="xuan-input-text"
                                    name="mobile"
                                    type="text"
                                    id="test-text"
                                    placeholder="0912 345 678"
                                    value={myInfor.mobile}
                                    onChange={handleChange}
                                    required
                                />

                                <br />
                                <span className="xuan-error-text">
                                    {inputErrors.mobile_city}
                                </span>
                                <span className="xuan-error-text">
                                    {inputErrors.mobile}
                                </span>
                                <br /><br />

                                <label htmlFor="test-text">電子信箱：</label>

                                {/* FIXME: CSS待改(因為type一定要是email才能檢查，CSS預設統一是text*/}
                                <input
                                    className="xuan-input-text"
                                    name="email"
                                    type="email"
                                    id="test-text"
                                    placeholder="請輸入電子信箱"
                                    value={myInfor.email}
                                    onChange={handleChange}
                                    required
                                />

                                <br />
                                <span className="xuan-error-text">
                                    {inputErrors.email}
                                </span>
                                <br /><br />

                                <div className="xuan-gender-group">
                                    <label htmlFor="test-text">性別：</label>

                                    {genderOptions.map((v, i) => {
                                        return (
                                            <div key={i}>
                                                <input
                                                    className="xuan-input-radio"
                                                    name="gender"
                                                    type="radio"
                                                    checked={
                                                        myInfor.gender === v
                                                    }
                                                    value={v}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="xuan-label">
                                                    {v}
                                                </label>
                                            </div>
                                        );
                                    })}

                                    <br />
                                    <span className="xuan-error-text">
                                        {inputErrors.gender}
                                    </span>
                                    
                                </div>
                            </div>

                            <div className="xuan-infor-right">
                                <label htmlFor="test-text ">身分證字號：</label>
                                <input
                                    className="xuan-input-text"
                                    name="ID"
                                    type="text"
                                    id="test-text"
                                    placeholder=""
                                    value={myInfor.ID}
                                    onChange={handleChange}
                                    required
                                />

                                <br />
                                <span className="xuan-error-text">
                                    {inputErrors.ID}
                                </span>
                                <br /><br />

                                <label htmlFor="test-text">出生日期：</label>
                                <input
                                    className="xuan-input-text"
                                    name="birthday"
                                    type="date"
                                    id="test-text"
                                    placeholder=""
                                    value={myInfor.birthday}
                                    onChange={handleChange}
                                    required
                                />

                                <br />
                                <span className="xuan-error-text">
                                    {inputErrors.birthday}
                                </span>
                                <br /><br />

                                <label htmlFor="test-text">地址：</label>

                                <TWZipCode
                                    myInfor={myInfor}
                                    handleChange={handleChange} //目前存進MySQL的是城市編號
                                    countryIndex={countryIndex}
                                    setCountryIndex={setCountryIndex}
                                    townshipIndex={townshipIndex}
                                    setTownshipIndex={setTownshipIndex}
                                />

                                <br />

                                <input
                                    className="xuan-input-text address-detail"
                                    name="address"
                                    type="text"
                                    id="test-text"
                                    placeholder="詳細地址"
                                    value={myInfor.address}
                                    onChange={handleChange}
                                    required
                                />

                                <br />
                                <span className="xuan-error-text">
                                    {inputErrors.address}
                                </span>
                                <br /><br />

                                {/* FIXME: 希望在把送出表單功能，改放到Summary「下一步」*/}

                                <div className="xuan-personform-btn-group">
                                    <button
                                        className="xuan-btn-m xuan-btn-sec"
                                        type="submit"
                                    >
                                        送出報名資訊
                                    </button>
                                    <button
                                        type="button"
                                        className="xuan-btn-m xuan-btn-sec"
                                        onClick={handleClearForm}
                                    >
                                        重新填寫
                                    </button>
                                    <button
                                        type="reset"
                                        className="xuan-btn-m xuan-btn-sec"
                                    >
                                        重新填寫2
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PersonForm;
