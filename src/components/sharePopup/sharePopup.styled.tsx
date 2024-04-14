import { styled } from '@mui/material';

import TButton from 'components/button';
import TFloating from 'components/floating';

export const TMinmalButton = styled(TButton)<{ isinimal: boolean|string }>`
  ${({ isinimal }) => isinimal=='true' && 'transform: rotate(180deg);'}
`;

const TSharePopupWrapper = styled(TFloating)<{ isinimal: boolean|string }>`
  transition: transform 0.3s ease-in-out;
  ${({ isinimal }) => isinimal=='true' && 'transform: translateX(72px);'}
`;

export default TSharePopupWrapper;
