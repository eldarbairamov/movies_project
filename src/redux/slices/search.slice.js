import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {moviesService} from "../../services";

const initialState = {
    moviesList: [],
    searchKey: null,
    totalPages: null,
    isLoading: false,
    errors: null
};

const searchMovies = createAsyncThunk(
    'searchingSlice/searchMovies',
    async ({searchKey, page}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.searchMovies(searchKey, page)
            return data
        } catch (e) {
            return rejectWithValue(`${e.message} ;(`)
        }
    }
);

const searchSlice = createSlice({
    name: 'searchingSlice',
    initialState,
    reducers: {
        setSearchKey: (state, {payload}) => {
            state.searchKey = payload.replaceAll(' ', '_')
        }
    },
    extraReducers: builder => builder
        .addCase(searchMovies.pending, (state) => {
            state.isLoading = true
        })
        .addCase(searchMovies.fulfilled, (state, {payload}) => {
            state.moviesList = payload.results
            state.totalPages = payload.total_pages.toString()
            state.isLoading = false
        })
        .addCase(searchMovies.rejected, (state, {payload}) => {
            state.isLoading = false
            state.errors = payload
        })
});

const {reducer: searchReducer, actions: {setSearchKey}} = searchSlice;

export {searchReducer};
export const searchActions = {setSearchKey};
export const asyncSearchActions = {searchMovies, setSearchKey};
