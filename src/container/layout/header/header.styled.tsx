import { AppBar, styled } from '@mui/material';

import TBox from 'components/box';

const THeaderStyled = styled(AppBar)<{ zindex?: number }>`
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
  z-index: ${({ zindex }) => zindex};
`;

export const THeaderSettingMusicWrapper = styled(TBox)`
  iframe {
    border-radius: ${({ theme }) => theme.spacing(4)};
  }
`;

export default THeaderStyled;
