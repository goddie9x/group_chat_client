import React from 'react';

import TBox from 'components/box';
import TTypography from 'components/typography';
import {TBoxProps} from 'components/box/box.styled';
import TGrid from 'components/grid';
import { TGridProps } from 'components/grid/grid.styled';
 
export type TGridCardProps<T> = TGridProps &
  TBoxProps & {
    title: string;
    subtitle?: string;
    data: Array<T>;
    renderItem: (item: T) => React.ReactNode;
  };

const TGridCard = ({ title, subtitle, data, renderItem, xs, sm, md, lg, xl, spacing, ...props }: TGridCardProps<any>) => {
  return (
    <TBox {...props}>
      <TTypography variant="h2" textalign="center">
        {title}
      </TTypography>
      {subtitle && (
        <TTypography variant="h4" textalign="center" marginbottom={3}>
          {subtitle}
        </TTypography>
      )}
      <TGrid container spacing={spacing || 2}>
        {data.map((item, index) => (
          <TGrid item key={index} xs={xs ? xs : 12} sm={sm ? sm : 6} md={md ? md : 4} lg={lg ? lg : 3} xl={xl ? xl : 2}>
            {renderItem(item)}
          </TGrid>
        ))}
      </TGrid>
    </TBox>
  );
};

export default TGridCard;
