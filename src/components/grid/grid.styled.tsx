import { Grid, GridProps, styled } from "@mui/material";

export type TGridProps = GridProps & {
  width?: number | string;
  height?: number | string;
  margin?: number | string;
  padding?: number | string;
  margintop?: number | string;
  marginbottom?: number | string;
  marginLeft?: number | string;
  marginright?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  paddingleft?: number | string;
  paddingright?: number | string;
  background?: string;
  lineheight?: number | string;
  textalign?: "left" | "center" | "right";
};

const TGridStyled = styled(Grid)<{
  width?: number | string;
  height?: number | string;
  margin?: number | string;
  padding?: number | string;
  margintop?: number | string;
  marginbottom?: number | string;
  marginLeft?: number | string;
  marginright?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  paddingleft?: number | string;
  paddingright?: number | string;
  background?: string;
  lineheight?: number | string;
  textalign?: "left" | "center" | "right";
}>`
    width: ${({ width, theme})=> width && ((typeof width === 'string')?(width): theme.spacing(width))};
    height: ${({ height, theme})=> height && ((typeof height === 'string')?(height): theme.spacing(height))};
    margin: ${({ margin, theme})=> margin && ((typeof margin === 'string')?(margin): theme.spacing(margin))}!important;
    padding: ${({ padding, theme})=> padding && ((typeof padding === 'string')?(padding): theme.spacing(padding))}!important;
    margin-top: ${({ margintop, theme})=> margintop && ((typeof margintop === 'string')?(margintop): theme.spacing(margintop))} !important;
    margin-bottom: ${({ marginbottom, theme})=> marginbottom && ((typeof marginbottom === 'string')?(marginbottom): theme.spacing(marginbottom))} !important;
    margin-left: ${({ marginLeft, theme})=> marginLeft && ((typeof marginLeft === 'string')?(marginLeft): theme.spacing(marginLeft))} !important;
    margin-right: ${({ marginright, theme})=> marginright && ((typeof marginright === 'string')?(marginright): theme.spacing(marginright))} !important;
    padding-top: ${({ paddingTop, theme})=> paddingTop && ((typeof paddingTop === 'string')?(paddingTop): theme.spacing(paddingTop))} !important;
    padding-bottom: ${({ paddingBottom, theme})=> paddingBottom && ((typeof paddingBottom === 'string')?(paddingBottom): theme.spacing(paddingBottom))} !important;
    padding-left: ${({ paddingleft, theme})=> paddingleft && ((typeof paddingleft === 'string')?(paddingleft): theme.spacing(paddingleft))} !important;
    padding-right: ${({ paddingright, theme})=> paddingright && ((typeof paddingright === 'string')?(paddingright): theme.spacing(paddingright))} !important;
    background: ${({ background})=> background && background};
    line-height: ${({ lineheight, theme})=> lineheight && ((typeof lineheight === 'string')?(lineheight): theme.spacing(lineheight))};
    text-align: ${({ textalign})=> textalign && textalign};
    `;

export default TGridStyled;