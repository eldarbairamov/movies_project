import React from 'react';

import css from './MoviesList.module.css'
import {MovieCard} from "../MovieCard/MovieCard";

const MoviesList = ({movies}) => {
    return (
        <section className={css.MoviesList}>
            {movies.map(item => <MovieCard movie={item} key={item.id}/>)}
        </section>
    );
};

export {MoviesList};