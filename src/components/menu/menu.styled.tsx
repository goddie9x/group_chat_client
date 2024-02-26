import { Menu, MenuProps, styled } from '@mui/material';

export type TMenuProps = MenuProps & {
  width?: string | number;
  minwidth?: string | number;
  maxwidth?: string | number;
  height?: string | number;
  minheight?: string | number;
  maxheight?: string | number;
  padding?: string | number;
  paddingTop?: string | number;
  paddingBottom?: string | number;
  paddingleft?: string | number;
  paddingright?: string | number;
  margin?: string | number;
  margintop?: string | number;
  marginbottom?: string | number;
  marginLeft?: string | number;
  marginright?: string | number;
  borderradius?: string | number;
  boxShadow?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  fontFamily?: string;
  textalign?: string;
  textTransform?: string;
  textDecoration?: string;
  textOverflow?: string;
  textShadow?: string;
  textJustify?: string;
  zindex?: string | number;
  overflow?: string;
};

const TMenuStyled = styled(Menu)<TMenuProps>`
  width: ${({ width, theme }) => width && (typeof width === 'string' ? width : theme.spacing(width))};
  min-width: ${({ minwidth, theme }) => minwidth && (typeof minwidth === 'string' ? minwidth : theme.spacing(minwidth))};
  max-width: ${({ maxwidth, theme }) => maxwidth && (typeof maxwidth === 'string' ? maxwidth : theme.spacing(maxwidth))};
  height: ${({ height, theme }) => height && (typeof height === 'string' ? height : theme.spacing(height))};
  min-height: ${({ minheight, theme }) =>
    minheight && (typeof minheight === 'string' ? minheight : theme.spacing(minheight))};
  max-height: ${({ maxheight, theme }) =>
    maxheight && (typeof maxheight === 'string' ? maxheight : theme.spacing(maxheight))};
  padding: ${({ padding, theme }) => padding && (typeof padding === 'string' ? padding : theme.spacing(padding))};
  padding-top: ${({ paddingTop, theme }) =>
    paddingTop && (typeof paddingTop === 'string' ? paddingTop : theme.spacing(paddingTop))};
  padding-bottom: ${({ paddingBottom, theme }) =>
    paddingBottom && (typeof paddingBottom === 'string' ? paddingBottom : theme.spacing(paddingBottom))};
  padding-left: ${({ paddingleft, theme }) =>
    paddingleft && (typeof paddingleft === 'string' ? paddingleft : theme.spacing(paddingleft))};
  padding-right: ${({ paddingright, theme }) =>
    paddingright && (typeof paddingright === 'string' ? paddingright : theme.spacing(paddingright))};
  margin: ${({ margin, theme }) => margin && (typeof margin === 'string' ? margin : theme.spacing(margin))};
  margin-top: ${({ margintop, theme }) =>
    margintop && (typeof margintop === 'string' ? margintop : theme.spacing(margintop))};
  margin-bottom: ${({ marginbottom, theme }) =>
    marginbottom && (typeof marginbottom === 'string' ? marginbottom : theme.spacing(marginbottom))};
  margin-left: ${({ marginLeft, theme }) =>
    marginLeft && (typeof marginLeft === 'string' ? marginLeft : theme.spacing(marginLeft))};
  margin-right: ${({ marginright, theme }) =>
    marginright && (typeof marginright === 'string' ? marginright : theme.spacing(marginright))};
  border-radius: ${({ borderradius, theme }) =>
    borderradius && (typeof borderradius === 'string' ? borderradius : theme.spacing(borderradius))};
  box-shadow: ${({ boxShadow }) => boxShadow && boxShadow};
  background-color: ${({ backgroundColor }) => backgroundColor && backgroundColor};
  color: ${({ color }) => color && color};
  font-size: ${({ fontSize, theme }) => fontSize && (typeof fontSize === 'string' ? fontSize : theme.spacing(fontSize))};
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight && (typeof fontWeight === 'string' ? fontWeight : theme.spacing(fontWeight))};
  font-family: ${({ fontFamily }) => fontFamily && fontFamily};
  text-align: ${({ textalign }) => textalign && textalign};
  text-transform: ${({ textTransform }) => textTransform && textTransform};
  text-decoration: ${({ textDecoration }) => textDecoration && textDecoration};
  text-overflow: ${({ textOverflow }) => textOverflow && textOverflow};
  text-shadow: ${({ textShadow }) => textShadow && textShadow};
  text-justify: ${({ textJustify }) => textJustify && textJustify};
  z-index: ${({ zindex }) => zindex};
  overflow: ${({ overflow }) => overflow};
`;

export default TMenuStyled;
