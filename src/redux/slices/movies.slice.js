import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {moviesService} from "../../services";

const initialState = {
    moviesList: [],
    totalPages: null,
    isLoading: false,
    errors: null
};

const getAll = createAsyncThunk(
    'moviesSlice/getAllMovies',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getMovies(page)
            return data
        } catch (e) {
            return rejectWithValue(`${e.message} ;(`)
        }
    }
);

const moviesSlice = createSlice({
    name: 'moviesSlice',
    initialState,
    extraReducers: builder => builder
        .addCase(getAll.pending, state => {
            state.isLoading = true
        })
        .addCase(getAll.fulfilled, (state, {payload}) => {
            state.moviesList = payload.results
            state.totalPages = payload.total_pages.toString()
            state.isLoading = false
        })
        .addCase(getAll.rejected, (state, {payload}) => {
            state.errors = payload
            state.isLoading = false
        })
});

export const {reducer: moviesReducer} = moviesSlice;

export const asyncMoviesActions = {getAll};
