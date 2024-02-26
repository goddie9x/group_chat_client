import React from 'react';

import { Link as LinkContent } from '@mui/material';

import { StyledLink, TLinkProps } from './link.styled';

const TLink = ({ href, children, underline, ...props }: TLinkProps) => {
  return (
    <StyledLink to={href}>
      <LinkContent href={href} component="span" underline={underline || 'hover'} {...props}>
        {children}
      </LinkContent>
    </StyledLink>
  );
};

export default TLink;
