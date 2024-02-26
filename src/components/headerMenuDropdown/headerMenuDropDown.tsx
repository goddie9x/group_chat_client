import {styled} from '@mui/material';

import TBox from 'components/box';

const THeaderMenuDropdownStyled = styled(TBox)<{forMobile?: boolean}>`
    display: ${({ forMobile }) => !!forMobile ? 'none' : 'flex'};
    @media (max-width: ${({ theme }) =>theme.breakpoints.values.md}px ) {
        ${({ forMobile }) => !!forMobile&&'display: flex'};
    }
`;

export default THeaderMenuDropdownStyled;