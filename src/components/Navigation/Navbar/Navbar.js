import React from 'react';

import css from './Navbar.module.css'
import {useDispatch, useSelector} from "react-redux";
import {asyncMoviesActions, moviesActions} from "../../../redux";

const Navbar = () => {
    const {searchKey} = useSelector(store => store.moviesReducer)

    const dispatch = useDispatch();

    const setKeyValue = (e) => {
        const value = e.target.value
        dispatch(moviesActions.setSearchKey(value))
    }
    const startSearch = () => dispatch(asyncMoviesActions.searchMovies({searchKey: searchKey}))

    return (
        <section>
            <div className={css.Navbar}>
                <div className={css.title}>
                    <p>okten movies hub</p>
                </div>

                <div>
                    <input onChange={setKeyValue} className={css.input} placeholder={'Search...'}/>
                    <button onClick={startSearch}>let's go</button>
                </div>
            </div>
            <p className={css.border}></p>
        </section>
    );
};

export {Navbar};