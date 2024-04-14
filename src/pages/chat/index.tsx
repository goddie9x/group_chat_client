import React from 'react';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import unionBy from 'lodash/unionBy';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import TBox from 'components/box';
import TGrid from 'components/grid';
import TButton from 'components/button';
import TSearch, { TSearchValueProps } from 'components/search';
import TTypography from 'components/typography';
import TRoomItem from '../../container/roomItem';
import TCreateChatRoom, { TCreateChatRoomSchema } from '../../container/modal/chat/create';

import { setHelmet } from 'store/slices/helmet';
import { RootState } from 'store';
import { setAlert } from 'store/slices/alert';
import { ROOM_ENDPOINT } from 'constants/apiEndPoint';
import { CHAT_CHANNELS } from 'constants/socketChanel';
import { UserDataSchema } from 'store/slices/auth';

const socket = io(process.env.REACT_APP_API_URL + '');

export type TRoomsProps = {
  _id: string;
  topic: string;
  maximum: number;
  creator: UserDataSchema;
  tags?: Array<string>;
  users: Array<UserDataSchema>;
  createdAt?: string;
};

const TChatRooms = () => {
  const [rooms, setRooms] = useState<Array<TRoomsProps> | []>([]);
  const [optionsSearch, setOptionsSearch] = useState<Array<TSearchValueProps> | []>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [page, setPage] = useState(1);
  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [updateData, setUpdateData] = useState<TCreateChatRoomSchema | undefined>(undefined);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.userData);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(ROOM_ENDPOINT.LIST_CHAT_ROOM_PER_PAGE + page, { signal: abortController.signal })
      .then((res) => {
        if (res.status >= 400) {
          return Promise.reject(new Error(res.statusText));
        }
        return res.json();
      })
      .then((res) => {
        const newRooms = unionBy(rooms, res, '_id');
        setRooms(newRooms);
      });
    return () => abortController.abort();
  }, [page]);
  useEffect(() => {
    dispatch(setHelmet({ title: t('group_chat') }));
    const scrollLoadMoreRoom = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPage(page + 1);
      }
    };
    window.addEventListener('scroll', scrollLoadMoreRoom);
    return () => window.removeEventListener('scroll', scrollLoadMoreRoom);
  });
  useEffect(() => {
    const abortController = new AbortController();
    if (!!searchValue) {
      fetch(ROOM_ENDPOINT.FIND_CHAT_ROOM + searchValue, { signal: abortController.signal })
        .then((res) => {
          if (res.status >= 400) {
            return Promise.reject(new Error(res.statusText));
          }
          return res.json();
        })
        .then((res) => {
          setOptionsSearch(res);
        });
      return () => abortController.abort();
    } else {
      setOptionsSearch([]);
    }
  }, [searchValue]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    socket.on(CHAT_CHANNELS.REQUEST_UPDATE_CHATROOM, () => {
      timer = setTimeout(() => {
        fetch(ROOM_ENDPOINT.FRESH_LIST_CHAT_ROOM_PER_PAGE + page)
          .then((res) => {
            if (res.status >= 400) {
              return Promise.reject(new Error(res.statusText));
            }
            return res.json();
          })
          .then((res) => {
            setRooms(res);
          });
      }, 1000);
    });
    return () => {
      socket.off(CHAT_CHANNELS.REQUEST_UPDATE_CHATROOM);
      clearTimeout(timer);
    };
  }, []);
  return (
    <TBox>
      <TGrid container alignItems="center">
        <TGrid item xs={12} md={4} paddingright={1} marginY={2}>
          <TButton
            variant="contained"
            width="100%"
            height={6}
            onClick={() => {
              if (currentUser) {
                setOpenCreateRoom(true);
                setUpdateData(undefined);
              } else {
                dispatch(setAlert({ title: t('error'), message: t('you_have_to_login_first'), type: 'error' }));
              }
            }}
          >
            <AddIcon />
            <TTypography variant="body1" marginLeft={1} marginY={2}>
              {t('add_room')}
            </TTypography>
          </TButton>
        </TGrid>
        <TGrid item xs={12} md={8}>
          <TSearch options={optionsSearch} width="100%" onChangeValue={(value) => setSearchValue(value)} />
        </TGrid>
      </TGrid>
      <TGrid container marginY={2}>
        {rooms.map((room, index) => (
          <TRoomItem key={index} {...room} onEdit={(room) => setUpdateData(room)} />
        ))}
      </TGrid>
      <TCreateChatRoom
        title={t('we_will_not_save_chat_history')}
        open={openCreateRoom || !!updateData}
        onClose={() => {
          setOpenCreateRoom(false);
          setUpdateData(undefined);
        }}
        updateData={updateData}
      />
    </TBox>
  );
};
export default TChatRooms;
