import {configureStore} from "@reduxjs/toolkit";

import {appReducer, genresReducer, moviesReducer, searchReducer} from "../slices";

export const store = configureStore({
    reducer: {
        moviesReducer,
        genresReducer,
        appReducer,
        searchReducer
    }
});