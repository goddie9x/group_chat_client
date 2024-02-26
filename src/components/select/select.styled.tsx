import { styled, SelectProps, Select } from '@mui/material';
import { TFormControlProps } from 'components/formControl/formControl.styled';

export type TSelectProps = Omit<SelectProps,'helperText'> & {
  width?: string | number;
  minwidth?: number;
  height?: string | number;
  minheight?: number;
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
  zindex?: number;
  border?: string;
  borderradius?: string | number;
  borderColor?: string;
  formControlProps?: TFormControlProps;
  helperText?: string | false;
};

const TSelectStyled = styled(Select)<TSelectProps>`
  width: ${({ width, theme }) => width && (typeof width === 'string' ? width : theme.spacing(width))};
  min-width: ${({ minwidth, theme }) => minwidth && (typeof minwidth === 'string' ? minwidth : theme.spacing(minwidth))};
  height: ${({ height, theme }) => height && (typeof height === 'string' ? height : theme.spacing(height))};
  min-height: ${({ minheight, theme }) =>
    minheight && (typeof minheight === 'string' ? minheight : theme.spacing(minheight))};
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
  z-index: ${({ zindex }) => zindex};
  border: ${({ border, theme }) => border && (typeof border === 'string' ? border : theme.spacing(border))};
  border-radius: ${({ borderradius, theme }) =>
    borderradius && (typeof borderradius === 'string' ? borderradius : theme.spacing(borderradius))};
  border-color: ${({ borderColor, theme }) =>
    borderColor && (typeof borderColor === 'string' ? borderColor : theme.spacing(borderColor))};
`;

export default TSelectStyled;
