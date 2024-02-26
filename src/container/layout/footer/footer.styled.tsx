import { styled } from '@mui/material';

import TGrid from 'components/grid';

export const TFooterHeadStyled = styled(TGrid)`
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
    background-color: ${({ theme }) => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.87)' : '#eee'};
    color: ${({ theme }) => theme.palette.primary.main};
`;

export const TFooterMainStyled = styled(TGrid)`
    min-height: 40vh;
    background-color: ${({ theme }) => (theme.palette.mode ==='dark')? '#1c2730e6': '#d8dce9b8'};
`;
