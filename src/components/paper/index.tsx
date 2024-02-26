import React from "react";

import TPaperStyled, { TPaperProps } from "./paper.styled";

const TPaper  =React.forwardRef<HTMLDivElement | null,TPaperProps>(function TPaper({children, ...props},ref){
    return <TPaperStyled ref={ref} {...props}>{children}</TPaperStyled>;
});

export default TPaper;