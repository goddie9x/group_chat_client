import React from 'react';
import clsx from 'clsx';
import { useSwitch, UseSwitchProps } from '@mui/material';
import {SwitchRoot, SwitchInput, SwitchThumb, SwitchTrack, SwitchThumbDarkMode } from './switch.styled';

export type TUseSwitchProps = UseSwitchProps&{
    height?: number;
    darkmode?: boolean;
};

const TSwitch = ({height,darkmode, ...props}: TUseSwitchProps) => {
    const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

    const stateClasses = {
      checked,
      disabled,
      focusVisible,
    };

  return (
    <SwitchRoot height={height} className={clsx(stateClasses)}>
      <SwitchTrack height={height}>
        {darkmode?<SwitchThumbDarkMode height={height} className={clsx(stateClasses)}/>:<SwitchThumb height={height} className={clsx(stateClasses)}/>}
      </SwitchTrack>
      <SwitchInput {...getInputProps()}  height={height} />
    </SwitchRoot>
  );
};

export default TSwitch;
