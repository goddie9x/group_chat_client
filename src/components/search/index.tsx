import React, { useState, useRef, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import { TBoxProps } from 'components/box/box.styled';
import TBox from 'components/box';
import { useTranslation } from 'react-i18next';
import TTooltip from 'components/toolTip';
import TIconButton from 'components/iconButton';
import TLink from 'components/link';
import TSearchResults, { TSearchInput, TSearchResult } from './search.styled';
import TGrid from 'components/grid';

export type TSearchValueProps = {
  value: string;
  type?: string;
  tags?: string[];
  url: string;
};

export type TSearchProps = {
  options: Array<TSearchValueProps> | [];
  renderOption?: (option: string, type?: string) => React.ReactNode;
  onChangeValue?: (value: string) => void;
  onClickSearch?: (result: string) => void;
  hideMobile?: boolean;
} & TBoxProps;

const TSearch = ({ options, renderOption, onClickSearch, onChangeValue, hideMobile, ...props }: TSearchProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showSearchValues, setShowSearchValues] = useState(false);
  const searchValuesRef = useRef<HTMLDivElement>();

  const handleClickOutsideSearch = (event: MouseEvent) => {
    if (!searchValuesRef.current || searchValuesRef.current.contains(event.target as Node)) {
      return;
    }
    setShowSearchValues(false);
    setShowSearchInput(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideSearch);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSearch);
    };
  }, []);
  return (
    <TBox ref={searchValuesRef} {...props} display="flex" position="relative">
      <TBox
        display={hideMobile ? { xs: showSearchInput ? 'block' : 'none', md: 'block' } : 'block'}
        position={hideMobile ? { xs: 'absolute', md: 'relative' } : undefined}
        top={hideMobile ? { xs: 56, md: 0 } : 0}
        left={0}
        width="100%"
      >
        <TSearchInput
          label={t('search')}
          value={value}
          height={6}
          onChange={(e) => {
            setShowSearchValues(true);
            setValue(e.target.value);
            if (onChangeValue) {
              onChangeValue(e.target.value);
            }
          }}
          fullWidth
          minwidth={30}
        />
      </TBox>
      <TTooltip
        title={t('search')}
        marginLeft={{ xs: 0.5, md: 2 }}
        onClick={() => {
          setShowSearchInput(!showSearchInput);
        }}
      >
        <TIconButton width={6} height={6} onClick={() => onClickSearch} variant="extended" shape="curved">
          <SearchIcon />
        </TIconButton>
      </TTooltip>
      <TSearchResults
        position="absolute"
        zindex={1300}
        top={hideMobile ? { xs: 104, md: 48 } : 48}
        minwidth={30}
        left={0}
        display={showSearchValues ? (hideMobile ? { xs: showSearchInput ? 'flex' : 'none', md: 'flex' } : 'flex') : 'none'}
        flexDirection="column"
        maxHeight="50vh"
        overflow="auto"
      >
        {options.map((option, index) => (
          <TLink key={index} href={option.url}>
            <TSearchResult container height={6} lineHeight="32px" padding={1}>
              {renderOption ? (
                renderOption(option.value, option.type)
              ) : (
                <>
                  <TGrid item xs={option.type ? 9 : 12}>
                    {option.value}
                  </TGrid>
                  {option.type && (
                    <TGrid item xs={3}>
                      {option.type}
                    </TGrid>
                  )}
                </>
              )}
            </TSearchResult>
          </TLink>
        ))}
        {options.length === 0 && (
          <TSearchResult container height={6} lineHeight="32px" padding={1}>
            {t('no_data_found')}
          </TSearchResult>
        )}
      </TSearchResults>
    </TBox>
  );
};

export default TSearch;
