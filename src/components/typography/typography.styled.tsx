import { styled, Typography, TypographyProps } from '@mui/material';
import { Property } from 'csstype';

export type TTypographyProps = TypographyProps & {
  display?: string;
  width?: number | string;
  minwidth?: number;
  height?: number | string;
  minHeight?: number;
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
  color?: Property.Color | undefined;
  lineheight?: number;
  textalign?: 'left' | 'center' | 'right';
  background?: string;
  backgroundColor?: string;
  overflow?: string;
  overflowWrap?: string;
  cursor?: string;
};

const TTypographyStyled = styled(Typography)<TTypographyProps>`
  display: ${({ display }) => display};
  width: ${({ width, theme }) => width && ((typeof width === 'string')?(width): theme.spacing(width))};
  height: ${({ height, theme }) => height&&((typeof height=== 'string')?(height): theme.spacing(height))};
  min-width: ${({ minwidth, theme }) => minwidth && theme.spacing(minwidth)};
  min-height: ${({ minHeight, theme }) => minHeight && theme.spacing(minHeight)};
  margin: ${({ margin, theme }) => (margin&&Number(margin))? theme.spacing(margin as number) : margin};
  padding: ${({ padding, theme }) => (padding&&Number(padding))? theme.spacing(padding as number) : padding};
  margin-top: ${({ margintop, theme }) => margintop && theme.spacing(margintop)};
  margin-bottom: ${({ marginbottom, theme }) => marginbottom && theme.spacing(marginbottom)};
  padding-top: ${({ paddingTop, theme }) => paddingTop && theme.spacing(paddingTop)};
  padding-bottom: ${({ paddingBottom, theme }) => paddingBottom && theme.spacing(paddingBottom)};
  margin-left: ${({ marginLeft, theme }) => marginLeft && theme.spacing(marginLeft)};
  margin-right: ${({ marginright, theme }) => marginright && theme.spacing(marginright)};
  padding-left: ${({ paddingleft, theme }) => paddingleft && theme.spacing(paddingleft)};
  padding-right: ${({ paddingright, theme }) => paddingright && theme.spacing(paddingright)};
  color: ${({ color, theme }) => color ?color : theme.palette.primary.dark};
  line-height: ${({ lineheight }) => lineheight};
  text-align: ${({ textalign }) => textalign};
  background: ${({ background }) => background};
  background-color: ${({ backgroundColor }) => backgroundColor};
  overflow: ${({ overflow }) => overflow};
  overflow-wrap: ${({ overflowWrap }) => overflowWrap};
  cursor: ${({ cursor }) => cursor};
`;

export default TTypographyStyled;
