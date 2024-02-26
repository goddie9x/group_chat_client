import { styled } from '@mui/material';

import TBox from 'components/box';

const TStyledCard = styled(TBox)`
  padding: ${({ theme }) => theme.spacing(0.5)};
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
  background: ${({ background, theme }) => (background ? background : theme.palette.background.paper)};
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  :hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 54px 55px, rgba(0, 0, 0, 0.3) 0px -12px 30px, rgba(0, 0, 0, 0.3) 0px 4px 6px,
      rgba(0, 0, 0, 0.3) 0px 12px 13px, rgba(0, 0, 0, 0.2) 0px -3px 5px;
    cursor: pointer;
    transform: scale(1.05);
  }
`;

export default TStyledCard;
