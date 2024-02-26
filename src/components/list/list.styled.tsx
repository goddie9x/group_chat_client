import { Box, styled } from '@mui/material';

export const TListStyled = styled(Box)`
  list-style: none;
  counter-reset: orderedlist;
  padding-left: 0;
`;

export const TListItemStyled = styled(Box)`
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
  &:before {
    height: 1.25rem;
    width: 1.25rem;
    line-height: 1.25rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    color: ${({ theme }) => theme.palette.primary.contrastText};
    font-size: ${({ theme }) => theme.spacing(1.5)};
    background-color: ${({ theme }) => theme.palette.primary.dark};
    counter-increment: orderedlist;
    content: counter(orderedlist);
    margin-right: ${({ theme }) => theme.spacing(2)};
  }
`;
