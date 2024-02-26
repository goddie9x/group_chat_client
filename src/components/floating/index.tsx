import React, { useEffect, useState } from 'react';
import TFloatingStyled, { TFloatingProps } from './floating.styled';

const TFloating = ({ children, positionShowUp, ...props }: TFloatingProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShow(scrollTop >= (positionShowUp || 0));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return show ? <TFloatingStyled {...props}>{children}</TFloatingStyled> : null;
};

export default TFloating;
