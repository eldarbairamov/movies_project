import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {moviesService} from "../../services";

const initialState = {
    moviesList: [],
    genres: [],
    isPrevPageEmpty: false,
    isNextPageEmpty: false,
    searchMode: false,
    searchKey: null,
    totalPages: null,
    genresMode: false,
    currentGenreId: null
}

const getAll = createAsyncThunk(
    'moviesSlice/getAllMovies',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getMovies(page)
            return data
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
);


const searchMovies = createAsyncThunk(
    'moviesSlice/searchMovies',
    async ({searchKey, page}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.searchMovies(searchKey, page)
            return data
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const getGenres = createAsyncThunk(
    'movieSlice/getGenres',
    async (_, {rejectWithValue}) => {
        try {
            const {data: {genres}} = await moviesService.getGenres()
            return genres
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const getMoviesByGenre = createAsyncThunk(
    'movieSlice/getMoviesByGenre',
    async ({genreId, page}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getMoviesByGenre(genreId, page)
            return data
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const moviesSlice = createSlice({
    name: 'moviesSlice',
    initialState,
    reducers: {
        prevPageEmpty: (state ) => {
            state.isPrevPageEmpty = true
        },
        nextPageEmpty: (state) => {
            state.isNextPageEmpty = true
        },
        resetDisable: (state) => {
            state.isNextPageEmpty = false
            state.isPrevPageEmpty = false
        },
        setSearchKey: (state, {payload}) => {
            state.searchKey = payload
        },
        setCurrentGenreId: (state, {payload}) => {
            state.currentGenreId = payload
        }
    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, {payload}) => {
            state.moviesList = payload.results
            state.totalPages = payload.total_pages.toString()
        })
        .addCase(getGenres.fulfilled, (state, {payload}) => {
            state.genres = payload
        })
        .addCase(searchMovies.fulfilled, (state, {payload}) => {
            state.searchMode = true
            state.moviesList = payload.results
            state.totalPages = payload.total_pages.toString()
        })
        .addCase(getMoviesByGenre.fulfilled, (state, {payload}) => {
            state.genresMode = true
            state.moviesList = payload.results
            state.totalPages = payload.total_pages.toString()
        })
});

export const {reducer: moviesReducer, actions: {prevPageEmpty, nextPageEmpty, resetDisable, setSearchKey, setCurrentGenreId}} = moviesSlice
export const asyncMoviesActions = {getAll, getGenres, searchMovies, getMoviesByGenre}
export const moviesActions = {prevPageEmpty, nextPageEmpty, resetDisable, setSearchKey, setCurrentGenreId}