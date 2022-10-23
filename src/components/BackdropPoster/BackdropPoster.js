import React from 'react';

import css from './BackdropPoster.module.css'

const BackdropPoster = ({path}) => {
    return (
        <section className={css.BackdropPoster}>
            <img src={`https://image.tmdb.org/t/p/w500${path}`} alt="movie_poster"/>
        </section>
    );
};

export {BackdropPoster};