import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import TBox from 'components/box';
import TTypography from 'components/typography';
import TFooterHead from './footerHead';
import TFooterMain from './footerMain';
import TSharePopup from 'components/sharePopup';

const TFooter = () => {
  const { t } = useTranslation();

  const socicalsUrl = {
    facebook: 'https://www.facebook.com/goddie9x/',
    instagram: 'https://www.instagram.com/goddie9x/',
    twitter: 'https://twitter.com/goddie9x',
    github: 'https://github.com/goddie9x/',
    linkedin: 'https://www.linkedin.com/in/ho%C3%A0ng-minh-t%C3%A2m-209236212/',
    google: 'mailto:hoangminhtam7991@gmail.com',
  };

  const footerGridColumnData = [
    {
      title: t('about'),
      column: [
        { label: t('about'), href: '/about' },
        { label: t('contact'), href: '/contact' },
      ],
    },
    {
      title: t('about'),
      column: [
        { label: t('about'), href: '/about' },
        { label: t('contact'), href: '/contact' },
      ],
    },
    {
      title: t('about'),
      column: [
        { label: t('about'), href: '/about' },
        { label: t('contact'), href: '/contact' },
      ],
    },
  ];

  return (
    <TBox height="max-content">
      <TSharePopup />
      <TFooterHead {...socicalsUrl} />
      <TFooterMain data={footerGridColumnData} />
      <TBox height={50} paddingleft={3.25} lineheight={50} paddingRight={3.25} background="#38262647">
        <TTypography variant="h6" textalign="center" lineheight={2.3} color="textSecondary">
          {t('copyright')}
        </TTypography>
      </TBox>
    </TBox>
  );
};

export default memo(TFooter);
