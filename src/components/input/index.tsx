import React, { memo } from 'react';

import TInputStyled, { TInputProps } from './input.styled';

const TInput = (props: TInputProps) => {
  return <TInputStyled variant="outlined" {...props} />;
};

export default memo(TInput);
