import React, { useEffect, useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';

import TIconTButton from 'components/iconButton';
import TMenu from 'components/menu';
import { TMenuProps } from 'components/menu/menu.styled';
import { TBoxProps } from 'components/box/box.styled';
import { TIconButtonProps } from 'components/iconButton/iconButton.styled';
import TTooltip from 'components/toolTip';
import THeaderMenuRenderOptionStyled from './headerMenuDropDown';

export type TMenuItemProps = {
  href?: string;
  title: string;
  onClick?: () => void;
  navChildren?: Array<TMenuItemProps>;
};

export type THeaderMenuRenderOptionProps = TBoxProps & {
  menuList: Array<TMenuItemProps>;
  forMobile?: boolean;
  iconButtonProps?: TIconButtonProps;
  IconButton?: React.ReactElement;
  menuProps?: Omit<TMenuProps, 'anchorEl' | 'anchorOrigin' | 'keepMounted' | 'transformOrigin' | 'open' | 'onClose'>;
  toolTip?: string;
  renderMenuItem: (title: string, onClick?: () => void, index?: number, href?: string) => React.ReactNode;
};

const THeaderMenuRenderOption = ({
  menuList,
  menuProps,
  renderMenuItem,
  toolTip,
  iconButtonProps,
  IconButton,
  ...props
}: THeaderMenuRenderOptionProps) => {
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
    <THeaderMenuRenderOptionStyled ref={menuRef} width="max-content" minwidth={6} height={48} {...props}>
      <TTooltip title={toolTip || t('open_menu')} onClick={handleOpenNavMenu}>
        <TIconTButton
          width="max-content"
          height={6}
          minwidth={6}
          lineheight={1}
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
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          {...menuProps}
        >
            {menuList.map(({ title, onClick, href }, index) => {
              return renderMenuItem(title, onClick, index, href);
            })}
        </TMenu>
      )}
    </THeaderMenuRenderOptionStyled>
  );
};

export default THeaderMenuRenderOption;
