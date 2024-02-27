import React from 'react';
import { useState } from 'react';

import TSearch, { TSearchValueProps } from 'components/search';

import { useDispatch } from 'react-redux';
import { setLoading } from 'store/slices/common';
import useSkipRunEffectForTheFirstTime from 'hooks/useSkipRunEffectForTheFirstTime';

const THeaderSearch = () => {
  const [value, setValue] = useState<Array<TSearchValueProps> | []>([]);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  useSkipRunEffectForTheFirstTime(() => {
    dispatch(setLoading(true));
    fetch(process.env.REACT_APP_API_URL + '/search/' + query)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error('Bad response from server');
        }
        return res.json();
      })
      .then((res) => {
        dispatch(setLoading(false));
        setValue(res.usersResult);
      })
      .catch(() => {
        dispatch(setLoading(false));
        setValue([]);
      });
  }, [query]);

  return <TSearch hideMobile={true} options={value} onChangeValue={(newQuery) => setQuery(newQuery)} />;
};

export default THeaderSearch;
