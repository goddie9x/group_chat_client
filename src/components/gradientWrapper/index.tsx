import React from 'react';

import { TBoxProps } from 'components/box/box.styled';
import TGradientWrapperStyled from './gradientWrapper.styled';

const TGradientWrapper = (props: TBoxProps) => {
  return <TGradientWrapperStyled {...props} />;
};

export default TGradientWrapper;
