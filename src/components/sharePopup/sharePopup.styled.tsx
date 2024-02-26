import { styled } from '@mui/material';

import TButton from 'components/button';
import TFloating from 'components/floating';

export const TMinmalButton = styled(TButton)<{ isMinimal: boolean }>`
  ${({ isMinimal }) => isMinimal && 'transform: rotate(180deg);'}
`;

const TSharePopupWrapper = styled(TFloating)<{ isMinimal: boolean }>`
  transition: transform 0.3s ease-in-out;
  ${({ isMinimal }) => isMinimal && 'transform: translateX(72px);'}
`;

export default TSharePopupWrapper;
