import React, { useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import TButton from 'components/button';
import TSharePopupWrapper, { TMinmalButton } from './sharePopup.styled';
import TTooltip from 'components/toolTip';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setAlert } from 'store/slices/alert';

const TSharePopup = () => {
  const [isMinimal, setIsMinimal] = useState(true);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const copyUrlToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    dispatch(setAlert({ title: t('success'), message: t('copied_share_link_to_clipboard'), type: 'success' }));
  };
  return (
    <TSharePopupWrapper top="45vh" right={1} isMinimal={isMinimal}>
      <TTooltip title={t('share_this_page')}>
        <TMinmalButton
          paddingleft={0.2}
          minwidth={0}
          paddingright={0.2}
          variant="outlined"
          isMinimal={isMinimal}
          onClick={() => setIsMinimal(!isMinimal)}
        >
          <ArrowRightIcon />
        </TMinmalButton>
        <TButton variant="outlined" onClick={copyUrlToClipboard}>
          <ShareIcon />
        </TButton>
      </TTooltip>
    </TSharePopupWrapper>
  );
};

export default TSharePopup;
