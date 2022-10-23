import React from 'react';

import {ColorRing} from "react-loader-spinner";
import css from './Loader.module.css'

const Loader = () => {
    return (
        <section className={css.Loader}>
            <ColorRing
                visible={true}
                height="140"
                width="140"
                ariaLabel="blocks-loading"
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </section>
    );
};

export {Loader};