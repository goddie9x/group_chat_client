import React from 'react';

import TMenuStyled, { TMenuProps } from './menu.styled';

const TMenu = React.forwardRef<HTMLDivElement | null, TMenuProps>((props: TMenuProps, ref) => {
  return <TMenuStyled {...props} ref={ref} />;
});
TMenu.displayName = 'TMenu';
export default TMenu;
