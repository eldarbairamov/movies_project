import React from 'react';

import css from './MovieCard.module.css'
import {useSelector} from "react-redux";

const MovieCard = ({movie}) => {
    const {title, release_date} = movie;

    const {genres} = useSelector(store => store.moviesReducer);

    const dirtyGenres = movie.genre_ids
    const cleanGenres = []
    for (let i = 0; i < genres.length; i++) {
        for (let j = 0; j < dirtyGenres.length; j++) {
            if (dirtyGenres[j] === genres[i].id) {
                cleanGenres.push(genres[i].name)
            }
        }
    }
    const genresStr = cleanGenres.join(' ')

    return (
        <section className={css.MovieCard}>
            <p>{title}</p>
            <p>Genres: {genresStr}</p>
            <p>Release Date: {release_date}</p>
        </section>
    );
};

export {MovieCard};