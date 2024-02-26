import { styled, TextareaAutosizeProps, TextareaAutosize } from '@mui/material';

export type TTextareaProps = TextareaAutosizeProps & {
  label?: string;
  width?: number | string;
  height?: number | string;
  margin?: number | string;
  marginbottom?: number | string;
  margintop?: number | string;
  marginLeft?: number | string;
  marginright?: number | string;
  padding?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  paddingleft?: number | string;
  paddingRight?: number | string;
  fontSize?: number | string;
  fontWeight?: number | string;
  fontFamily?: string;
  lineHeight?: number | string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: number | string;
  border?: string;
};

const TTextareaStyled = styled(TextareaAutosize)<TTextareaProps>`
  box-sizing: border-box;
  width: ${({ width, theme }) => width && (typeof width === 'string' ? width : theme.spacing(width))};
  margin: ${({ margin, theme }) => margin && (typeof margin === 'string' ? margin : theme.spacing(margin))};
  margin-bottom: ${({ marginbottom, theme }) =>
    marginbottom && (typeof marginbottom === 'string' ? marginbottom : theme.spacing(marginbottom))};
  margin-top: ${({ margintop, theme }) =>
    margintop && (typeof margintop === 'string' ? margintop : theme.spacing(margintop))};
  margin-left: ${({ marginLeft, theme }) =>
    marginLeft && (typeof marginLeft === 'string' ? marginLeft : theme.spacing(marginLeft))};
  margin-right: ${({ marginright, theme }) =>
    marginright && (typeof marginright === 'string' ? marginright : theme.spacing(marginright))};
  padding: ${({ padding, theme }) =>
    padding ? (typeof padding === 'string' ? padding : theme.spacing(padding)) : theme.spacing(2)};
  padding-top: ${({ paddingTop, theme }) =>
    paddingTop && (typeof paddingTop === 'string' ? paddingTop : theme.spacing(paddingTop))};
  padding-bottom: ${({ paddingBottom, theme }) =>
    paddingBottom && (typeof paddingBottom === 'string' ? paddingBottom : theme.spacing(paddingBottom))};
  padding-left: ${({ paddingleft, theme }) =>
    paddingleft && (typeof paddingleft === 'string' ? paddingleft : theme.spacing(paddingleft))};
  padding-right: ${({ paddingRight, theme }) =>
    paddingRight && (typeof paddingRight === 'string' ? paddingRight : theme.spacing(paddingRight))};
  font-size: ${({ fontSize, theme }) => fontSize && (typeof fontSize === 'string' ? fontSize : theme.spacing(fontSize))};
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight && (typeof fontWeight === 'string' ? fontWeight : theme.spacing(fontWeight))};
  font-family: ${({ fontFamily, theme }) => fontFamily && theme.typography.fontFamily};
  line-height: ${({ lineHeight, theme }) =>
    lineHeight && (typeof lineHeight === 'string' ? lineHeight : theme.spacing(lineHeight))};
  color: ${({ color, theme }) => color || theme.palette.text.primary};
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'transparent')};
  border-radius: ${({ borderRadius, theme }) =>
    borderRadius ? (typeof borderRadius === 'string' ? borderRadius : theme.spacing(borderRadius)) : theme.spacing(0.5)};
  border: ${({ border }) => border};
`;

export default TTextareaStyled;
