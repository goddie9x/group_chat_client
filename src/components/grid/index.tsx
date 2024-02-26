import React from "react";
import TGridStyled, { TGridProps } from "./grid.styled";


const TGrid = (props:TGridProps)=>{
    return <TGridStyled {...props}/>;
};

export default TGrid;