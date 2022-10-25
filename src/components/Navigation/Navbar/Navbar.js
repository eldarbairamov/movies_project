import React from 'react';

import {useDispatch, useSelector} from "react-redux";

import css from './Navbar.module.css'
import {appActions} from "../../../redux";
import {UserInfo} from "../../UserInfo/UserInfo";
import {Scale} from "../../UI/animations/Scale/Scale";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const {switchThemeMode, isSignIn} = useSelector(state => state.appReducer)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const switchTheme = () => dispatch(appActions.switchTheme(!switchThemeMode));
    const signIn = () => dispatch(appActions.signIn(true));

    return (
        <section>
            <div className={css.Navbar}>
                <Scale>
                    <div onClick={() => navigate('/')} className={css.title}><p>okten movies hub</p></div>
                </Scale>

                {isSignIn && <UserInfo/>}

                {!isSignIn &&
                    <Scale>
                        <div className={css.signSection} onClick={signIn}>
                            <p className={css.signIn} data-theme={switchThemeMode}>sign in</p>
                            <img className={css.hello} src={require('./hello.png')} alt=""/>
                        </div>
                    </Scale>}

                <div className={css.switcher} onClick={switchTheme}>
                    <p className={css.switchText} data-theme={switchThemeMode}>switch</p>

                    {!switchThemeMode && <Scale><img src={require('./moon.png')} alt="moon"/></Scale>}
                    {switchThemeMode && <Scale><img src={require('./sun.png')} alt="sun"/></Scale>}
                </div>
            </div>
        </section>
    );
};

export {Navbar};