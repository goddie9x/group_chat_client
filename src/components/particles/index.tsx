import React from 'react';
import TParticlesStyled from './particles.styled';

import particlesTheme from 'theme/particles';
import { useSelector } from 'react-redux';
import { RootState } from 'store';


const TParticles = () => {
  const darkCode = '#0A1929';
  const lightCode = '#ffffff';
  const isDarkMode = useSelector((state: RootState) => state.common.isDarkMode);
  return <TParticlesStyled options={particlesTheme(isDarkMode?darkCode:lightCode)} />;
};

export default TParticles;
