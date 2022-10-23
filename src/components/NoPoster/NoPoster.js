import React from 'react';

import css from './NoPoster.module.css'

const NoPoster = () => {
    return (
        <section className={css.NoPoster}>
            <img src={require('./no_image.png')} alt={'no_image'}/>
        </section>
    );
};

export {NoPoster};