import { Box, styled } from '@mui/material';
import { BoxProps } from '@mui/material';

export type TBoxProps = BoxProps & {
  maxwidth?: string | number;
  minwidth?: string | number;
  maxheight?: string | number;
  minheight?: string | number;
  background?: string;
  margintop?: number | string;
  marginright?: number | string;
  marginbottom?: number | string;
  marginleft?: number | string;
  paddingtop?: number | string;
  paddingright?: number | string;
  paddingbottom?: number | string;
  paddingleft?: number | string;
  lineheight?: number;
  textalign?: 'left' | 'center' | 'right';
  zindex?: number;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowx?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowy?: 'visible' | 'hidden' | 'scroll' | 'auto';
  borderradius?: number | string;
  transition?: string;
  cursor?:
    | 'pointer'
    | 'default'
    | 'move'
    | 'text'
    | 'wait'
    | 'help'
    | 'pointer'
    | 'progress'
    | 'not-allowed'
    | 'no-drop'
    | 'grab'
    | 'grabbing';
  animation?: string;
};

const TBoxStyled = styled(Box)<TBoxProps>`
  background: ${({ background }) => background};
  margin-top: ${({ margintop, theme }) => (typeof margintop === 'number' ? theme.spacing(margintop) : margintop)};
  margin-right: ${({ marginright, theme }) => (typeof marginright === 'number' ? theme.spacing(marginright) : marginright)};
  max-width: ${({ maxwidth, theme }) => (typeof maxwidth === 'number' ? theme.spacing(maxwidth) : maxwidth)};
  min-width: ${({ minwidth, theme }) => (typeof minwidth === 'number' ? theme.spacing(minwidth) : minwidth)};
  max-height: ${({ maxheight, theme }) => (typeof maxheight === 'number' ? theme.spacing(maxheight) : maxheight)};
  min-height: ${({ minheight, theme }) => (typeof minheight === 'number' ? theme.spacing(minheight) : minheight)};
  margin-bottom: ${({ marginbottom, theme }) =>
    typeof marginbottom === 'number' ? theme.spacing(marginbottom) : marginbottom};
  margin-left: ${({ marginleft, theme }) => (typeof marginleft === 'number' ? theme.spacing(marginleft) : marginleft)};
  padding-top: ${({ paddingtop, theme }) => (typeof paddingtop === 'number' ? theme.spacing(paddingtop) : paddingtop)};
  padding-right: ${({ paddingright, theme }) =>
    typeof paddingright === 'number' ? theme.spacing(paddingright) : paddingright};
  padding-bottom: ${({ paddingbottom, theme }) =>
    typeof paddingbottom === 'number' ? theme.spacing(paddingbottom) : paddingbottom};
  padding-left: ${({ paddingleft, theme }) => (typeof paddingleft === 'number' ? theme.spacing(paddingleft) : paddingleft)};
  margin-bottom: ${({ marginbottom, theme }) =>
    marginbottom && typeof marginbottom === 'number' ? theme.spacing(marginbottom) : marginbottom};
  line-height: ${({ lineheight }) => lineheight};
  text-align: ${({ textalign }) => textalign};
  z-index: ${({ zindex }) => zindex};
  border-radius: ${({ borderradius, theme }) =>
    borderradius && (typeof borderradius === 'string' ? borderradius : theme.spacing(borderradius))};
  transition: ${({ transition }) => transition};
  overflow: ${({ overflow }) => overflow};
  overflow-x: ${({ overflowx }) => overflowx};
  overflow-y: ${({ overflowy }) => overflowy};
  cursor: ${({ cursor }) => cursor};
  animation: ${({ animation }) => animation};
  *::-webkit-scrollbar {
    width: ${({ theme }) => theme.spacing(0.5)};
  }
  *::-webkit-scrollbar-track {
    background-color: transparent;
  }
  *::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: #d6dee1;
    border-radius: 20px;
    background-clip: content-box;
  }
  *::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }
`;

export default TBoxStyled;
