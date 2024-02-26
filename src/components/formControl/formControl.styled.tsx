import { FormControl, FormControlProps, styled } from '@mui/material';

export type TFormControlProps = FormControlProps & {
  width?: number | string;
  height?: number | string;
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
  borderradius?: number | string;
  border?: number | string;
  borderColor?: string;
  backgroundColor?: string;
  display?: string;
  zindex?: number;
};

const TFormControlStyled = styled(FormControl)<TFormControlProps>`
  width: ${({ width, theme }) => width && (typeof width === 'string' ? width : theme.spacing(width))};
  height: ${({ height, theme }) => height && (typeof height === 'string' ? height : theme.spacing(height))};
  margin: ${({ margin, theme }) => margin && (typeof margin === 'string' ? margin : theme.spacing(margin))};
  margin-top: ${({ margintop, theme }) =>
    margintop && (typeof margintop === 'string' ? margintop : theme.spacing(margintop))};
  margin-bottom: ${({ marginbottom, theme }) =>
    marginbottom && (typeof marginbottom === 'string' ? marginbottom : theme.spacing(marginbottom))};
  margin-left: ${({ marginLeft, theme }) =>
    marginLeft && (typeof marginLeft === 'string' ? marginLeft : theme.spacing(marginLeft))};
  margin-right: ${({ marginright, theme }) =>
    marginright && (typeof marginright === 'string' ? marginright : theme.spacing(marginright))};
  padding: ${({ padding, theme }) => padding && (typeof padding === 'string' ? padding : theme.spacing(padding))};
  padding-top: ${({ paddingTop, theme }) =>
    paddingTop && (typeof paddingTop === 'string' ? paddingTop : theme.spacing(paddingTop))};
  padding-bottom: ${({ paddingBottom, theme }) =>
    paddingBottom && (typeof paddingBottom === 'string' ? paddingBottom : theme.spacing(paddingBottom))};
  padding-left: ${({ paddingleft, theme }) =>
    paddingleft && (typeof paddingleft === 'string' ? paddingleft : theme.spacing(paddingleft))};
  padding-right: ${({ paddingRight, theme }) =>
    paddingRight && (typeof paddingRight === 'string' ? paddingRight : theme.spacing(paddingRight))};
  border-radius: ${({ borderradius, theme }) =>
    borderradius && (typeof borderradius === 'string' ? borderradius : theme.spacing(borderradius))};
  border: ${({ border, theme }) => border && (typeof border === 'string' ? border : theme.spacing(border))};
  border-color: ${({ borderColor }) => borderColor && borderColor};
  background-color: ${({ backgroundColor }) => backgroundColor && backgroundColor};
  display: ${({ display }) => display};
  z-index: ${({ zindex }) => zindex};
`;

export default TFormControlStyled;
