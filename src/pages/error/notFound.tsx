import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import TBox from 'components/box';
import TTypography from 'components/typography';
import TImageNotFound from 'assets/images/T_not_found.png';
import TImage from 'components/image';

import { setHelmet } from 'store/slices/helmet';

const TNotFound = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHelmet({ title: t('page_not_found') }));
  }, []);

  return (
    <TBox textalign="center">
      <TTypography variant="h3" lineheight={2.3} color="textSecondary">
        {t('page_not_found')}
      </TTypography>
      <TImage objectFit="cover"  src={TImageNotFound} />
    </TBox>
  );
};

export default TNotFound;
