import React from 'react';

import TSwitch, { TUseSwitchProps } from 'components/switch';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setDarkMode } from 'store/slices/common';

const TSwitchDarkMode = (props: TUseSwitchProps) => {
  const isDarkMode = useSelector((state: RootState) => state.common.isDarkMode);

  const dispatch = useDispatch();

  return <TSwitch darkmode checked={isDarkMode} onChange={() => dispatch(setDarkMode(!isDarkMode))} {...props} />;
};

export default TSwitchDarkMode;
