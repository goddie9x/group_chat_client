import { styled } from '@mui/material';
import TBox from 'components/box';

const TNavItemStyled = styled(TBox)<{ active: boolean, hasChild?: boolean, firstNav?: boolean }>`
  ${({ active, theme }) => {
    if (active) {
      return `border-bottom: 2px solid ${theme.palette.primary.main}`;
    }
  }};
  ${({ hasChild, firstNav, theme }) => {
    if (hasChild) {
      return `::after{
        content: '';
        position: absolute;
        top:50%;
        right: 2px;
        width: 0; 
        height: 0; 
        ${firstNav?`border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid ${theme.palette.primary.main};`:`border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid ${theme.palette.primary.main};`}
      }`;
    }
  }}
  &:hover {
    & > .MuiBox-root {
      display: block;
    }
    text-decoration: none;
    border-bottom: 2px solid ${({ theme }) => theme.palette.secondary.main};
    transition: border-bottom 0.2s ease-in-out;
  }
`;

const TNavItemChildrenStyled = styled(TBox)`
  display: none;
  width: max-content;
  padding: ${({ theme }) => theme.spacing(0.25)};
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

const TNavItemChildrenVeriticalStyled = styled(TBox)`
  display: none;
  width: max-content;
  padding: ${({ theme }) => theme.spacing(0.25)};
  padding-left: ${({ theme }) => theme.spacing(0.25)};
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid ${({ theme }) => theme.palette.divider};
`;

export { TNavItemStyled, TNavItemChildrenStyled, TNavItemChildrenVeriticalStyled };
