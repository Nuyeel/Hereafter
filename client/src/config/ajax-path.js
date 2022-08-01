// 後端主機 Domain 和 Port
export const SERVER = 'http://localhost:3500';

// 分享牆部分
export const API_SHAREWALL = `${SERVER}/api/sharewall`;
export const API_SHAREWALL_TAGS = `${SERVER}/api/sharewall/tagbar/tags`;

// 分享牆來生形象靜態路由
export const STATIC_SHAREWALL_AVA = `${SERVER}/uploads/images/share/ava`;

// 良辰吉地
export const PLACE_GETDATA_API = `${SERVER}/api/place`;

// 轉生購物車
export const PLACE_CARTDATA_API = `${SERVER}/api/reborn-cart`;

// 測試部分 (之後可以刪除)
export const MEMBER_LOGIN = `${SERVER}/api/member/login`;
export const MEMBER_REGISTER = `${SERVER}/member/register`;
export const FORGOT_PASSWORD = `${SERVER}/member/forgot-password`;
export const FORGOT_PASSWORD_REVISE = `${SERVER}/member/forgot-password-revise`;
export const MEMBER_PROFILE = `${SERVER}/member/profile`;
export const MEMBER_PROFILE_REVISE = `${SERVER}/member/profile-revise`;
export const MEMBER_PASSWORD_REVISE = `${SERVER}/member/profile-password-revise`;
export const MEMBER_EVENT_ORDER = `${SERVER}/member/profile-event-order`;

// 活動列表
export const Event_List_GET = `${SERVER}/events `;
// 活動購物車(增加商品)
export const Event_Cart_ADD_POST = `${SERVER}/eventcarts/addcart `;
