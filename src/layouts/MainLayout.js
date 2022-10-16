import React from 'react';

import {Outlet} from "react-router";
import {Genres, Navbar} from "../components";
import css from './MainLayout.module.css'

const MainLayout = () => {
    return (
        <section>
            <Navbar/>
            <Genres/>
            <div className={css.outlet}>
                <Outlet/>
            </div>
        </section>
    );
};

export {MainLayout};