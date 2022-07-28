// 後端主機 Domain 和 Port
export const SERVER = 'http://localhost:3500';

// 分享牆部分
export const API_SHAREWALL = `${SERVER}/api/sharewall`;
export const API_SHAREWALL_TAGS = `${SERVER}/api/sharewall/tags`;

// 測試部分 (之後可以刪除)
export const TEST_LOGIN = `${SERVER}/test/member/login`;
export const TEST_REGISTER = `${SERVER}/test/member/register`;
export const TEST_FORGOT_PASSWORD = `${SERVER}/test/member/forgotpassword`;
export const TEST_FORGOT_PASSWORD_REVISE = `${SERVER}/test/member/forgotpassword-revise`;
export const TEST_MEMBER_PROFILE = `${SERVER}/test/member/member-profile`;
export const TEST_MEMBER_PROFILE_REVISE = `${SERVER}/test/member/member-profile-revise`;
export const TEST_MEMBER_PASSWORD_REVISE = `${SERVER}/test/member/member-password-revise`;
export const TEST_MEMBER_EVENT_ORDER = `${SERVER}/test/member/member-event-order`;