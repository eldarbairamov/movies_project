import React from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {asyncMoviesActions, moviesActions} from "../../redux";
import css from './SearchBar.module.css'

const SearchBar = () => {
    const {inputValue} = useSelector(store => store.moviesReducer)
    const dispatch = useDispatch();
    const [, setParams] = useSearchParams();

    const setKeyValue = (e) => dispatch(moviesActions.setInputValue(e.target.value))
    const startSearch = () => {
        dispatch(asyncMoviesActions.searchMovies({searchKey: inputValue}))
        dispatch(moviesActions.setSearchMode(true))
        dispatch(moviesActions.setGenreMode(false))
        setParams()
    }
    return (
        <div className={css.Search}>
            <div className={css.searchingBlock}>
                <input value={inputValue} onChange={setKeyValue} className={css.input} placeholder={'Search...'}/>
                <img onClick={startSearch} className={css.image} src={require('./search.png')} alt="search"/>
            </div>
        </div>
    );
};

export {SearchBar};