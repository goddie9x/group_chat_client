import React,{memo} from 'react';
import { useTranslation } from 'react-i18next';

import TGrid from 'components/grid';
import { TFooterMainStyled } from './footer.styled';
import Logo from 'assets/images/T_logo.png';
import TImage from 'components/image';
import TListColumnGrid, { TListColumnGridProps } from 'components/listColumnGrid';
import TTypography from 'components/typography';

export type TFooterMainProps = Pick<TListColumnGridProps, 'data'>;

const TFooterMain = ({data}: TFooterMainProps) => {
  const { t } = useTranslation();

  return (
    <TFooterMainStyled padding="40px 26px" container alignItems="center">
      <TGrid item xs={12} md={6} textalign="center">
        <TImage src={Logo} borderradius={50}  objectFit="cover"  height={75} marginbottom={10} />
        <TTypography variant="h5" marginbottom={4}>
          {t('main_quote')}
        </TTypography>
      </TGrid>
      <TGrid item xs={12} md={6}>
        <TListColumnGrid data={data} />
      </TGrid>
    </TFooterMainStyled>
  );
};

export default memo(TFooterMain);
