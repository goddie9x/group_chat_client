import React from 'react';

import TDividerStyled,{TDividerProps} from "./divider.styled";

const TDivider = (props: TDividerProps)=>{
    return <TDividerStyled {...props}/>;
};

export default TDivider;