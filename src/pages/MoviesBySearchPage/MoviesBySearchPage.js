import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";

import css from './MoviesBySearchPage.module.css'
import {appActions} from "../../redux";
import {asyncSearchActions} from "../../redux/slices";
import {Scale, Loader, MoviesList} from "../../components";

const MoviesBySearchPage = () => {
    const {totalPages, moviesList, searchKey, isLoading, errors} = useSelector(state => state.searchReducer);
    const {isNextPageEmpty, isPrevPageEmpty, inputValue} = useSelector(state => state.appReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [params, setParams] = useSearchParams({page: '1'});
    const currentPage = params.get('page');

    useEffect(() => {
        dispatch(appActions.resetButtonsDisable());
        dispatch(asyncSearchActions.searchMovies({searchKey: inputValue, page: currentPage}));

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
        setParams(value => ({keyword: searchKey, page: +value.get('page') + 1}));
        window.scrollTo({top: 340, left: 0, behavior: 'smooth'})
    };
    const prevPage = () => {
        setParams(value => ({keyword: searchKey, page: value.get('page') - 1}));
        window.scrollTo({top: 340, left: 0, behavior: 'smooth'})
    };

    const home = () => navigate('/');

    return (
        <section className={css.MoviesBySearchPage}>
            {errors && <Scale><p className={css.errors}> {errors} </p></Scale>}

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

export {MoviesBySearchPage};