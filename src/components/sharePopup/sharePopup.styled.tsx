import { styled } from '@mui/material';

import TButton from 'components/button';
import TFloating from 'components/floating';

export const TMinimalButton = styled(TButton)<{ isminimal: boolean|string }>`
  ${({ isminimal }) => isminimal=='true' && 'transform: rotate(180deg);'}
`;

const TSharePopupWrapper = styled(TFloating)<{ isminimal: boolean|string }>`
  transition: transform 0.3s ease-in-out;
  ${({ isminimal }) => isminimal=='true' && 'transform: translateX(72px);'}
`;

export default TSharePopupWrapper;
