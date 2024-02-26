import TBox from "components/box";
import React from "react";

import TLinearProgressStyled, { TLinearProgressProps } from "components/progress/progress.styled";

const TLoading = ({width, color="secondary", ...props}: TLinearProgressProps) => {
    return <TBox {...props} width={width? width:'100%'}>
        <TLinearProgressStyled color={color} {...props}/>
    </TBox>;
};

export default TLoading;