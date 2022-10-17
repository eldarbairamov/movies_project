import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    switchThemeMode: false
}

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        switchTheme: (state, {payload}) => {
            state.switchThemeMode = payload
        }
    }
});

export const {reducer: appReducer, actions: {switchTheme}} = appSlice
export const appActions = {
    switchTheme
}
