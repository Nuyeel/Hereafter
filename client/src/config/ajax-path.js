// 後端主機 Domain 和 Port
export const SERVER = 'http://localhost:3500';

// 分享牆部分
export const API_SHAREWALL = `${SERVER}/api/sharewall`;
export const API_SHAREWALL_TAGS = `${SERVER}/api/sharewall/tagbar/tags`;

// 分享牆來生形象靜態路由
export const STATIC_SHAREWALL_AVA = `${SERVER}/uploads/images/share/ava`;

// 良辰吉地
export const PLACE_GETDATA_API = `${SERVER}/api/place`;
export const PLACE_FILTER_COUNTRYDATA_API = `${SERVER}/api/place/country-city`;
export const PLACE_LIKED_API = `${SERVER}/api/place/liked`;

// 轉生購物車
export const PLACE_CARTDATA_API = `${SERVER}/api/reborn-cart`;

// 測試部分 (之後可以刪除)
export const MEMBER_LOGIN = `${SERVER}/api/member/login`;
export const MEMBER_REGISTER = `${SERVER}/api/member/register`;
export const FORGOT_PASSWORD = `${SERVER}/api/member/forgotpassword`;
export const FORGOT_PASSWORD_REVISE = `${SERVER}/api/member/forgotpasswordrevise`;
export const MEMBER_PROFILE = `${SERVER}/api/member/profile`;
export const MEMBER_PROFILE_REVISE = `${SERVER}/api/member/profilerevise`;
export const MEMBER_PASSWORD_REVISE = `${SERVER}/api/member/profilepasswordrevise`;
export const MEMBER_EVENT_ORDER = `${SERVER}/api/member/profileeventorder`;

// 活動列表
export const Event_List_GET = `${SERVER}/events `;
// 活動購物車(增加商品)
export const Event_Cart_ADD_POST = `${SERVER}/eventcarts/addcart `;

export const Showcase_Data = `${SERVER}/avatar/showcase`;
export const Avatar_Update = `${SERVER}/avatar/update`;
