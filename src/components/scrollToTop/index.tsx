import React from 'react';
import { useTranslation } from 'react-i18next';

import ArrowUp from 'components/icon/arrowUp';
import { TFloatingProps } from 'components/floating/floating.styled';
import TFloating from 'components/floating';
import TIconButton from 'components/iconButton';
import TTooltip from 'components/toolTip';

const TScrollToTop = (props : TFloatingProps) => {
  const { t } = useTranslation();

  const clickScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <TFloating {...props} onClick={clickScrollTop}>
      <TTooltip title={t('scroll_to_top')}>
        <TIconButton>
          <ArrowUp fontSize="large" />
        </TIconButton>
      </TTooltip>
    </TFloating>
  );
};

export default TScrollToTop;
