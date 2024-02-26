import { styled } from '@mui/material';

import TPaper from 'components/paper';
import TBox from 'components/box';
import { TPaperProps } from 'components/paper/paper.styled';

export type TRightModalProps = TPaperProps & {
  onClose?: (event: MouseEvent | React.MouseEvent<HTMLElement>, reason: string) => void;
  open?: boolean;
  title?: string;
};

export const TRightModalBackdrop = styled(TBox)<{ open?: boolean;}>`
  position: fixed;
  ${({ open }) => (open ? 'top: 0;bottom: 0;right: 0; left:0' : 'right: -100vw; left:0')};
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1) 1ms;
  overflow: hidden;
`;

export const TRightModalWrapper = styled(TPaper)<{ open?: boolean }>`
  ${({ open }) => (open ? 'right: 0;': 'right: -100vw;')};
  padding: ${({ theme }) => `${theme.spacing(1)}  ${theme.spacing(1)}`};
  ${({open})=>open&&'animation: slidein 0.5s cubic-bezier(0.4, 0, 0.2, 1) 1ms;'}
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 1ms;
  @keyframes slidein {
    from {
      right: -100%;
      opacity: 0;
    }
    to {
      right: 0;
      opacity: 1;
    }
  }
`;