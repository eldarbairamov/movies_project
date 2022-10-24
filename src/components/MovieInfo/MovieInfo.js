import React from 'react';

import {useSelector} from "react-redux";
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";

import css from './MovieInfo.module.css'
import {BackdropPoster} from "../BackdropPoster/BackdropPoster";
import ReactStars from "react-rating-stars-component";
import {GenreBadge} from "../GenreBadge/GenreBadge";
import {AnimatedFadeIn} from "../UI/Animated.fadeIn/Animated.fadeIn";
import {NoPoster} from "../NoPoster/NoPoster";


const MovieInfo = () => {
    const {switchThemeMode} = useSelector(state => state.appReducer);

    const {state} = useLocation();
    const navigate = useNavigate();

    const ratingStars = {
        count: 10,
        size: 25,
        value: state.movie.vote_average,
        edit: false,
        isHalf: true,
    };

    const back = () => navigate(-1);

    return (
        <section className={css.MovieInfo}>
            <AnimatedFadeIn>
                <div className={css.content}>
                    {state.movie.backdrop_path
                        ? <div className={css.poster}><BackdropPoster path={state.movie.backdrop_path}/></div>
                        : <div className={css.noPoster}><NoPoster/></div>
                    }

                    <div className={css.details} data-theme={switchThemeMode}>
                        <p>Original title | <b>{state.movie.original_title}</b></p>
                        <p>Language | <b>{state.movie.original_language}</b></p>
                        <p>Release date | <b>{state.movie.release_date}</b></p>

                        <ReactStars classNames={css.rating} {...ratingStars}/>

                        <p className={css.overview}>{state.movie.overview}</p>

                        <div className={css.badgesSection}>
                            {state.genres.map((item, index) => <GenreBadge key={index + 1}> {item} </GenreBadge>)}
                        </div>
                    </div>
                </div>
            </AnimatedFadeIn>
            <div className={css.pageButtons}>
                <button onClick={back}>back</button>
            </div>
        </section>
    );
};

export {MovieInfo};