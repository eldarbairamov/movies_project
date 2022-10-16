import React, {useEffect} from 'react';

import css from './MoviesPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {asyncMoviesActions, moviesActions} from "../../redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {MoviesList} from "../../components";

const MoviesPage = () => {
    const {
        totalPages,
        isPrevPageEmpty,
        isNextPageEmpty,
        searchMode,
        genresMode,
        searchKey,
        currentGenreId
    } = useSelector(store => store.moviesReducer);
    const dispatch = useDispatch();

    const [params, setParams] = useSearchParams({page: '1'})
    const currentPage = params.get('page')

    useEffect(() => {
        if (searchMode) dispatch(asyncMoviesActions.searchMovies({searchKey: searchKey, page: currentPage}))
        else if (genresMode) dispatch(asyncMoviesActions.getMoviesByGenre({genreId: currentGenreId, page: currentPage}))
        else {
            dispatch(asyncMoviesActions.getAll({page: currentPage}))
            setParams()
        }

        if (currentPage === '1') dispatch(moviesActions.prevPageEmpty())
        else if (currentPage === totalPages) dispatch(moviesActions.nextPageEmpty())
        else dispatch(moviesActions.resetDisable())
    }, [currentPage])

    const nextPage = () => setParams(value => ({page: +value.get('page') + 1}))
    const prevPage = () => setParams(value => ({page: value.get('page') - 1}))

    return (
        <section className={css.MoviesPage}>
            <MoviesList/>
            <div className={css.pageButtons}>
                <button disabled={isPrevPageEmpty} onClick={prevPage}>prev page</button>
                <button disabled={isNextPageEmpty} onClick={nextPage}>next page</button>
            </div>
        </section>
    );
};

export {MoviesPage};