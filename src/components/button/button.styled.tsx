import { Button, ButtonProps, styled } from '@mui/material';

export type TShape = 'none' | 'round' | 'curved';
export type TButtonProps = ButtonProps & {
  width?: number | string;
  minwidth?: number;
  height?: number | string;
  minHeight?: number;
  shape?: TShape;
  uppercase?: boolean;
  borderradius?: number;
  margin?: string | number;
  padding?: string | number;
  margintop?: number;
  marginbottom?: number;
  paddingTop?: number;
  paddingBottom?: number;
  marginLeft?: number;
  marginright?: number;
  paddingleft?: number;
  paddingright?: number;
  fontSize?: number;
  fontWeight?: number;
  lineheight?: number;
  textalign?: string;
  textColor?: string;
  position?: string;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  display?: string;
  justifyContent?: string;
};

const TButtonStyled = styled(Button)<TButtonProps>`
  width: ${({ width, theme }) => width && (typeof width === 'string' ? width : theme.spacing(width))};
  height: ${({ height, theme }) => height && (typeof height === 'string' ? height : theme.spacing(height))};
  min-width: ${({ minwidth, theme }) => minwidth && theme.spacing(minwidth)};
  min-height: ${({ minHeight, theme }) => minHeight && theme.spacing(minHeight)};
  border-radius: ${({ shape = 'none', theme }) => shape !== 'none' && (shape === 'round' ? '999px' : theme.spacing(0.5))};
  border-radius: ${({ borderradius, theme }) => borderradius && theme.spacing(borderradius)};
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
  margin: ${({ margin, theme }) => (margin && Number(margin) ? theme.spacing(margin as number) : margin)};
  padding: ${({ padding, theme }) => (padding && Number(padding) ? theme.spacing(padding as number) : padding)};
  margin-top: ${({ margintop, theme }) => margintop && theme.spacing(margintop)};
  margin-bottom: ${({ marginbottom, theme }) => marginbottom && theme.spacing(marginbottom)};
  padding-top: ${({ paddingTop, theme }) => paddingTop && theme.spacing(paddingTop)};
  padding-bottom: ${({ paddingBottom, theme }) => paddingBottom && theme.spacing(paddingBottom)};
  margin-left: ${({ marginLeft, theme }) => marginLeft && theme.spacing(marginLeft)};
  margin-right: ${({ marginright, theme }) => marginright && theme.spacing(marginright)};
  padding-left: ${({ paddingleft, theme }) => paddingleft && theme.spacing(paddingleft)};
  padding-right: ${({ paddingright, theme }) => paddingright && theme.spacing(paddingright)};
  font-size: ${({ fontSize, theme }) => fontSize && theme.spacing(fontSize)};
  font-weight: ${({ fontWeight, theme }) => fontWeight && theme.typography.fontWeightMedium};
  line-height: ${({ lineheight }) => lineheight};
  text-align: ${({ textalign }) => textalign};
  display: ${({ display }) => display};
  justify-content: ${({ justifyContent }) => justifyContent};
  p {
    color: ${({ textColor, theme }) => (textColor ? textColor : theme.palette.text.primary)};
  }
  position: ${({ position }) => position};
  top: ${({ top, theme }) => top && theme.spacing(top)};
  bottom: ${({ bottom, theme }) => bottom && theme.spacing(bottom)};
  left: ${({ left, theme }) => left && theme.spacing(left)};
  right: ${({ right, theme }) => right && theme.spacing(right)};
`;

export default TButtonStyled;
