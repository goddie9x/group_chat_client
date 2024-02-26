import { TableCell,styled } from '@mui/material';

export const TStyledTableCell = styled(TableCell)<{ disabled?: boolean }>`
  opacity: ${({ disabled }) => disabled && 0.5};
  user-select: ${({ disabled }) => disabled && 'none'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
`;
