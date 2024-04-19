import { styled } from '@mui/material';

import TBox from 'components/box';
import TImage from 'components/image';

const TMessageWrapper = styled(TBox)`
  min-width: ${({ theme }) => theme.spacing(25)};
  border-radius: ${({ theme }) => theme.spacing(0.5)};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  background-color: ${({ theme }) => theme.palette.background.paper};
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
`;
export const TAvatarMessage = styled(TImage)`
  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    width: ${({ theme }) => theme.spacing(7)};
    height: ${({ theme }) => theme.spacing(7)};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    width: ${({ theme }) => theme.spacing(4)};
    height: ${({ theme }) => theme.spacing(4)};
  }
  aspect-ratio: 1;
  object-fit: contain;
`;
export default TMessageWrapper;
