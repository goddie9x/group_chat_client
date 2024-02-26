import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import TBox from 'components/box';
import { TBoxProps } from 'components/box/box.styled';
import React from 'react';

export type TTooltipProps = TBoxProps & {
  toolTipProps?: Omit<TooltipProps, 'children' | 'title'>;
  title: string;
};

const TTooltip = React.forwardRef(({ children, toolTipProps, title, ...props }: TTooltipProps, ref) => {
  return (
    <Tooltip ref={ref} title={title} {...toolTipProps}>
      <TBox {...props}>{children}</TBox>
    </Tooltip>
  );
});

TTooltip.displayName = 'TTooltip';

export default TTooltip;
