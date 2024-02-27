import React from 'react';

import TSwitch, { TUseSwitchProps } from 'components/switch';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setDarkMode } from 'store/slices/common';

const TSwitchDarkMode = (props: TUseSwitchProps) => {
  const isDarkMode = useSelector((state: RootState) => state.common.isDarkMode);
  const {onChange,...newProps } = props;
  const dispatch = useDispatch();

  return <TSwitch darkmode checked={isDarkMode} onChange={() => dispatch(setDarkMode(!isDarkMode))} {...newProps} />;
};

export default TSwitchDarkMode;
