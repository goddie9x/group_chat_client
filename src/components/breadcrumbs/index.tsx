import React from 'react';
import { BreadcrumbsProps } from '@mui/material';

import TBreadcrumbsStyled from './breadcrumbs.styled';
import TLink from 'components/link';
import { useTranslation } from 'react-i18next';

export type TBreadcrumbsProps = BreadcrumbsProps &{
  width?: number | string;
  minwidth?: number;
  height?: number | string;
  minHeight?: number;
  margin?: string | number;
  padding?: string | number;
  margintop?: number;
  marginbottom?: number;
  paddingTop?: number;
  paddingBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  paddingleft?: number;
  paddingright?: number;
  items: Array<{ href: string; label: string }>;
};

const TBreadcrumbs = ({ items, ...props }: TBreadcrumbsProps) => {
  const {t} = useTranslation();

  return (
    <TBreadcrumbsStyled arial-label="breadcrumbs" margin='32px 0' {...props}>
      {items.map((item, index) => (
        <TLink key={index} href={item.href}>
          {t(item.label)}
        </TLink>
      ))}
    </TBreadcrumbsStyled>
  );
};

export default TBreadcrumbs;
