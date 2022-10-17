import React from 'react';

import {Outlet} from "react-router";
import {useSelector} from "react-redux";

import {Genres, MainPoster, Navbar, SearchBar} from "../components";
import css from './MainLayout.module.css'
import dark from './NightMainLayout.module.css'

const MainLayout = () => {
    const {switchThemeMode} = useSelector(store => store.appReducer);
    const theme = !switchThemeMode ? css.MainLayout : dark.MainLayout

    return (
        <section className={theme}>
            <Navbar/>
            <Genres/>
            <MainPoster/>
            <SearchBar/>
            <div className={css.outlet}>
                <Outlet/>
            </div>
        </section>
    );
};

export {MainLayout};