import React from 'react';

import "./App.css"
import {Navigate, Route, Routes} from "react-router";
import {MainLayout} from "./layouts";
import {MoviesPage} from "./pages";

const App = () => {
    return (
        <section>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route index element={<Navigate to={'/movies'}/>}/>
                    <Route path={'/movies'} element={<MoviesPage/>}/>
                </Route>
            </Routes>
        </section>
    );
};

export {App};