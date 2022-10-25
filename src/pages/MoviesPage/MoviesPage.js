import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";

import css from './MoviesPage.module.css'
import {appActions, asyncMoviesActions} from "../../redux";
import {Scale, Loader, MoviesList} from "../../components";

const MoviesPage = () => {
    const {totalPages, moviesList, errors, isLoading} = useSelector(state => state.moviesReducer);
    const {isPrevPageEmpty, isNextPageEmpty} = useSelector(state => state.appReducer);

    const dispatch = useDispatch();

    const [params, setParams] = useSearchParams({page: '1'});
    const currentPage = params.get('page');

    useEffect(() => {
        dispatch(appActions.resetButtonsDisable());
        dispatch(appActions.resetSearchValue());
        dispatch(asyncMoviesActions.getAll({page: currentPage}));

        if (currentPage === '1') {
            dispatch(appActions.prevPageEmpty());
        }
        else if (currentPage === totalPages) {
            dispatch(appActions.nextPageEmpty());
        }
        else {
            dispatch(appActions.resetButtonsDisable());
        }
    }, [currentPage]);

    const nextPage = () => {
        setParams(value => ({page: +value.get('page') + 1}));
        window.scrollTo({top: 340, left: 0, behavior: 'smooth'})
    };
    const prevPage = () => {
        setParams(value => ({page: value.get('page') - 1}));
        window.scrollTo({top: 340, left: 0, behavior: 'smooth'})
    };

    return (
        <section className={css.MoviesPage}>
            {errors && <Scale><p className={css.errors}> {errors} </p></Scale>}

            {isLoading
                ? <Loader/>
                : <MoviesList movies={moviesList}/>
            }

            {!errors &&
                <div className={css.pageButtons} data-loading={isLoading}>
                    <button disabled={isPrevPageEmpty} onClick={prevPage}>back</button>
                    <button disabled={isNextPageEmpty} onClick={nextPage}>next</button>
                </div>
            }
        </section>
    );
};

export {MoviesPage};