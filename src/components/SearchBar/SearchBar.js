import React from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {appActions} from "../../redux";
import css from './SearchBar.module.css'
import {asyncSearchActions, searchActions} from "../../redux/slices";

const SearchBar = () => {
    const {inputValue} = useSelector(state => state.appReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setKeyValue = (e) => dispatch(appActions.setInputValue(e.target.value));
    const startSearch = () => {
        const searchPath = inputValue.toLowerCase().replaceAll(' ', '_')

        dispatch(asyncSearchActions.searchMovies({searchKey: inputValue}))
        dispatch(appActions.setSearchMode(true))
        dispatch(appActions.setGenreMode(false))
        dispatch(searchActions.setSearchKey(inputValue))

        navigate(`/movies/search?keyword=${searchPath}`)
        window.scrollTo({top: 340, left: 0, behavior: 'smooth'})
    };

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