const API_HOST = process.env.REACT_APP_API_URL;
const COMMON_ENDPOINT = {
  SEARCH: API_HOST + '/search/',
};
const USER_ENDPOINT = {
  LOGIN: API_HOST + '/user/login',
  REGISTER: API_HOST + '/user/register',
  REQUEST_RESET_PASSWORD: API_HOST + '/user/reset-password',
  GET_CURRENT_USER_INFO: API_HOST + '/user',
  GET_LIST_USER_INFO: API_HOST + '/user',
  USER_BY_ID: API_HOST + '/user/profile/',
  UPDATE_USER_AVATER: API_HOST + '/user/profile/avatar/',
  MULTIPLE_ACTION: API_HOST + '/user/handleMultiAction',
  EDIT_ROLE: API_HOST + '/user/edit-role/',
  BAN_USER: API_HOST + '/user/ban/',
  UNBAN_USER: API_HOST + '/user/unban/',
  BAN_OR_DELETE: API_HOST + '/user/',
  RESET_PASSWORD: API_HOST + '/user/reset-password/',
};
const ROOM_ENDPOINT = {
  CREATE: API_HOST + '/chat-room/create',
  FIND_CHAT_ROOM: API_HOST + '/chat-room/search?search=',
  LIST_CHAT_ROOM_PER_PAGE: API_HOST + '/chat-room/?page=',
  FRESH_LIST_CHAT_ROOM_PER_PAGE: API_HOST + '/chat-room/?reload=1&page=',
  LEAVE_ROOM: API_HOST + '/chat-room/leave/',
  JOIN_ROOM: API_HOST + '/chat-room/join/',
  DELETE_ROOM_BY_ID: API_HOST + '/chat-room/delete/',
};

const IMAGE_ENDPOINT = {
  GET_IMAGE_BY_ID: API_HOST + '/images',
  GET_LIST_IMAGE: API_HOST + '/images',
  GET_LIST_IMAGE_BY_PAGE: API_HOST + '/images?page=',
  UPLOAD_CLOUDINARY: API_HOST + '/cloudinary-upload',
};
export { API_HOST, COMMON_ENDPOINT, USER_ENDPOINT, ROOM_ENDPOINT, IMAGE_ENDPOINT };
