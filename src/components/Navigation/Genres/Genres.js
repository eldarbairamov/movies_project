import React, {useEffect} from 'react';

import css from './Genres.module.css'
import {useDispatch, useSelector} from "react-redux";
import {asyncMoviesActions, moviesActions} from "../../../redux";
import {useSearchParams} from "react-router-dom";

const Genres = () => {
    const {genres} = useSelector(store => store.moviesReducer);
    const dispatch = useDispatch();

    const [, setParams] = useSearchParams({page: '1'})

    useEffect(() => {
        dispatch(asyncMoviesActions.getGenres())
    }, [dispatch])

    const getMovieByGenre = (id) => {
        dispatch(asyncMoviesActions.getMoviesByGenre({genreId: id}))
        dispatch(moviesActions.setCurrentGenreId(id))
        setParams()
    }

    return (
        <section className={css.Genres}>
            {genres.map(item =>
                <button key={item.id} onClick={() => getMovieByGenre(item.id)} className={css.genresTitle}> {item.name} </button>)}
        </section>
    );
};

export {Genres};