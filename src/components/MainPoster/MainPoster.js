import React from 'react';

import css from './MainPoster.module.css'

const MainPoster = () => {
    return (
        <section>
            <div className={css.MainPoster}>
                <img src={require('./poster1.jpeg')} alt="main_poster1"/>
                <img src={require('./poster2.jpeg')} alt="main_poster2"/>
            </div>
        </section>
    );
};

export {MainPoster};