import React from 'react';

import TTypographyStyled, { TTypographyProps } from './typography.styled';

const TTypography = (props: TTypographyProps) => {
  return <TTypographyStyled {...props} />;
};

export default TTypography;
