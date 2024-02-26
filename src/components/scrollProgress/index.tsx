import React, { useEffect } from 'react';
import { useState } from 'react';

import { TLinearProgressProps } from 'components/progress/progress.styled';
import TLinearProgress from 'components/progress';

const TScrollProgress = (props: TLinearProgressProps) => {
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || window.scrollTo(0, 0) || 0;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight || 0;
    const scrolled = Math.floor((scrollTop / (scrollHeight - clientHeight)) * 100);
    if (scrolled > 2) {
      setProgress(scrolled);
    } else {
      setProgress(0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return progress ? <TLinearProgress value={progress} {...props} /> : null;
};

export default TScrollProgress;
