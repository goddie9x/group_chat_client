import { styled } from '@mui/material';

import TBox from 'components/box';
import TGrid from 'components/grid';
import TInput from 'components/input';

export const TSearchInput = styled(TInput)`
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const TSearchResults = styled(TBox)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  overflow: auto;
  width: 100%;
`;
export const TSearchResult = styled(TGrid)`
  :hover {
    border-radius: ${({ theme }) => theme.spacing(0.6)};
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
`;
export default TSearchResults;
