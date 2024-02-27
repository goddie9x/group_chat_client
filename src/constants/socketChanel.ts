type RoomProps = {
  roomId?: string;
};

const CHAT_CHANNELS = {
  REQUEST_UPDATE_CHATROOM: 'chat-room:update',
  NOTICE_CHATROOM_UPDATED_STATUS: 'chat-room:updated',
  USER_LEAVE: 'chat-room:user-leave',
  NEW_MESSAGE: 'chat-room:user-chat',
  USER_CONNECTED: 'chat-room:user-connected',
  SEND_MESSAGE_IN_ROOM: ({ roomId }: RoomProps) => 'chat-room-' + roomId + '-message',
  LEAVE_CHAT_ROOM: ({ roomId }: RoomProps) => 'chat-room-leave-' + roomId,
  JOIN_CHAT_ROOM: ({ roomId }: RoomProps) => 'chat-room-join-' + roomId,
};

export { CHAT_CHANNELS };
