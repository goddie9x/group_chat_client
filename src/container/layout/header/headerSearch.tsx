import React from 'react';
import { useEffect, useState } from 'react';

import TSearch, { TSearchValueProps } from 'components/search';

import { useDispatch } from 'react-redux';
import { setLoading } from 'store/slices/common';

const THeaderSearch = ()=>{
    const [value,setValue] = useState<Array<TSearchValueProps>|[]>([]);
    const [query,setQuery] = useState('');
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setLoading(true));
        fetch('https://te11api.herokuapp.com/search/'+query)
        .then(res=>{
            if (res.status >= 400){
                throw new Error('Bad response from server');
            }
            return res.json();
        })
        .then(res=>{
            dispatch(setLoading(false));
            setValue(res.result);
        })
        .catch(()=>{
            dispatch(setLoading(false));
            setValue([]);
        });
    },[query]);

    return <TSearch hideMobile={true} options={value} onChangeValue={(newQuery)=>setQuery(newQuery)}/>;
};

export default THeaderSearch;