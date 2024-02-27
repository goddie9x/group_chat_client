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
const ROOM_ENDPOINT = {
  FIND_CHAT_ROOM: API_HOST + '/chat-room/search?search=',
  LIST_CHAT_ROOM_PER_PAGE: API_HOST + '/chat-room/?page=',
  FRESH_LIST_CHAT_ROOM_PER_PAGE: API_HOST + '/chat-room/?reload=1&page=',
};

export { API_HOST, USER_ENDPOINT, ROOM_ENDPOINT };
