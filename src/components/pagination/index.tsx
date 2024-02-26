import React from 'react';
import Pagination, { PaginationProps } from '@mui/material/Pagination';

import TBox from 'components/box';
import { TBoxProps } from 'components/box/box.styled';

export type TPaginationProps = PaginationProps & {
  containerProps?: TBoxProps;
};

const TPagination = ({ containerProps, ...props }: TPaginationProps) => {
  return (
    <TBox {...containerProps}>
      <Pagination variant="outlined" shape="rounded" {...props} />
    </TBox>
  );
};

export default TPagination;
