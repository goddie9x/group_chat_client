import { styled } from '@mui/material';

import TBox from 'components/box';

const TGradientWrapperStyled = styled(TBox)`
  background: linear-gradient(45deg, #f17c58, #e94584, #24aadb, #27dbb1, #ffdc18, #ff3706);
  background-size: 600% 100%;
  animation: gradient 16s linear infinite;
  animation-direction: alternate;
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default TGradientWrapperStyled;
