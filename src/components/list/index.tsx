import { BoxProps } from '@mui/material';
import React, { ReactNode } from 'react';

import { TListStyled, TListItemStyled } from './list.styled';

export type TListProps = BoxProps & {
  children: ReactNode;
};

export const TListItem = ({children,...props }: TListProps) => {
  return (
    <TListItemStyled {...props} component="li">
      {children}
    </TListItemStyled>
  );
};

const TList = ({ children,...props }: TListProps) => {
  return <TListStyled component="ul" {...props}>{children}</TListStyled>;
};

export default TList;
