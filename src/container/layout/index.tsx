import React from 'react';
import { useTheme } from '@mui/material';

import TBox from 'components/box';
import TFooter from './footer';
import THeader from './header';
import TLoading from 'components/loading';

import { useSelector } from 'react-redux';

import { RootState } from 'store';
import { TBoxProps } from 'components/box/box.styled';

export type TLayoutProps = TBoxProps & {
  title?: string;
  children: React.ReactNode;
};

const TLayout = ({ children,  ...props }: TLayoutProps) => {
  const theme = useTheme();
  const isParticlesOn = useSelector((state: RootState) => state.common.isParticlesOn);
  const isLoading = useSelector((state: RootState) => state.common.isLoading);

  return (
    <TBox background={isParticlesOn ? undefined : theme.palette.background.default} {...props}>
      {isLoading && <TLoading color="warning" height={5} display="block" position="fixed" top={0} zindex={9999} />}
      <THeader />
      <TBox
        width="100%"
        margintop={5.5}
        sx={{
          paddingX: {
            xs: 2,
            sm: 3,
            md: 7,
            lg: 5,
          },
          paddingY: 3.75,
        }}
        minHeight={500}
      >
        <>
          {children}
        </>
      </TBox>
      <TFooter />
    </TBox>
  );
};

export default TLayout;
