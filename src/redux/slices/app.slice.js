import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    switchThemeMode: false,
    searchMode: false,
    genresMode: false,
    isPrevPageEmpty: false,
    isNextPageEmpty: false,
    isSignIn: true,
    inputValue: ''
};

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        prevPageEmpty: (state) => {
            state.isPrevPageEmpty = true
        },
        nextPageEmpty: (state) => {
            state.isNextPageEmpty = true
        },
        resetButtonsDisable: (state) => {
            state.isNextPageEmpty = false
            state.isPrevPageEmpty = false
        },
        switchTheme: (state, {payload}) => {
            state.switchThemeMode = payload
        },
        setInputValue: (state, {payload}) => {
            state.inputValue = payload
        },
        setSearchMode: (state, {payload}) => {
            state.searchMode = payload
        },
        setGenreMode: (state, {payload}) => {
            state.genresMode = payload
        },
        resetSearchValue: (state) => {
            state.inputValue = ''
        },
        signIn: (state, {payload}) => {
            state.isSignIn = payload
        },
    }
});

const {reducer: appReducer,
    actions: {
        switchTheme,
        setSearchMode,
        setGenreMode,
        setInputValue,
        resetButtonsDisable,
        nextPageEmpty,
        prevPageEmpty,
        resetSearchValue,
        signIn
    }
} = appSlice;

export {appReducer};

export const appActions = {
    resetButtonsDisable,
    nextPageEmpty,
    prevPageEmpty,
    switchTheme,
    setInputValue,
    setGenreMode,
    setSearchMode,
    resetSearchValue,
    signIn
};
