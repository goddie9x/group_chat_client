import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material';

import TTextareaStyled, { TTextareaProps } from './textarea.styled';
import TBox from 'components/box';
import TTypography from 'components/typography';

const TTextarea = ({ label, ...props }: TTextareaProps) => {
  const [isClickedInside, setIsClickedInside] = useState(false);
  const TextareaBoxRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const handleClickInOutSide = (e: MouseEvent) => {
    if (TextareaBoxRef.current && !TextareaBoxRef.current.contains(e.target as Node)) {
      setIsClickedInside(false);
    } else {
      setIsClickedInside(true);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickInOutSide);
    return () => {
      window.removeEventListener('click', handleClickInOutSide);
    };
  });

  return (
    <TBox position="relative" boxSizing="border-box" ref={TextareaBoxRef} height={props?.height} width={props?.width} transition="0.3s all linear">
      {!props.value&&label&&<TTypography variant="body1" position="absolute" left={16} background={theme.palette.background.default} top={isClickedInside ? theme.spacing(-1): theme.spacing(1)}>
        {label}
      </TTypography>}
      <TTextareaStyled width="100%" minRows="3" {...props} />
    </TBox>
  );
};

export default TTextarea;
