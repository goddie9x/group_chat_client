import React, { useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import TButton from 'components/button';
import TSharePopupWrapper, { TMinimalButton } from './sharePopup.styled';
import TTooltip from 'components/toolTip';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setAlert } from 'store/slices/alert';

const TSharePopup = () => {
  const [isMinimal, setisMinimal] = useState<boolean>(true);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const copyUrlToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    dispatch(setAlert({ title: t('success'), message: t('copied_share_link_to_clipboard'), type: 'success' }));
  };
  return (
    <TSharePopupWrapper top="45vh" right={1} isminimal={isMinimal.toString()}>
      <TTooltip title={t('share_this_page')}>
        <TMinimalButton
          paddingleft={0.2}
          minwidth={0}
          paddingright={0.2}
          variant="outlined"
          isminimal={isMinimal.toString()}
          onClick={() => setisMinimal(!isMinimal)}
        >
          <ArrowRightIcon />
        </TMinimalButton>
        <TButton variant="outlined" onClick={copyUrlToClipboard}>
          <ShareIcon />
        </TButton>
      </TTooltip>
    </TSharePopupWrapper>
  );
};

export default TSharePopup;
