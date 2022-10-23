import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {moviesService} from "../../services";

const initialState = {
    moviesList: [],
    genres: [],
    totalPages: null,
    currentGenreId: null,
    isLoading: false,
    errors: null
};

const getGenres = createAsyncThunk(
    'genresSlice/getGenres',
    async (_, {rejectWithValue}) => {
        try {
            const {data: {genres}} = await moviesService.getGenres()
            return genres
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
);

const getMoviesByGenre = createAsyncThunk(
    'genresSlice/getMoviesByGenre',
    async ({genreId, page}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getMoviesByGenre(genreId, page)
            return data
        } catch (e) {
            return rejectWithValue(`${e.message} ;(`)
        }
    }
);

const genresSlice = createSlice({
    name: 'genresSlice',
    initialState,
    reducers: {
        setCurrentGenreId: (state, {payload}) => {
            state.currentGenreId = payload
        }
    },
    extraReducers: builder => builder
        .addCase(getGenres.fulfilled, (state, {payload}) => {
            state.genres = payload
            state.errors = null
        })
        .addCase(getMoviesByGenre.pending, (state) => {
            state.errors = null
            state.isLoading = true
        })
        .addCase(getMoviesByGenre.fulfilled, (state, {payload}) => {
            state.moviesList = payload.results
            state.totalPages = payload.total_pages.toString()
            state.isLoading = false
            state.errors = null
        })
        .addCase(getMoviesByGenre.rejected, (state, {payload}) => {
            state.isLoading = false
            state.errors = payload
        })
});

const {reducer: genresReducer, actions: {setCurrentGenreId, setNamedGenres}} = genresSlice;

export {genresReducer};
export const asyncGenresActions = {getGenres, getMoviesByGenre};
export const genresActions = {setCurrentGenreId, setNamedGenres};