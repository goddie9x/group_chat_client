import React from 'react';

import TButtonStyled, { TButtonProps } from './button.styled';

const TButton = (props: TButtonProps) => {
    return (
        <TButtonStyled {...props} />
    );
};

export default TButton;