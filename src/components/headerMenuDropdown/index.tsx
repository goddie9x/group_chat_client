import React, { useEffect, useRef, memo } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';

import TIconTButton from 'components/iconButton';
import TNavItemVeritical from 'components/navItem/navItemVertical';
import TMenu from 'components/menu';
import { TMenuProps } from 'components/menu/menu.styled';
import { TBoxProps } from 'components/box/box.styled';
import { TIconButtonProps } from 'components/iconButton/iconButton.styled';
import TTooltip from 'components/toolTip';
import THeaderMenuDropdownStyled from './headerMenuDropDown';

export type TPagesProps = {
  href: string;
  title: string;
  navChildren?: Array<TPagesProps>;
};

export type THeaderMenuDropdownProps = TBoxProps & {
  menuList?: Array<TPagesProps>;
  forMobile?: boolean;
  iconButtonProps?: TIconButtonProps;
  IconButton?: React.ReactElement;
  menuProps?: Omit<TMenuProps, 'anchorEl' | 'anchorOrigin' | 'keepMounted' | 'transformOrigin' | 'open' | 'onClose'>;
  toolTip?: string;
};

const THeaderMenuDropdown = ({ menuList,menuProps, toolTip, iconButtonProps, IconButton, ...props }: THeaderMenuDropdownProps) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current || menuRef.current.contains(event.target as Node) || event.target === anchorElNav) {
        return;
      }
      handleCloseNavMenu();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <THeaderMenuDropdownStyled ref={menuRef} width={48} height={48} {...props}>
      <TTooltip title={toolTip || t('open_menu')} onClick={handleOpenNavMenu}>
        <TIconTButton
          width={6}
          height={6}
          shape="curved"
          aria-label="account of current user"
          aria-haspopup="true"
          {...iconButtonProps}
        >
          {IconButton ? IconButton : <MenuIcon />}
        </TIconTButton>
      </TTooltip>
      {menuList && (
        <TMenu
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          zindex={1401}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          {...menuProps}
        >
          {menuList.map((page, index) => (
            <TNavItemVeritical key={index} {...page} />
          ))}
        </TMenu>
      )}
    </THeaderMenuDropdownStyled>
  );
};

export default memo(THeaderMenuDropdown);
