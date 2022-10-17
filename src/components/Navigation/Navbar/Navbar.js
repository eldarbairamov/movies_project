import React from 'react';

import css from './Navbar.module.css'
import night from './NightNavbar.module.css'

import {useDispatch, useSelector} from "react-redux";
import {appActions} from "../../../redux";

const Navbar = () => {
    const {switchThemeMode} = useSelector(store => store.appReducer)
    const text = !switchThemeMode ? css.text : night.text

    const dispatch = useDispatch();

    const switchTheme = () => dispatch(appActions.switchTheme(!switchThemeMode))

    return (
        <section>
            <div className={css.Navbar}>

                <div className={css.title}>
                    <p>okten movies hub</p>
                </div>

                <div className={css.switcher} onClick={switchTheme}>
                    <p className={text}>switch</p>
                    {!switchThemeMode
                        ? <img src={require('./moon.png')} alt="moon"/>
                        : <img src={require('./sun.png')} alt="sun"/>
                    }
                    <p className={text}>me</p>
                </div>
            </div>
        </section>
    );
};

export {Navbar};