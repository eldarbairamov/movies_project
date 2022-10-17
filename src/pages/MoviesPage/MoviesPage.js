import React, {useEffect} from 'react';

import css from './MoviesPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {asyncMoviesActions, moviesActions} from "../../redux";
import {useSearchParams} from "react-router-dom";
import {MoviesList} from "../../components";

const MoviesPage = () => {
    const {
        totalPages,
        isPrevPageEmpty,
        isNextPageEmpty,
        searchMode,
        genresMode,
        inputValue,
        currentGenreId
    } = useSelector(store => store.moviesReducer);
    const dispatch = useDispatch();

    const [params, setParams] = useSearchParams({page: '1'})
    const currentPage = params.get('page')

    useEffect(() => {
        // В этой секции я старался реализовать пагинацию вне зависимости от контекста, будь то результат поиска или выборка по жанрам
        dispatch(moviesActions.resetButtonsDisable())

        if (genresMode) {
            dispatch(asyncMoviesActions.getMoviesByGenre({genreId: currentGenreId, page: currentPage}))
        } else if (searchMode) {
            dispatch(asyncMoviesActions.searchMovies({searchKey: inputValue, page: currentPage}))
        } else dispatch(asyncMoviesActions.getAll({page: currentPage}))

        if (currentPage === '1') dispatch(moviesActions.prevPageEmpty())
        else if (currentPage === totalPages) dispatch(moviesActions.nextPageEmpty())
        else dispatch(moviesActions.resetButtonsDisable())
    }, [currentPage])

    const nextPage = () => {
        setParams(value => ({page: +value.get('page') + 1}))
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
    const prevPage = () => {
        setParams(value => ({page: value.get('page') - 1}))
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    const backHome = () => {
        dispatch(asyncMoviesActions.getAll({page: '1'}))
        setParams()
    }

    return (
        <section className={css.MoviesPage}>
            <MoviesList/>
            <div className={css.pageButtons}>
                <button disabled={isPrevPageEmpty} onClick={prevPage}>back</button>
                <button onClick={backHome}>main</button>
                <button disabled={isNextPageEmpty} onClick={nextPage}>next</button>
            </div>
        </section>
    );
};

export {MoviesPage};