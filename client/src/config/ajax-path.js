// 後端主機 Domain 和 Port
export const SERVER = 'http://localhost:3500';

// 分享牆部分
export const API_SHAREWALL = `${SERVER}/api/sharewall`;
export const API_SHAREWALL_TAGS = `${SERVER}/api/sharewall/tags`;

// 測試部分 (之後可以刪除)
export const MEMBER_LOGIN = `${SERVER}/member/login`;
export const MEMBER_REGISTER = `${SERVER}/member/register`;
export const FORGOT_PASSWORD = `${SERVER}/member/forgot-password`;
export const FORGOT_PASSWORD_REVISE = `${SERVER}/member/forgot-password-revise`;
export const MEMBER_PROFILE = `${SERVER}/member/profile`;
export const MEMBER_PROFILE_REVISE = `${SERVER}/member/profile-revise`;
export const MEMBER_PASSWORD_REVISE = `${SERVER}/member/profile-password-revise`;
export const MEMBER_EVENT_ORDER = `${SERVER}/member/profile-event-order`;
