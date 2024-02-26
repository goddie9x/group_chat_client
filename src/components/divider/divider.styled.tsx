import { Divider,styled,DividerProps } from "@mui/material";

export type TDividerProps = DividerProps & {
    width?:string | number;
    height?:string | number;
    margin?:string | number;
    margintop?: string | number;
    marginbottom?: string | number;
    marginLeft?: string | number;
    marginright?: string | number;
    padding?:string | number;
    paddingTop?: string | number;
    paddingBottom?: string | number;
    paddingleft?: string | number;
    paddingright?: string | number;
};

const TDividerStyled = styled(Divider)<{
    width?:string | number;
    height?:string | number;
    margin?:string | number;
    margintop?: string | number;
    marginbottom?: string | number;
    marginLeft?: string | number;
    marginright?: string | number;
    padding?:string | number;
    paddingTop?: string | number;
    paddingBottom?: string | number;
    paddingleft?: string | number;
    paddingright?: string | number;
}>`
    width: ${({width, theme}) => width && ((typeof width === 'string')?(width): theme.spacing(width))};
    height: ${({height, theme}) => height && ((typeof height === 'string')?(height): theme.spacing(height))};
    margin: ${({margin, theme}) => margin && ((typeof margin === 'string')?(margin): theme.spacing(margin))};
    margin-top: ${({margintop, theme}) => margintop && ((typeof margintop === 'string')?(margintop): theme.spacing(margintop))};
    margin-bottom: ${({marginbottom, theme}) => marginbottom && ((typeof marginbottom === 'string')?(marginbottom): theme.spacing(marginbottom))};
    margin-left: ${({marginLeft, theme}) => marginLeft && ((typeof marginLeft === 'string')?(marginLeft): theme.spacing(marginLeft))};
    margin-right: ${({marginright, theme}) => marginright && ((typeof marginright === 'string')?(marginright): theme.spacing(marginright))};
    padding: ${({padding, theme}) => padding && ((typeof padding === 'string')?(padding): theme.spacing(padding))};
    padding-top: ${({paddingTop, theme}) => paddingTop && ((typeof paddingTop === 'string')?(paddingTop): theme.spacing(paddingTop))};
    padding-bottom: ${({paddingBottom, theme}) => paddingBottom && ((typeof paddingBottom === 'string')?(paddingBottom): theme.spacing(paddingBottom))};
    padding-left: ${({paddingleft, theme}) => paddingleft && ((typeof paddingleft === 'string')?(paddingleft): theme.spacing(paddingleft))};
    padding-right: ${({paddingright, theme}) => paddingright && ((typeof paddingright === 'string')?(paddingright): theme.spacing(paddingright))};
`;

export default TDividerStyled;