import React from "react";
import TFormControlLabelStyled, { TFormControlLabelProps } from "./formControlLabel.styled";

const TFormControlLabel = (props:TFormControlLabelProps) => {
    return <TFormControlLabelStyled {...props}/>;
};

export default TFormControlLabel;