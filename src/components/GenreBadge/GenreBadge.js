import React from 'react';

import css from './GenreBadge.module.css'

const GenreBadge = ({children}) => {
    return (
        <section className={css.GenreBadge}>
            {children}
        </section>
    );
};

export {GenreBadge};