const API_HOST = process.env.REACT_APP_API_URL;
const USER_ENDPOINT = {
  LOGIN: API_HOST + '/user/login',
  REGISTER: API_HOST + '/user/register',
  REQUEST_RESET_PASSWORD: API_HOST + '/user/reset-password',
  GET_CURRENT_USER_INFO: API_HOST + '/user',
  USER_BY_ID: API_HOST + '/user/profile/',
  UPDATE_USER_AVATER: API_HOST + '/user/profile/avatar/',
  BAN_USER: API_HOST + '/user/ban/',
};

export { API_HOST, USER_ENDPOINT };
