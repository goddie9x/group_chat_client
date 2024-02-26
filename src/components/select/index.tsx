import React from 'react';

import TFormControl from 'components/formControl';
import TSelectStyled, { TSelectProps } from './select.styled';
import { InputLabel } from '@mui/material';
import TTypography from 'components/typography';

const TSelect = ({ label, labelId, formControlProps, helperText, ...props }: TSelectProps) => {
  return (
    <TFormControl {...formControlProps}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <TSelectStyled paddingright={3} labelId={labelId} {...props} />
      {helperText && <TTypography variant="body1">{helperText}</TTypography>}
    </TFormControl>
  );
};

export default TSelect;
