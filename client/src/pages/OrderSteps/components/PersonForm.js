import React, { useState, useContext, useEffect } from 'react';
import TWZipCode from './TWZipCode';
import Swal from 'sweetalert2'; //sweetalert2
import { MdReplay } from 'react-icons/md';
import { FiSend } from 'react-icons/fi';
import quicksoul from '../imgs/quicksoul.svg';
import axios from 'axios';

// scss
import '../styles/_new_cart.scss';
// import './styles/_personform.scss';

// 會員登入登出驗證
import AuthContext from '../../../context/AuthContext/AuthContext';

function PersonForm(props) {
    // 會員登入登出驗證(auth)
    const { authorized, sid, account, token } = useContext(AuthContext);

    const {
        myInfor,
        setMyInfor,
        countryIndex,
        setCountryIndex,
        townshipIndex,
        setTownshipIndex,
        setDetailVisible,
        detailVisible,
        next,
    } = props;

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

    // 一鍵填入魔法
    const quickPass = () => {
        setMyInfor({
            ...myInfor,

            // member_sid: sid, //預設一開始就代入會員資訊
            // fullname: '王小明', //預設一開始就代入會員資訊
            mobile_city: '台灣 +886',
            // mobile: '0912345678', //預設一開始就代入會員資訊
            // email: 'passtest@yahoo.com.tw',
            gender: '不提供',
            ID: 'R123456789',
            birthday: '1995-09-22', //FIXME:預設一開始就代入會員資訊
            add_city: '台北市',
            add_town: '大安區',
            address: '復興南路一段390號2樓',
        });
    };

    const handleChange = (e) => {
        setMyInfor({ ...myInfor, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        Swal.fire('已收到報名資訊');
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
            })
            .then(next()); //POST完後直接跳轉到下一頁
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

    const [membercheck, setMemberCheck] = useState('true'); //預設一開始就填

    const checkedMemberState = () => {
        if (membercheck) {
            setMyInfor({
                ...myInfor,

                fullname: '',
                mobile: '',
                email: '',
                birthday: '',
            });
        } else {
            fetchMemberInfor();
        }
    };

    // 預設「同會員」已勾，填入會員資料進myinfor
    const fetchMemberInfor = async () => {
        const response = await axios.get(
            `http://localhost:3500/eventcarts/memberinfor/${sid}`
        );

        await console.log(response.data[0].birthdate);

        await setMyInfor({
            ...myInfor,

            member_sid: sid,
            fullname: response.data[0].name,
            mobile: response.data[0].mobile,
            email: response.data[0].email,
            birthday: response.data[0].birthdate,
        });

        await console.log(myInfor);
    };

    // 預設一進入頁面就執行(會員資料代入表格)
    useEffect(() => {
        fetchMemberInfor();
    }, [sid]);

    // FIXME: 按下重新填寫時，錯誤訊息無法清零

    // 「清空」 按下的時候，把myInfor都清空(變回預設值'')
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

        //清inputErrors
        setInputErrors({
            ...inputErrors,
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

        // 「同會員」取消勾選
        setMemberCheck(!membercheck);
    };

    return (
        <>
            <div className="xuan-person-infor-window">
                <div className="xuan-form-wrap">
                    <div className="xuan-person-infor-title">
                        <div className="xuan-infor-btn">
                            <img
                                className="quicksoul"
                                src={quicksoul}
                                alt=""
                                onClick={() => {
                                    quickPass();
                                }}
                            />
                            <button
                                className="xuan-btn-m xuan-btn-pri"
                                onClick={() => {
                                    setDetailVisible(
                                        'xuan-readytobuy-container-visible'
                                    );
                                }}
                            >
                                查看訂單明細
                            </button>
                        </div>

                        <div className="xuan-title-left">
                            <div className="xuan-check">
                                <span className="xuan-title">
                                    填寫訂購人資訊
                                </span>

                                <input
                                    className="xuan-input-checkbox"
                                    type="checkbox"
                                    id="cbox"
                                    checked={membercheck}
                                    onChange={() => {
                                        setMemberCheck(!membercheck);
                                        checkedMemberState();
                                    }}
                                />

                                <span>同會員</span>
                            </div>

                            <p className="xuan-caption">
                                報名資料將用於主辦單位安排活動，活動票券相關資訊將寄至訂購人信箱。
                            </p>
                        </div>
                    </div>

                    {/* 當表單input有錯誤時，就會觸發 onInvalid 事件 */}
                    <form
                        onSubmit={handleSubmit}
                        onInvalid={handleInvalid}
                        onChange={handleFormChange}
                        name="form1"
                        className="xuan-personform"
                    >
                        {/* FIXME: type=input會被style.css汙染，目前先註解 */}

                        <div className="xuan-infor-left">
                            {/* 從localStorage獲得membersid，設一個隱藏欄位進fd一起送 */}

                            <input
                                style={{ display: 'none' }}
                                className="xuan-input-text"
                                name="member_sid"
                                // type="text"
                                id="test-text"
                                defaultValue={sid}
                            />

                            <div className="xuan-form-name">
                                <label
                                    className="xuan-label-title"
                                    htmlFor="test-text"
                                >
                                    姓名
                                    <span className="xuan-must-star">*</span>：
                                </label>

                                <input
                                    className="xuan-input-text"
                                    name="fullname"
                                    // type="text"
                                    id="test-text"
                                    placeholder="請輸入真實姓名"
                                    value={myInfor.fullname}
                                    onChange={handleChange}
                                    required
                                />

                                <div className="xuan-error-text">
                                    {inputErrors.fullname}
                                </div>
                            </div>

                            <div className="xuan-form-mobile">
                                {/* mobileOptions */}
                                <label
                                    htmlFor="test-text"
                                    className="xuan-label-title"
                                >
                                    手機
                                    <span className="xuan-must-star">*</span>：
                                </label>

                                <select
                                    id="test-text"
                                    className="xuan-input-text"
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
                                    // type="text"
                                    id="test-text"
                                    placeholder="請輸入手機號碼"
                                    value={myInfor.mobile}
                                    onChange={handleChange}
                                    required
                                />

                                <div className="d-flex">
                                    <div className="xuan-error-text">
                                        {inputErrors.mobile_city}
                                    </div>
                                    <div className="xuan-error-text">
                                        {inputErrors.mobile}
                                    </div>
                                </div>
                            </div>

                            <div className="xuan-form-email">
                                <label
                                    htmlFor="test-text"
                                    className="xuan-label-title"
                                >
                                    電子信箱
                                    <span className="xuan-must-star">*</span>：
                                </label>

                                {/* FIXME: CSS待改(因為type一定要是email才能檢查，CSS預設統一是text*/}
                                <input
                                    className="xuan-input-text"
                                    name="email"
                                    // type="email"
                                    id="test-text"
                                    placeholder="請輸入電子信箱"
                                    value={myInfor.email}
                                    onChange={handleChange}
                                    required
                                />

                                <div className="xuan-error-text">
                                    {inputErrors.email}
                                </div>
                            </div>

                            <div className="xuan-gender-group">
                                <label
                                    htmlFor="test-text"
                                    className="xuan-label-title"
                                >
                                    性別
                                    <span className="xuan-must-star">*</span>：
                                </label>

                                {genderOptions.map((v, i) => {
                                    return (
                                        <div key={i}>
                                            <input
                                                className="xuan-input-radio"
                                                name="gender"
                                                type="radio"
                                                checked={myInfor.gender === v}
                                                value={v}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className="xuan-label-title">
                                                {v}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="xuan-gender-error-text">
                                {inputErrors.gender}
                            </div>
                        </div>

                        <div className="xuan-infor-right">
                            <div className="xuan-form-ID">
                                <label
                                    htmlFor="test-text "
                                    className="xuan-label-title"
                                >
                                    身分證字號
                                    <span className="xuan-must-star">*</span>：
                                </label>
                                <input
                                    className="xuan-input-text"
                                    name="ID"
                                    // type="text"
                                    id="test-text"
                                    placeholder="請輸入身份證字號"
                                    value={myInfor.ID}
                                    onChange={handleChange}
                                    required
                                />

                                <div className="xuan-error-text">
                                    {inputErrors.ID}
                                </div>
                            </div>

                            <div className="xuan-form-birth">
                                <label
                                    htmlFor="test-text"
                                    className="xuan-label-title"
                                >
                                    出生日期
                                    <span className="xuan-must-star">*</span>：
                                </label>
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

                                <div className="xuan-error-text">
                                    {inputErrors.birthday}
                                </div>
                            </div>

                            <div className="xuan-form-address">
                                <label
                                    htmlFor="test-text"
                                    className="xuan-label-title"
                                >
                                    地址
                                    <span className="xuan-must-star">*</span>：
                                </label>

                                <TWZipCode
                                    myInfor={myInfor}
                                    handleChange={handleChange} //目前存進MySQL的是城市編號
                                    countryIndex={countryIndex}
                                    setCountryIndex={setCountryIndex}
                                    townshipIndex={townshipIndex}
                                    setTownshipIndex={setTownshipIndex}
                                />

                                <input
                                    className="xuan-input-text address-detail"
                                    name="address"
                                    // type="text"
                                    id="test-text"
                                    placeholder="請輸入詳細地址"
                                    value={myInfor.address}
                                    onChange={handleChange}
                                    required
                                />

                                <div className="xuan-error-text">
                                    {inputErrors.address}
                                </div>
                            </div>

                            {/* FIXME: 希望在把送出表單功能，改放到Summary「下一步」*/}

                            <div className="xuan-personform-btn-group">
                                <button
                                    className="xuan-btn-m xuan-btn-sec"
                                    type="submit"
                                >
                                    <FiSend />
                                    送出
                                </button>
                                <button
                                    type="reset"
                                    className="xuan-btn-m xuan-btn-sec"
                                    onClick={handleClearForm}
                                >
                                    <MdReplay />
                                    清空
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PersonForm;
