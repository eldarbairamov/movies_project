import React from 'react';

import {useDispatch, useSelector} from "react-redux";

import css from './UserInfo.module.css'
import {appActions} from "../../redux";
import {Scale} from "../UI/animations/Scale/Scale";

const UserInfo = () => {
    const {switchThemeMode} = useSelector(state => state.appReducer);

    const dispatch = useDispatch();

    const signInOut = () => dispatch(appActions.signIn(false));

    return (
        <Scale>
            <section className={css.UserInfo} data-theme={switchThemeMode}>
                <img src={require('./user.png')} alt="user"/>
                <p className={css.blinker} data-theme={switchThemeMode}>hello</p>
                <p className={css.name} data-theme={switchThemeMode}>eldar</p>
                <p> | </p>
                <p className={css.signOut} data-theme={switchThemeMode} onClick={signInOut}>sign out </p>
            </section>
        </Scale>
    );
};

export {UserInfo};