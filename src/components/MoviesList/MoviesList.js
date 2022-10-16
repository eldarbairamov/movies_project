import React from 'react';

import css from './MoviesList.module.css'
import {MovieCard} from "../MovieCard/MovieCard";
import {useSelector} from "react-redux";

const MoviesList = () => {
    const {moviesList} = useSelector(store => store.moviesReducer)

    return (
        <section className={css.MoviesList}>
            {moviesList.map(item => <MovieCard movie={item} key={item.id}/>)}
        </section>
    );
};

export {MoviesList};