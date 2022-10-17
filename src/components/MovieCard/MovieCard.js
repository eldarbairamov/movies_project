import React from 'react';

import css from './MovieCard.module.css'
import {useSelector} from "react-redux";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import {PosterPreview} from "../PosterPreview/PosterPreview";
import {GenreBadge} from "../GenreBadge/GenreBadge";

const MovieCard = ({movie}) => {
    const {title, backdrop_path} = movie;
    const {genres} = useSelector(store => store.moviesReducer);

    const firstExample = {
        count: 10,
        size: 15,
        value: movie.vote_average,
        edit: false,
        isHalf: true,
    };

    const currentMovieGenres = movie.genre_ids
    const namedGenres = []

    for (let i = 0; i < genres.length; i++) {
        for (let j = 0; j < currentMovieGenres.length; j++) {
            if (currentMovieGenres[j] === genres[i].id) {
                namedGenres.push(genres[i].name)
            }
        }
    }

    return (
        <section className={css.MovieCard}>
            <div className={css.ratingSection}>
                <ReactStars classNames={css.rating} {...firstExample}/>
            </div>

            {backdrop_path
                ? <PosterPreview path={backdrop_path}/>
                : <img className={css.noImage} src={require('./no_image.png')} alt={'no_image'}/>
            }

            <div className={css.info}>
                <p>{title}</p>
                <p className={css.border}></p>
                <div className={css.badgesSection}>
                    {namedGenres.map((item, index) => <GenreBadge key={index + 1}> {item} </GenreBadge>)}
                </div>

            </div>

        </section>
    );
};

export {MovieCard};