import { TextFieldProps, TextField, styled } from '@mui/material';

export type TInputProps = TextFieldProps & {
  width?: number | string;
  minwidth?: number | string;
  maxwidth?: number | string;
  height?: number | string;
  minheight?: number | string;
  maxheight?: number | string;
  margin?: number | string;
  margintop?: number | string;
  marginbottom?: number | string;
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
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number | string;
  borderradius?: number | string;
  lineheight?: number | string;
  display?: string;
};

const TInputStyled = styled(TextField)<TInputProps>`
  display: ${({ display }) => display};
  width: ${({ width, theme }) => width && (typeof width === 'string' ? width : theme.spacing(width))};
  min-width: ${({ minwidth, theme }) => minwidth && (typeof minwidth === 'string' ? minwidth : theme.spacing(minwidth))};
  max-width: ${({ maxwidth, theme }) => maxwidth && (typeof maxwidth === 'string' ? maxwidth : theme.spacing(maxwidth))};
  height: ${({ height, theme }) => height && (typeof height === 'string' ? height : theme.spacing(height))};
  min-height: ${({ minheight, theme }) => minheight && (typeof minheight === 'string' ? minheight : theme.spacing(minheight))};
  max-height: ${({ maxheight, theme }) => maxheight && (typeof maxheight === 'string' ? maxheight : theme.spacing(maxheight))};
  margin: ${({ margin, theme }) => margin && (typeof margin === 'string' ? margin : theme.spacing(margin))};
  margin-top: ${({ margintop, theme }) =>
    margintop && (typeof margintop === 'string' ? margintop : theme.spacing(margintop))};
  margin-bottom: ${({ marginbottom, theme }) =>
    marginbottom && (typeof marginbottom === 'string' ? marginbottom : theme.spacing(marginbottom))};
  margin-left: ${({ marginLeft, theme }) =>
    marginLeft && (typeof marginLeft === 'string' ? marginLeft : theme.spacing(marginLeft))};
  margin-right: ${({ marginright, theme }) =>
    marginright && (typeof marginright === 'string' ? marginright : theme.spacing(marginright))};
  font-size: ${({ fontSize, theme }) => fontSize && (typeof fontSize === 'string' ? fontSize : theme.spacing(fontSize))};
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight && (typeof fontWeight === 'string' ? fontWeight : theme.spacing(fontWeight))};
  font-family: ${({ fontFamily }) => fontFamily};
  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-color: ${({ borderColor }) => borderColor};
  border-width: ${({ borderWidth, theme }) =>
    borderWidth && (typeof borderWidth === 'string' ? borderWidth : theme.spacing(borderWidth))};
  border-radius: ${({ borderradius, theme }) =>
    borderradius && (typeof borderradius === 'string' ? borderradius : theme.spacing(borderradius))};
  line-height: ${({ lineheight, theme }) =>
    lineheight && (typeof lineheight === 'string' ? lineheight : theme.spacing(lineheight))} !important;
  .MuiOutlinedInput-input {
    padding: ${({ padding, theme }) => padding && (typeof padding === 'string' ? padding : theme.spacing(padding))};
    padding-top: ${({ paddingTop, theme }) =>
      paddingTop && (typeof paddingTop === 'string' ? paddingTop : theme.spacing(paddingTop))};
    padding-bottom: ${({ paddingBottom, theme }) =>
      paddingBottom && (typeof paddingBottom === 'string' ? paddingBottom : theme.spacing(paddingBottom))};
    padding-left: ${({ paddingleft, theme }) =>
      paddingleft && (typeof paddingleft === 'string' ? paddingleft : theme.spacing(paddingleft))};
    padding-right: ${({ paddingRight, theme }) =>
      paddingRight && (typeof paddingRight === 'string' ? paddingRight : theme.spacing(paddingRight))};
      line-height: ${({ lineheight, theme }) =>
    lineheight && (typeof lineheight === 'string' ? lineheight : theme.spacing(lineheight))} !important;
    min-height: ${({ minheight, theme }) => minheight && (typeof minheight === 'string' ? minheight : theme.spacing(minheight))};
  max-height: ${({ maxheight, theme }) => maxheight && (typeof maxheight === 'string' ? maxheight : theme.spacing(maxheight))};
  }
  .MuiOutlinedInput-root{
    height: 100%;
  }
  ${({ type, theme }) =>
    type === 'date' &&
    `
  .MuiInputLabel-root {
    top: ${theme.spacing(-1.5)};
    &.Mui-focused {
      top: 0;
    }
  }
  `}
`;

export default TInputStyled;
