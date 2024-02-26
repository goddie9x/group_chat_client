import { IconButton, Paper, styled } from "@mui/material";

export const TModalWrapper = styled(Paper)<{ width?: number| string}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
  padding: ${({ theme }) => `${theme.spacing(5)}  ${theme.spacing(4)}`};
  min-width: ${({ theme }) => theme.spacing(30)};
  width: ${({ width, theme }) => width && (typeof width === 'string' ? width : theme.spacing(width))|| 'auto'};
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: none;
`;

export const TModalCloseButton = styled(IconButton)`
  position: absolute;
  top: ${({ theme }) => theme.spacing(1.5)};
  right: ${({ theme }) => theme.spacing(1.5)};
  background-color: transparent;
`;
