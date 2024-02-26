import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from 'moment';

import TBox from 'components/box';
import TGrid from 'components/grid';
import TTypography from 'components/typography';
import TDefaultImage from 'assets/images/T_Default.png';
import TMessageWrapper, { TAvatarMessage } from './message.styled';
import TDivider from 'components/divider';

export type TMessageProps = {
  _id?: string;
  userId?: string;
  username?: string;
  avatar?: string;
  message?: string;
  time?: string;
  isCurrentUser?: boolean;
  specialMessgage?: string;
  hideAvatar?: boolean;
};
const TMessage = ({ username, avatar, message, time, hideAvatar, isCurrentUser, specialMessgage }: TMessageProps) => {
  const flexDirection = isCurrentUser ? 'row-reverse' : 'row';
  return !!specialMessgage ? (
    <TBox textalign="center" marginY={2}>
      <TTypography variant="h6" color="#b2eb05b5">
        {specialMessgage}
      </TTypography>
    </TBox>
  ) : (
    <TGrid container flexDirection={flexDirection} alignItems="center" marginY={0.5} marginX={0}>
      <TGrid container display="flex" flexDirection={flexDirection}>
        <TGrid item xs={1} display="flex" flexDirection={flexDirection}>
          {hideAvatar ? null : <TAvatarMessage src={avatar || TDefaultImage} borderradius={1000} />}
        </TGrid>
        <TGrid item xs={10} display="flex" flexDirection={flexDirection}>
          <TMessageWrapper padding={1} paddingTop={0} width="max-content">
            <TBox
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexDirection={flexDirection}
              flexWrap="wrap"
              width="100%"
            >
              <TTypography variant="body1" color={isCurrentUser ? 'secondary' : 'primary'}>
                {username}
              </TTypography>
              <TBox display="flex" marginX={1} alignItems="center" flexDirection={isCurrentUser ? 'row' : 'row-reverse'} color={isCurrentUser ? 'secondary' : 'primary'}>
                <AccessTimeIcon color={isCurrentUser ? 'secondary' : 'primary'} />
                <TTypography marginLeft={1} variant="body2" marginX={1}>
                  {moment(time).format('HH:mm A DD/MM/yyyy')}
                </TTypography>
              </TBox>
            </TBox>
            <TDivider margintop={0.5} marginbottom={1} />
            {message?.split('\n').map((item, index) => (
              <TTypography key={index} dangerouslySetInnerHTML={{__html: item}} textAlign={isCurrentUser ? 'right' : 'left'}/>
            ))}
          </TMessageWrapper>
        </TGrid>
      </TGrid>
    </TGrid>
  );
};
export default TMessage;
