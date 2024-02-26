import React from 'react';

import { TGridProps } from 'components/grid/grid.styled';
import { TTypographyProps } from 'components/typography/typography.styled';
import TGrid from 'components/grid';
import TTypography from 'components/typography';
import TLink from 'components/link';

export type TColumnProps = {
  label: string;
  href?: string;
};

export type TListColumnGridProps = TGridProps & {
  data: Array<{ title: string; typeHead?: TTypographyProps; column: Array<TColumnProps>; typeColumn?: TTypographyProps }>;
};

const TListColumnGrid = ({ data, ...props }: TListColumnGridProps) => {
  const responsiveColumnLG = 12 / data.length;

  return (
    <TGrid container display="flex" {...props}>
      {data.map(({ title, typeHead, column, typeColumn }, index) => {
        return (
          <TGrid item key={index} {...props} xs={6} md={12}  lg={responsiveColumnLG}>
            <TTypography variant="h5" {...typeHead}>
              {title}
            </TTypography>
            {column.map(({ label, href }, index2) => {
              return (
                <TTypography key={index2} variant="body1" {...typeColumn}>
                  {href ? <TLink href={href}>{label}</TLink> : label}
                </TTypography>
              );
            })}
          </TGrid>
        );
      })}
    </TGrid>
  );
};

export default TListColumnGrid;
