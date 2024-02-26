import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import { TFooterHeadStyled } from './footer.styled';
import TIconButton from 'components/iconButton';
import TGrid from 'components/grid';
import TTypography from 'components/typography';

export type socicalsUrl = {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  google?: string;
};

const TFooterHead = (socicalsUrl: socicalsUrl) => {
  const { t } = useTranslation();

  return (
    <TFooterHeadStyled paddingleft={3.25} paddingright={3.25} container padding={1} alignItems="center">
      <TGrid item xs={12} md={6}>
        <TTypography variant="h5">{t('get_connected_with_me_on_social_networks')}</TTypography>
      </TGrid>
      <TGrid item xs={12} md={6}>
        <TGrid container lineheight={3}>
          <TGrid item md={2} xs={4}>
            <TIconButton width={3} lineheight={0.75} height={3} background="#38262647">
              <a target="_blank" rel="noreferrer" href={socicalsUrl.facebook}>
                <FacebookIcon />
              </a>
            </TIconButton>
          </TGrid>
          <TGrid item md={2} xs={4}>
            <TIconButton width={3} lineheight={0.75}  height={3} background="#38262647">
              <a target="_blank" rel="noreferrer" href={socicalsUrl.twitter}>
                <TwitterIcon />
              </a>
            </TIconButton>
          </TGrid>
          <TGrid item md={2} xs={4}>
            <TIconButton width={3} lineheight={0.75}  height={3} background="#38262647">
              <a target="_blank" rel="noreferrer" href={socicalsUrl.google}>
                <GoogleIcon />
              </a>
            </TIconButton>
          </TGrid>
          <TGrid item md={2} xs={4}>
            <TIconButton width={3} lineheight={0.75}  height={3} background="#38262647">
              <a target="_blank" rel="noreferrer" href={socicalsUrl.instagram}>
                <InstagramIcon />
              </a>
            </TIconButton>
          </TGrid>
          <TGrid item md={2} xs={4}>
            <TIconButton width={3} lineheight={0.75}  height={3} background="#38262647">
              <a target="_blank" rel="noreferrer" href={socicalsUrl.linkedin}>
                <LinkedInIcon />
              </a>
            </TIconButton>
          </TGrid>
          <TGrid item md={2} xs={4}>
            <TIconButton width={3} lineheight={0.75}  height={3} background="#38262647">
              <a target="_blank" rel="noreferrer" href={socicalsUrl.github}>
                <GitHubIcon />
              </a>
            </TIconButton>
          </TGrid>
        </TGrid>
      </TGrid>
    </TFooterHeadStyled>
  );
};

export default memo(TFooterHead);