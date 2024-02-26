import React from 'react';
import TFormControlStyled, { TFormControlProps } from './formControl.styled';

const TFormControl = (props: TFormControlProps) => {
  return <TFormControlStyled {...props} />;
};

export default TFormControl;