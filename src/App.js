import React from 'react';

import {Navigate, Route, Routes} from "react-router";

import "./App.css"
import {MainLayout} from "./layouts";
import {MoviesByGenrePage, MoviesBySearchPage, MoviesPage} from "./pages";
import {MovieInfo} from "./components";

const App = () => {
    return (
        <section>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route index element={<Navigate to={'/movies'}/>}/>
                    <Route path={'/movies'} element={<MoviesPage/>}/>
                    <Route path={'/genres/:id'} element={<MoviesByGenrePage/>}/>
                    <Route path={'/movies/:id'} element={<MoviesBySearchPage/>}/>
                    <Route path={'/movies/info/:id'} element={<MovieInfo/>}/>
                </Route>
            </Routes>
        </section>
    );
};

export {App};