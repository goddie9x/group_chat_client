import React, { memo, useState } from 'react';
import i18n from 'i18n';
import { InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';

import SettingsIcon from '@mui/icons-material/Settings';

import { useDispatch, useSelector } from 'react-redux';

import { Language } from 'constants/enum/language';
import { setLanguage, setMusicOn, setParticlesMode } from 'store/slices/common';

import { RootState } from 'store';

import MenuItem from '@mui/material/MenuItem';
import TSwitchDarkMode from 'components/switchDarkMode';
import TFormControl from 'components/formControl';
import TRightModal from 'components/rightModal';
import TBox from 'components/box';
import TTooltip from 'components/toolTip';
import TIconButton from 'components/iconButton';
import TTypography from 'components/typography';
import { TBoxProps } from 'components/box/box.styled';
import TSwitch from 'components/switch';
import { THeaderSettingMusicWrapper } from './header.styled';

const THeaderSetting = (props: TBoxProps) => {
  const [openSetting, setOpenSetting] = useState(false);
  const isParticlesOn = useSelector((state: RootState) => state.common.isParticlesOn);
  const language = useSelector((state: RootState) => state.common.language);
  const musicOn = useSelector((state: RootState) => state.common.musicOn);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const openSettingModal = () => {
    setOpenSetting(true);
  };

  const closeSettingModal = () => {
    setOpenSetting(false);
  };

  const handleChangeLanguage = (event: SelectChangeEvent<string>) => {
    const lang = event.target.value as Language;

    i18n.changeLanguage(lang);
    dispatch(setLanguage(lang));
  };

  return (
    <TBox {...props}>
      <TTooltip title={t('settings')} onClick={openSettingModal}>
        <TIconButton width={6} height={6} shape="curved" aria-label="account of current user" aria-haspopup="true">
          <SettingsIcon />
        </TIconButton>
      </TTooltip>
      <TRightModal open={openSetting} onClose={closeSettingModal} title={t('settings')}>
        <>
          <TBox display="flex" height={50} alignItems="center" marginbottom={2}>
            <TTypography variant="body1" color="textPrimary">
              {t('dark_mode')}
            </TTypography>
            <TSwitchDarkMode />
          </TBox>
          <TFormControl height={5} marginbottom={4}>
            <InputLabel id="select-language">{t('language')}</InputLabel>
            <Select
              labelId="select-language"
              id="select-language"
              value={language}
              label="Language"
              onChange={handleChangeLanguage}
            >
              <MenuItem value={Language.EN_US}>English</MenuItem>
              <MenuItem value={Language.VI_VN}>Việt Nam</MenuItem>
            </Select>
          </TFormControl>
          <TBox display="flex" height={50} alignItems="center" marginbottom={2}>
            <TTypography variant="body1" color="textPrimary">
              {t('effect')}
            </TTypography>
            <TSwitch
              checked={isParticlesOn}
              onChange={() => {
                dispatch(setParticlesMode(!isParticlesOn));
              }}
            />
          </TBox>
          <TBox display="flex" height={50} alignItems="center" marginbottom={2}>
            <TTypography variant="body1" color="textPrimary">
              {t('music')}
            </TTypography>
            <TSwitch
              checked={musicOn}
              onChange={() => {
                dispatch(setMusicOn(!musicOn));
              }}
            />
          </TBox>
          <THeaderSettingMusicWrapper height={380}>
            {musicOn && (
              <iframe
                src="https://www.nhaccuatui.com/lh/auto/ZfAokcm4aVPO"
                width="335"
                height="380"
                frameBorder="0"
                allowFullScreen
                allow="autoplay"
                loading="lazy"
              />
            )}
          </THeaderSettingMusicWrapper>
        </>
      </TRightModal>
    </TBox>
  );
};

export default memo(THeaderSetting);
