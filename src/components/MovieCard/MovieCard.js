import React from 'react';

import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import css from './MovieCard.module.css'
import ReactStars from "react-rating-stars-component/dist/react-stars";
import {GenreBadge, PosterPreview, NoPoster, FadeIn} from "../index";

const MovieCard = ({movie}) => {
    const {title, poster_path, genre_ids} = movie;

    const {genres} = useSelector(state => state.genresReducer);
    const navigate = useNavigate();

    const moviePath = movie.title.toLowerCase().replaceAll(' ', '_').replace(':', '');

    const ratingStars = {
        count: 10,
        size: 15,
        value: movie.vote_average,
        edit: false,
        isHalf: true,
    };

    const namedGenres = []

    genres.forEach(item => {
        if (genre_ids.includes(item.id)) {
            namedGenres.push(item.name)
        }
    })

    const movieInfo = () => {
        navigate(`/movies/info/${moviePath}`, {state: {movie: movie, genres: namedGenres}});
        window.scrollTo({top: 50, left: 0, behavior: 'smooth'});
    };

    return (
        <FadeIn>
            <section className={css.MovieCard} onClick={movieInfo}>
                <div className={css.ratingSection}>
                    <ReactStars classNames={css.rating} {...ratingStars}/>
                </div>

                {poster_path
                    ? <PosterPreview path={poster_path}/>
                    : <NoPoster/>
                }

                <div className={css.info}>
                    <p>{title}</p>
                    <p className={css.border}></p>
                    <div className={css.badgesSection}>
                        {namedGenres.map((item, index) => <GenreBadge key={index + 1}> {item} </GenreBadge>)}
                    </div>

                </div>
            </section>
        </FadeIn>
    );
};

export {MovieCard};