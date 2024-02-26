import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import TBox from 'components/box';
import TTypography from 'components/typography';
import TImage from 'components/image';

import { useDispatch } from 'react-redux';
import { setHelmet } from 'store/slices/helmet';

const TNoPermission = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHelmet({ title: t('you_do_not_have_permission') }));
  }, []);

  return (
    <TBox textalign="center">
      <TTypography variant="h1" textalign="center" marginbottom={4}>
        {t('you_do_not_have_permission')}
      </TTypography>
      <TImage src="/images/ha_gi_ai_biet_dau.png" />
    </TBox>
  );
};

export default TNoPermission;
