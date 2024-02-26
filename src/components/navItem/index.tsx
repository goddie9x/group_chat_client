import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import TButton from 'components/button';
import TLink from 'components/link';
import { TNavItemChildrenStyled, TNavItemStyled } from './navItem.styled';

export type TNavItemProps = {
  title?: string;
  href: string;
  navChildren?: Array<TNavItemProps>;
};

const TNavItem = ({ href, title, navChildren }: TNavItemProps) => {
  const [active, setActive] = useState(false);
  const [firstNav, setFirstNav] = useState(false);
  const history = useHistory();

  useEffect(() => {
    history.listen(() => {
      const localHref = window.location.pathname.split('/');
      localHref.shift();

      const arraySpitHref = href.split('/');
      const currentHref = arraySpitHref.pop() || '';
      const isNavActive = localHref?.includes(currentHref);

      !!isNavActive ? setActive(true) : setActive(false);
      arraySpitHref.length < 2 ? setFirstNav(true) : setFirstNav(false);
    });
  }, [history]);

  return (
    <TNavItemStyled
      position="relative"
      paddingRight={1}
      marginright={1}
      active={active}
      hasChild={!!navChildren}
      firstNav={firstNav}
    >
      <TButton height="100%" fontSize={2.5} minwidth={12.5}>
        <TLink href={href}>{title}</TLink>
      </TButton>
      {navChildren && navChildren.length && (
        <TNavItemChildrenStyled position="absolute" left={firstNav ? 0 : '100%'} top={firstNav ? '100%' : 0} zindex={1111}>
          {navChildren.map((child, index) => (
            <TNavItem key={index} href={href + child.href} title={child.title} navChildren={child.navChildren} />
          ))}
        </TNavItemChildrenStyled>
      )}
    </TNavItemStyled>
  );
};

export default TNavItem;
