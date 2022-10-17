import React from 'react';

const PosterPreview = ({path}) => {
    return (
        <section>
            <img src={`https://image.tmdb.org/t/p/w500${path}`} alt="movie_poster"/>
        </section>
    );
};

export {PosterPreview};