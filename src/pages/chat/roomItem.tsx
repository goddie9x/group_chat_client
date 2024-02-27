import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SettingsIcon from '@mui/icons-material/Settings';
import range from 'lodash/range';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import io from 'socket.io-client';

import TCard from 'components/card';
import { TRoomsProps } from './index';
import TGrid from 'components/grid';
import TImage from 'components/image';
import TBox from 'components/box';
import TButton from 'components/button';
import TTypography from 'components/typography';
import TLink from 'components/link';
import TTooltip from 'components/toolTip';
import TMenu from 'components/menu';
import { TCreateChatRoomSchema } from './create';
import TDefaultImage from 'assets/images/T_Default.png';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setAlert } from 'store/slices/alert';
import { setLoading } from 'store/slices/common';
import { CHAT_CHANNELS } from 'constants/socketChanel';

export type TRoomItemProps = TRoomsProps & {
  onEdit?: (room: TCreateChatRoomSchema) => void;
};

const socket = io(process.env.REACT_APP_API_URL+'');

const TRoomItem = ({ _id, topic, maximum, creater, tags, users, createdAt, onEdit }: TRoomItemProps) => {
  const [openSetting, setOpenSetting] = useState(false);

  const totalUsers = users.length;
  const slotRest = maximum - totalUsers;
  const genSlotRest = range(slotRest);
  const settingRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state: RootState) => state.auth.userData);
  const isCreater = creater.userId === currentUser?._id;

  const handleDeleteRoom = () => {
    dispatch(setLoading(true));
    fetch(process.env.REACT_APP_API_URL+'/chat-room/delete/' + _id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenUser: localStorage.getItem('tokenUser') }),
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(() => {
        dispatch(setLoading(false));
        dispatch(
          setAlert({
            message: t('delete_group_successfully'),
            type: 'success',
            title: t('success'),
          }),
        );
        socket.emit(CHAT_CHANNELS.NOTICE_CHATROOM_UPDATED_STATUS,'delete');
      })
      .catch(() => {
        dispatch(setLoading(false));
        dispatch(
          setAlert({
            message: t('delete_group_failed'),
            type: 'error',
            title: t('error'),
          }),
        );
      });
  };
  return (
    <TGrid item xs={12} md={6} lg={4} padding={1}>
      <TCard>
        <TGrid container alignItems="center" padding={1}>
          <TGrid item xs={2}>
            <TImage src={creater.avatar || TDefaultImage} width={40} height={40} borderradius={1000} />
          </TGrid>
          <TGrid item xs={8} overflow="hidden">
            {tags && (
              <TBox>
                {tags.map((tag) => (
                  <TButton padding={0.2} marginright={1} key={tag} variant="contained" color="primary" size="small">
                    {tag}
                  </TButton>
                ))}
              </TBox>
            )}
            <TBox>
              <TTypography variant="h6">{topic}</TTypography>
            </TBox>
          </TGrid>
          <TGrid item xs={2}>
            <TTooltip ref={settingRef} title={t('setting')} onClick={() => setOpenSetting(!openSetting)}>
              <TButton>
                <SettingsIcon />
              </TButton>
            </TTooltip>
            <TMenu anchorEl={settingRef.current} open={openSetting} onClose={() => setOpenSetting(false)}>
              <TBox textalign="center" paddingX={1}>
                <TTypography variant="body1" cursor="not-allowed" margin={1}>
                  {t('group_owner')}
                </TTypography>
                <TImage
                  src={creater.avatar || TDefaultImage}
                  width={50}
                  height={50}
                  borderradius={1000}
                  cursor="not-allowed"
                />
                <TTypography variant="body1" cursor="not-allowed" margin={1}>
                  {creater.username}
                </TTypography>
                {isCreater ? (
                  <TBox textalign='center' width="100%" marginY={1}>
                    <TButton
                      padding={0.5}
                      variant="outlined"
                      onClick={() => {
                        onEdit?.({ topic, maximum, tags });
                      }}
                      display="flex"
                      margin="auto"
                    >
                      <EditIcon />
                      <TTypography variant="body1" margin={1}>
                        {t('edit_this_group')}
                      </TTypography>
                    </TButton>
                  </TBox>
                ) : (
                  <TButton padding={0.5} variant="outlined">
                    <FlagCircleIcon />
                    <TTypography variant="body1" margin={1}>
                      {t('report_this_group')}
                    </TTypography>
                  </TButton>
                )}
                {(isCreater || (currentUser && currentUser.role < 2)) && (
                  <TBox textalign='center' width="100%" marginY={1}>
                    <TButton
                      padding={0.5}
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteRoom()}
                      display="flex"
                      margin="auto"
                    >
                      <DeleteForeverIcon />
                      <TTypography variant="body1" margin={1}>
                        {t('delete_this_group')}
                      </TTypography>
                    </TButton>
                  </TBox>
                )}
                <TTypography variant="body1" margin={1}>
                  {t('create_at')}
                </TTypography>
                <TTypography variant="body1" margin={1}>
                  {moment(createdAt).format('DD/MM/YYYY hh:mm A')}
                </TTypography>
              </TBox>
            </TMenu>
          </TGrid>
        </TGrid>
        <TGrid container height={30} padding={1}>
          {users.map((user, index) => (
            <TGrid item xs={4} md={3} padding={0.5} key={index}>
              <TTooltip title={user.username}>
                <TButton
                  padding={0}
                  variant="outlined"
                  borderradius={1000}
                  onClick={() => history.push('/user/profile/' + user.userId)}
                >
                  <TImage
                    src={user.avatar || TDefaultImage}
                    alt={user.username}
                    height={85}
                    width={85}
                    borderradius={1000}
                  />
                </TButton>
              </TTooltip>
            </TGrid>
          ))}
          {genSlotRest.map((_, index) => (
            <TGrid item xs={4} md={3} padding={0.5} key={index + totalUsers}>
              <TBox height={85} width={85} borderradius={1000} border="1px dashed #516369" cursor="not-allowed" />
            </TGrid>
          ))}
        </TGrid>
        {slotRest > 0 ? (
          !!currentUser ? (
            <TLink href={'/room-chat/' + _id} padding={0.5}>
              <TButton variant="outlined" color="primary" width="100%" height={6}>
                {t('join_and_chat_now')}
              </TButton>
            </TLink>
          ) : (
            <TButton
              variant="outlined"
              color="primary"
              width="100%"
              height={6}
              onClick={() => dispatch(setAlert({ title: t('error'), message: t('you_have_to_login_first'), type: 'error' }))}
            >
              {t('join_and_chat_now')}
            </TButton>
          )
        ) : (
          <TButton variant="outlined" disabled color="error" width="100%" height={6}>
            {t('this_group_is_full')}
          </TButton>
        )}
      </TCard>
    </TGrid>
  );
};

export default TRoomItem;
