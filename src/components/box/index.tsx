import React from 'react';
import TBoxStyled, { TBoxProps } from './box.styled';


const TBox = React.forwardRef<unknown,TBoxProps>(function TBox(props,ref){
    return <TBoxStyled ref={ref} {...props} boxSizing="border-box"/>;
});

export default TBox;