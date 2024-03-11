import React, { memo, useEffect, useState } from 'react';
import { Toolbar, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';

import TBox from 'components/box';
import TScrollProgress from 'components/scrollProgress';
import THeaderStyled from './header.styled';
import TNavItem from 'components/navItem';
import TImage from 'components/image';
import TLink from 'components/link';
import THeaderMenuDropdown, { TPagesProps } from 'components/headerMenuDropdown';
import THeaderSetting from './headerSetting';
import THeaderMenuRenderOption, { TMenuItemProps } from 'components/headerMenuDropdown/headerMenuRenderOption';
import TLoginModal from 'container/modal/login';
import TRegisterModal from 'container/modal/register';
import TButton from 'components/button';
import TResetPasswordModal from 'container/modal/resetPassword';

import Logo from 'assets/images/T_logo.png';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { openLoginModal, openRegisterModal, logout } from 'store/slices/auth';
import { setAlert } from 'store/slices/alert';
import TScrollToTop from 'components/scrollToTop';

import { getCurrentUserData } from 'store/thunk/auth';
import THeaderSearch from '../../modal/headerSetting';
interface THeaderProps {
  navs?: Array<TPagesProps>;
  AccSettings?: Array<TPagesProps>;
  loginOpt?: Array<TMenuItemProps>;
}

const THeader = ({ navs, AccSettings, loginOpt }: THeaderProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loggingOut, setLoggingOut] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const reloadHeader = useSelector((state: RootState) => state.common.reloadHeader);
  const userData = useSelector((state: RootState) => state.auth.userData);
  const navlinks = navs;

  const AccountSettings = AccSettings || [
    { href: '/user/profile/' + userData?._id, title: t('profile') },
    { href: '/dashboard/user-manager', title: t('dashboard') },
    {
      href: 'logout',
      title: t('logout'),
      onClick: () => {
        setLoggingOut(true);
        dispatch(logout());
        dispatch(
          setAlert({
            title: t('logged_out'),
            message: t('logged_out'),
            type: 'warning',
          }),
        );
        setLoggingOut(false);
      },
    },
  ];
  const loginOption = loginOpt || [
    {
      title: t('login'),
      onClick: () => {
        dispatch(openLoginModal(true));
      },
    },
    {
      title: t('register'),
      onClick: () => {
        dispatch(openRegisterModal(true));
      },
    },
  ];

  useEffect(() => {
    if (loggingOut) {
      localStorage.removeItem('tokenUser');
    }
    dispatch(getCurrentUserData());
  }, [isLoggedIn, reloadHeader]);

  return (
    <THeaderStyled position="fixed" zindex={1300}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TLink href="/">
            <TImage src={Logo} width={75} marginright={10} borderradius={10} />
          </TLink>
          <THeaderMenuDropdown marginLeft={{ xs: 0.5, md: 2 }} forMobile={true} menuList={navlinks} />
          <TBox display={{ xs: 'none', md: 'flex' }} flexGrow={1}>
            {navlinks?.map((page, index) => (
              <TNavItem key={index} {...page} />
            ))}
          </TBox>
          <THeaderSearch />
          {isLoggedIn ? (
            <>
              <THeaderMenuDropdown
                menuProps={{ width: '250px', textalign: 'left' }}
                marginLeft={{ xs: 0.5, md: 2 }}
                toolTip={userData?.fullName || userData?.account || t('account_settings')}
                IconButton={
                  userData?.image ? (
                    <TImage borderradius={9999} padding={4} width="100%" height="100%" src={userData?.image} />
                  ) : (
                    <AccountCircleIcon />
                  )
                }
                menuList={AccountSettings}
              />
            </>
          ) : (
            <THeaderMenuRenderOption
              marginLeft={{ xs: 0.5, md: 2 }}
              menuList={loginOption}
              toolTip={t('login')}
              IconButton={
                <TBox width="max-content">
                  <TBox display={{ xs: 'block', md: 'none' }}>
                    <LoginIcon />
                  </TBox>
                  <TBox padding={1} display={{ xs: 'none', md: 'block' }}>
                    {t('login') + '/' + t('register')}
                  </TBox>
                </TBox>
              }
              renderMenuItem={(title, onClick, index) => {
                return (
                  <TBox key={index}>
                    <TButton
                      minwidth={22}
                      onClick={() => {
                        onClick && onClick();
                      }}
                    >
                      {title}
                    </TButton>
                  </TBox>
                );
              }}
            />
          )}
          <THeaderSetting marginLeft={{ xs: 0.5, md: 2 }} />
        </Toolbar>
      </Container>
      <TScrollProgress height={5} display="block" />
      <TScrollToTop positionShowUp={200} bottom={16} right={16} zindex={1300} />
      <TLoginModal />
      <TResetPasswordModal />
      <TRegisterModal />
    </THeaderStyled>
  );
};
export default memo(THeader);
