import { styled } from '@mui/material';

import TBox from 'components/box';

const TRoomWrapper = styled(TBox)`
  border-radius: ${({ theme }) => theme.spacing(1)};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  scroll-behavior: smooth;
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 
    40% {transform: translateY(-8px);} 
    60% {transform: translateY(-6px);} 
 } 
`;

export default TRoomWrapper;
