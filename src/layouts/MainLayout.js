import React from 'react';

import {Outlet} from "react-router";
import {useSelector} from "react-redux";

import {Genres, MainPoster, Navbar, SearchBar} from "../components";
import css from './MainLayout.module.css'

const MainLayout = () => {
    const {switchThemeMode} = useSelector(state => state.appReducer);

    return (
        <section className={css.MainLayout} data-theme={switchThemeMode}>
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