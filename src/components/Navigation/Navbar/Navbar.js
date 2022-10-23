import React from 'react';

import {useDispatch, useSelector} from "react-redux";

import css from './Navbar.module.css'
import {appActions} from "../../../redux";
import {UserInfo} from "../../UserInfo/UserInfo";
import {AnimatedScale} from "../../UI/Animated.scale/Animated.scale";
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
                <AnimatedScale>
                    <div onClick={() => navigate('/')} className={css.title}><p>okten movies hub</p></div>
                </AnimatedScale>

                {isSignIn && <UserInfo/>}

                {!isSignIn &&
                    <AnimatedScale>
                        <div className={css.signSection} onClick={signIn}>
                            <p className={css.signIn} data-theme={switchThemeMode}>sign in</p>
                            <img className={css.hello} src={require('./hello.png')} alt=""/>
                        </div>
                    </AnimatedScale>}

                <div className={css.switcher} onClick={switchTheme}>
                    <p className={css.switchText} data-theme={switchThemeMode}>switch</p>

                    {!switchThemeMode && <AnimatedScale><img src={require('./moon.png')} alt="moon"/></AnimatedScale>}
                    {switchThemeMode && <AnimatedScale><img src={require('./sun.png')} alt="sun"/></AnimatedScale>}
                </div>
            </div>
        </section>
    );
};

export {Navbar};