import React, { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useHistory } from 'react-router-dom';

import TButton from 'components/button';
import TLink from 'components/link';
import { TNavItemChildrenVeriticalStyled, TNavItemStyled } from './navItem.styled';

export type TNavItemProps = {
  title?: string;
  href: string;
  onClick?: () => void;
  navChildren?: Array<TNavItemProps>;
};

const TNavItemVeritical = ({ href, title, onClick, navChildren }: TNavItemProps) => {
  const history = useHistory();
  const [active, setActive] = useState(false);

  useEffect(() => {
    history.listen(() => {
      const localHref = window.location.pathname.split('/');
      localHref.shift();

      const arraySpitHref = href.split('/');
      const currentHref = arraySpitHref.pop() || '';
      const isNavActive = localHref?.includes(currentHref);

      !!isNavActive ? setActive(true) : setActive(false);
    });
  }, [history]);
  return (
    <TNavItemStyled active={active} minwidth={350} onClick={onClick}>
      {onClick ? (
        <TButton height="100%" justifyContent="flex-start" onClick={onClick} fontSize={2.5} minwidth={25} endIcon={navChildren && <ArrowDropDownIcon />}>
          {title}
        </TButton>
      ) : (
        <TLink href={href}>
          <TButton
            height="100%"
            justifyContent="flex-start"
            fontSize={2.5}
            minwidth={25}
            onClick={onClick}
            endIcon={navChildren && <ArrowDropDownIcon />}
          >
            {title}
          </TButton>
        </TLink>
      )}
      {navChildren && navChildren.length && (
        <TNavItemChildrenVeriticalStyled>
          {navChildren.map((child, index) => (
            <TNavItemVeritical key={index} href={href + child.href} title={child.title} navChildren={child.navChildren} />
          ))}
        </TNavItemChildrenVeriticalStyled>
      )}
    </TNavItemStyled>
  );
};

export default TNavItemVeritical;
