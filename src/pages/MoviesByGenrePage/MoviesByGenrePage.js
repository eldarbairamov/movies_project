import React, {useEffect} from 'react';

import {useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import css from './MoviesByGenrePage.module.css'
import {appActions} from "../../redux";
import {asyncGenresActions} from "../../redux/slices";
import {AnimatedScale, Loader, MoviesList} from "../../components";

const MoviesByGenrePage = () => {
    const {currentGenreId, totalPages, moviesList, errors, isLoading} = useSelector(state => state.genresReducer);
    const {isNextPageEmpty, isPrevPageEmpty} = useSelector(state => state.appReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [params, setParams] = useSearchParams({page: '1'});
    const currentPage = params.get('page');

    useEffect(() => {
        dispatch(appActions.resetButtonsDisable());
        dispatch(asyncGenresActions.getMoviesByGenre({genreId: currentGenreId, page: currentPage}));

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
    }
    const prevPage = () => {
        setParams(value => ({page: value.get('page') - 1}));
        window.scrollTo({top: 340, left: 0, behavior: 'smooth'})
    }

    const home = () => navigate('/');

    return (
        <section className={css.MoviesByGenrePage}>
            {errors && <AnimatedScale><p className={css.errors}> {errors} </p></AnimatedScale>}

            {isLoading
                ? <Loader/>
                : <MoviesList movies={moviesList}/>
            }

            {!errors &&
                <div className={css.pageButtons} data-loading={isLoading}>
                    <button disabled={isPrevPageEmpty} onClick={prevPage}>back</button>
                    <button onClick={home}>home</button>
                    <button disabled={isNextPageEmpty} onClick={nextPage}>next</button>
                </div>
            }
        </section>
    );
};

export {MoviesByGenrePage};