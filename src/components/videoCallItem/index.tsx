import React, { LegacyRef, forwardRef } from 'react';

import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import Tooltip from '@mui/material/Tooltip';
import TBox from 'components/box';

import { TStyledVideo, TVideoCallItemProps } from './videoItem.styled';
import { useTranslation } from 'react-i18next';
import TTypography from 'components/typography';

const TVideoCallItem = forwardRef(
  (
    {
      isTurnOnCamera,
      isTurnOnMicrophone,
      canToggleMedia,
      onToggleCamera,
      onToggleMicrophone,
      ...props
    }: TVideoCallItemProps,
    ref: LegacyRef<HTMLVideoElement>,
  ) => {
    const { t } = useTranslation();
    return (
      <TBox position="relative">
        <TStyledVideo {...props} playsInline autoPlay ref={ref} />
        <TBox position="absolute" top={0.3} left="50%" transform='translateX(-50%)'>
          <TTypography>{props.title}</TTypography>
        </TBox>

        <TBox display="flex" position="absolute" bottom={0.3} left="50%" transform='translateX(-50%)'>
          <Tooltip
            title={t(isTurnOnCamera ? 'turn_off_target' : 'turn_on_target', { target: t('camera') }) || ''}
            onClick={() => canToggleMedia && onToggleCamera?.(isTurnOnCamera)}
          >
            <IconButton
              color={isTurnOnCamera ? 'primary' : 'error'}
              aria-label={t(isTurnOnCamera ? 'turn_off_target' : 'turn_on_target', { target: t('camera') })}
            >
              {isTurnOnCamera ? <PhotoCameraIcon /> : <NoPhotographyIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip
            title={t(isTurnOnMicrophone ? 'turn_off_target' : 'turn_on_target', { target: t('microphone') }) || ''}
            onClick={() => canToggleMedia && onToggleMicrophone?.(isTurnOnMicrophone)}
          >
            <IconButton
              color={isTurnOnMicrophone ? 'primary' : 'error'}
              aria-label={t(isTurnOnCamera ? 'turn_off_target' : 'turn_on_target', { target: t('microphone') }) || ''}
            >
              {isTurnOnMicrophone ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
          </Tooltip>
        </TBox>
      </TBox>
    );
  },
);

TVideoCallItem.displayName = 'TVideoCallItem';
export default TVideoCallItem;
