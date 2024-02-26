import React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { styled, SvgIconProps } from '@mui/material';

const ArrowUpStyled = styled(ArrowBackIosNewIcon)`
    transform: rotate(90deg);
`;

const ArrowUp = (props: SvgIconProps) => {
    return <ArrowUpStyled {...props} />;
};

export default ArrowUp;

