import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import css from './Genres.module.css'
import {appActions} from "../../../redux";
import {asyncGenresActions, genresActions} from "../../../redux/slices";

const Genres = () => {
    const {genres} = useSelector(state => state.genresReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(asyncGenresActions.getGenres())
    }, [dispatch]);

    const getMovieByGenre = (id, name) => {
        const moviePath = name.toLowerCase().replaceAll(' ', '_');

        dispatch(asyncGenresActions.getMoviesByGenre({genreId: id}));
        dispatch(genresActions.setCurrentGenreId(id));
        dispatch(appActions.setGenreMode(true));
        dispatch(appActions.setSearchMode(false));
        dispatch(appActions.resetSearchValue());

        navigate(`/genres/${moviePath}`);
    };

    return (
        <section className={css.Genres}>
            {genres.map(item =>
                <button key={item.id} onClick={() => getMovieByGenre(item.id, item.name)}
                        className={css.genresTitle}> {item.name} </button>)}
        </section>
    );
};

export {Genres};