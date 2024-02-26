import React from 'react';

import TIconButtonStyled, { TIconButtonProps } from './iconButton.styled';

const TIconButton = (props: TIconButtonProps) => {
    return (
        <TIconButtonStyled {...props}/>
    );
};

export default TIconButton;