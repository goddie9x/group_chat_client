import React, { useEffect, useMemo } from 'react';

import { ThemeProvider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';

import TRouter from 'router';
import TParticles from 'components/particles';
import TAlert from 'components/alert';
import TBox from 'components/box';

import { RootState } from 'store';
import { loadParticlesMode, loadLanguage, loadDarkMode, loadMusic } from 'store/slices/common';

function App() {
  const alertOpenStatus = useSelector((state: RootState) => state.alert.open);
  const isParticlesOn = useSelector((state: RootState) => state.common.isParticlesOn);

  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      dispatch(loadParticlesMode());
      dispatch(loadLanguage());
      dispatch(loadDarkMode());
      dispatch(loadMusic());
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

  const isDarkMode = useSelector((state: RootState) => state.common.isDarkMode);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
        },
        components: {
          MuiButton: {
            styleOverrides: {
              sizeMedium: {
                fontSize: '14px',
                padding: '13px 23px',
              },
              sizeSmall: {
                padding: '12px 15px',
                fontSize: '14px',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                '*::-webkit-scrollbar': {
                  width: '5px',
                },
                '*::-webkit-scrollbar-track': {
                  backgroundColor: 'transparent',
                },
                '*::-webkit-scrollbar-thumb': {
                  width: '5px',
                  backgroundColor: '#d6dee1',
                  borderRadius: '20px',
                  border: 'px solid transparent',
                  backgroundClip: 'content-box',
                },
                '*::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#a8bbbf',
                },
              },
            },
          },
        },
        typography: {
          fontFamily: `'Inter', sans-serif`,
          h1: {
            fontSize: '27px',
            fontWeight: 600,
          },
          h2: {
            fontSize: '25px',
            fontWeight: 700,
            lineHeight: '30px',
          },
          h3: {
            fontSize: '22px',
            fontWeight: 600,
          },
          h4: {
            fontSize: '20px',
            fontWeight: 500,
            lineHeight: '22px',
          },
          h5: {
            fontSize: '18px',
            fontWeight: 600,
          },
          h6: {
            fontSize: '16px',
            fontWeight: 600,
          },
          subtitle1: {
            fontSize: '16px',
          },
          subtitle2: {
            fontSize: '15px',
          },
          body1: {
            fontSize: '15px',
            lineHeight: '18px',
          },
          body2: {
            fontSize: '13px',
            lineHeight: '16px',
          },
          caption: {
            fontSize: '13px',
            lineHeight: '16px',
          },
        },
      }),
    [isDarkMode],
  );

  return (
    <TBox className="App">
      <ThemeProvider theme={theme}>
        {isParticlesOn && <TParticles />}
        <TRouter />
        {alertOpenStatus && <TAlert />}
      </ThemeProvider>
    </TBox>
  );
}

export default App;
