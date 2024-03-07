import React, { useEffect, useState, useRef } from 'react';
import { CKEditorEventPayload, CKEditorInstance } from 'ckeditor4-react';
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import TBox from 'components/box';
import TIconButton from 'components/iconButton';
import { TBoxProps } from 'components/box/box.styled';
import TRoomWrapper from './room.styled';
import TTypography from 'components/typography';
import TVideoCall from 'container/videoCall';

import { RootState } from 'store';
import { TRoomsProps } from '..';
import TMessage, { TMessageProps } from 'components/message';
import { setHelmet } from 'store/slices/helmet';
import TButton from 'components/button';
import TEditor from 'components/CKEditor';
import { CHAT_CHANNELS } from 'constants/socketChanel';
import { ROOM_ENDPOINT } from 'constants/apiEndPoint';
import fetchDataWithoutCredential from 'utils/fetchDataWithCredential';
import TGrid from 'components/grid';

export type TRoomProps = TBoxProps & {
  chatWrapperProps?: TBoxProps;
  roomId?: string;
  topic?: string;
  isChatToUser?: boolean;
};

const socket = io(process.env.REACT_APP_API_URL + '');

const TRoom = ({ chatWrapperProps, roomId, isChatToUser, ...props }: TRoomProps) => {
  const [messages, setMessages] = useState<Array<TMessageProps> | []>([]);
  const [roomInfo, setRoomInfo] = useState<TRoomsProps | undefined>();
  const [activeScrollToBottom, setActiveScrollToBottom] = useState(false);
  const [haveNewMessage, setHaveNewMessage] = useState(false);
  const currentUser = useSelector((state: RootState) => state.auth.userData);
  const chatWindow = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<CKEditorInstance | null>(null);
  const { t } = useTranslation();
  const history = useHistory();
  const currentUserId = currentUser?._id || '';
  const dispatch = useDispatch();

  const handleNewMessage = () => {
    if (activeScrollToBottom) {
      setHaveNewMessage(true);
    } else {
      setHaveNewMessage(false);
      setTimeout(() => {
        if (chatWindow && chatWindow.current) {
          chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
        }
      }, 1000);
    }
  };

  const handleScrollChatWindow = () => {
    if (chatWindow.current) {
      const chatWindowHeight = chatWindow.current.clientHeight;
      const chatWindowScrollHeight = chatWindow.current.scrollHeight;
      const chatWindowScrollTop = chatWindow.current.scrollTop;
      if (chatWindowScrollTop + chatWindowHeight < chatWindowScrollHeight - 100) {
        setActiveScrollToBottom(true);
      } else {
        setActiveScrollToBottom(false);
        setHaveNewMessage(false);
      }
    }
  };

  const handleUnloadEvent = () => {
    fetchDataWithoutCredential({
      url: ROOM_ENDPOINT.LEAVE_ROOM + roomId,
      method: 'POST',
      body: { tokenUser: localStorage.getItem('tokenUser') },
    });

    socket.emit(CHAT_CHANNELS.USER_LEAVE, {
      roomId,
      username: currentUser?.fullName || currentUser?.account,
      userId: currentUser?._id || '',
    });
  };
  const handleSendMessage = () => {
    const messageToSend = editorInstanceRef.current?.getData();
    if (messageToSend.trim() === '') {
      editorInstanceRef.current?.setData('');
      return;
    }
    socket.emit(CHAT_CHANNELS.NEW_MESSAGE, {
      _id: roomId,
      message: messageToSend,
      userId: currentUserId,
      username: currentUser?.fullName || currentUser?.account,
      avatar: currentUser?.image || '',
      time: new Date(),
    });
    editorInstanceRef.current?.setData('');
    setTimeout(() => {
      if (chatWindow && chatWindow.current) {
        chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
      }
    }, 1000);
  };
  const handleEnterEvent = (event: CKEditorEventPayload<'key'>) => {
    const evtData = event.data;
    if (evtData && evtData.keyCode == 13) {
      handleSendMessage();
    }
  };
  useEffect(() => {
    dispatch(setHelmet({ title: t('chat_room') }));
    fetchDataWithoutCredential({
      url: ROOM_ENDPOINT.JOIN_ROOM + roomId,
      method: 'POST',
      body: { tokenUser: localStorage.getItem('tokenUser') },
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((res) => {
        if (!res) {
          throw new Error('not_found');
        }
        setRoomInfo(res);
        document.title = res.topic;
      })
      .catch(() => {
        history.push('/not_found');
      });
  }, []);
  useEffect(() => {
    socket.on(CHAT_CHANNELS.SEND_MESSAGE_IN_ROOM({ roomId }), (data: TMessageProps) => {
      setMessages((messages) => [...messages, data]);
      handleNewMessage();
    });
    socket.on(CHAT_CHANNELS.LEAVE_CHAT_ROOM({ roomId }), (data) => {
      setMessages((prewMessgage) => {
        const newMessage = [
          ...prewMessgage,
          {
            specialMessgage: t('user_has_left_the_group', { user: data.username }),
          },
        ];
        return newMessage;
      });
      handleNewMessage();
    });
    socket.on(CHAT_CHANNELS.JOIN_CHAT_ROOM({ roomId }), (data) => {
      setMessages((prewMessgage) => {
        const newMessage = [
          ...prewMessgage,
          {
            specialMessgage: t('user_has_joined_the_group', { user: data.username }),
          },
        ];
        return newMessage;
      });
      handleNewMessage();
    });
    return () => {
      socket.off(CHAT_CHANNELS.SEND_MESSAGE_IN_ROOM({ roomId }));
      socket.off(CHAT_CHANNELS.LEAVE_CHAT_ROOM({ roomId }));
      socket.off(CHAT_CHANNELS.JOIN_CHAT_ROOM({ roomId }));
    };
  }, []);
  useEffect(() => {
    if (isChatToUser) {
      return;
    }
    if (currentUserId) {
      socket.emit(CHAT_CHANNELS.USER_CONNECTED, {
        _id: roomId,
        username: currentUser?.fullName || currentUser?.account,
        userId: currentUserId,
      });
    }
  }, [currentUserId]);
  useEffect(() => {
    window.addEventListener('beforeunload', handleUnloadEvent);
    window.addEventListener('unload', handleUnloadEvent);

    return () => {
      handleUnloadEvent();
      window.removeEventListener('beforeunload', handleUnloadEvent);
      window.removeEventListener('unload', handleUnloadEvent);
    };
  }, []);
  useEffect(() => {
    if (chatWindow && chatWindow.current) {
      chatWindow.current.addEventListener('scroll', handleScrollChatWindow);
    }
    return () => {
      if (chatWindow && chatWindow.current) {
        chatWindow.current.removeEventListener('scroll', handleScrollChatWindow);
      }
    };
  });
  return (
    <TBox {...props}>
      <TTypography variant="h3" color="primary" textalign="center" marginY={2}>
        {roomInfo?.topic}
      </TTypography>
      <TGrid container spacing={2}>
        <TGrid item xs={12} sm={6} md={8}>
          {roomInfo && <TVideoCall ownerId={roomInfo.creator.userId} roomId={roomInfo!._id} />}
        </TGrid>
        <TGrid item xs={12} sm={6} md={4}>
          <TRoomWrapper
            display="flex"
            flexDirection="column"
            {...chatWrapperProps}
            height="70vh"
            overflow="auto"
            position="relative"
            ref={chatWindow}
          >
            {messages.map((message, index) => {
              return (
                <TMessage
                  isCurrentUser={message.userId === currentUserId}
                  hideAvatar={index > 1 && message.userId == messages[index - 1].userId}
                  {...message}
                  key={index}
                />
              );
            })}
            {activeScrollToBottom && (
              <TBox position="sticky" bottom={16} marginRight={2} textalign="right" animation="bounce 3s infinite">
                {haveNewMessage ? (
                  <TButton
                    padding={0}
                    onClick={() => {
                      if (chatWindow && chatWindow.current) {
                        chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
                      }
                    }}
                    variant="outlined"
                  >
                    <TTypography variant="body2" color="primary" display="flex" alignItems="center">
                      <KeyboardArrowDownIcon />
                      {t('have_new_message')}
                    </TTypography>
                  </TButton>
                ) : (
                  <TIconButton
                    onClick={() => {
                      if (chatWindow && chatWindow.current) {
                        chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
                      }
                    }}
                    width={1.5}
                    height={1.5}
                  >
                    <KeyboardArrowDownIcon />
                  </TIconButton>
                )}
              </TBox>
            )}
          </TRoomWrapper>
          <TBox position="relative" display="flex" flexWrap="nowrap">
            <TEditor
              containerProps={{ width: '100%' }}
              config={{
                toolbar: [
                  ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', 'Undo', 'Redo'],
                  ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'CopyFormatting', 'RemoveFormat'],
                  ['Styles', 'Format', 'Font', 'FontSize', 'TextColor', 'BGColor'],
                  [
                    'NumberedList',
                    'BulletedList',
                    'Outdent',
                    'Indent',
                    'Blockquote',
                    'CreateDiv',
                    'JustifyLeft',
                    'JustifyCenter',
                    'JustifyRight',
                    'JustifyBlock',
                    'BidiLtr',
                    'BidiRtl',
                  ],
                  ['Image', 'HorizontalRule', 'Smiley', 'SpecialChar', 'Emoji', 'PageBreak'],
                  ['Find', 'Replace', 'SelectAll'],
                ],
                autocomplete: true,
                extraPlugins: ['colorbutton', 'autocomplete', 'emoji', 'find', 'smiley'],
                disallowedContent: 'script; *[on*]',
                height: 80,
              }}
              eventHandler={{
                onKey: (evt: CKEditorEventPayload<'key'>) => {
                  editorInstanceRef.current = evt.editor;
                  handleEnterEvent(evt);
                },
              }}
            />
            <TBox position="absolute" top={1} right={1}>
              <TIconButton variant="extended" shape="curved" onClick={() => handleSendMessage()}>
                <SendIcon />
              </TIconButton>
            </TBox>
          </TBox>
        </TGrid>
      </TGrid>
    </TBox>
  );
};

export default TRoom;
