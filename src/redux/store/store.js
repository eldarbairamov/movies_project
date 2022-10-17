import {configureStore} from "@reduxjs/toolkit";

import {appReducer, moviesReducer} from "../slices";

export const store = configureStore({
    reducer: {
        moviesReducer,
        appReducer
    }
});