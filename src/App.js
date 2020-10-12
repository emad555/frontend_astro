import React, { useState, useEffect, useContext } from 'react';
import AppContext from './AppContext';
import { BrowserRouter, Redirect, Route, Switch, Link } from 'react-router-dom';
import LayoutRoute from './LayoutRoute';
import MainScreen from './MainScreen'; 
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import RegistrationScreen from './RegistrationScreen';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';

const PrivateRoute = (props) => {

    const [globalState, setGlobalState] = useContext(AppContext);
    
    // If user logged in, let them through
    if(globalState.loggedIn) {
        return(
            <LayoutRoute path={props.path} exact={props.exact} component={props.component}/>
        )

    // Otherwise, send them to /login    
    } else {
        return(
            <Redirect to="/login" />
        )
    }
}


const App = () => {

    const [ globalState, setGlobalState ] = useState(
        {
            user: {},
            loggedIn: localStorage.getItem('token') ? true : false,
            color: 'red'
        }
    );

    useEffect(
        () => {
            if(globalState.loggedIn === true) {
                localStorage.setItem('token', globalState.user.token)
            } else {
                localStorage.clear()
            }
        },
        [ globalState.loggedIn ]
    )

    return (
        <AppContext.Provider value={[globalState, setGlobalState]}>
            <BrowserRouter>
                <Switch>
                    <LayoutRoute path="/" exact={true} component={MainScreen} />
                    <LayoutRoute path="/about" exact={true} component={AboutScreen} />
                    <LayoutRoute path="/contact" exact={true} component={ContactScreen} />
                    <LayoutRoute path="/registration" exact={true} component={RegistrationScreen} />
                    <LayoutRoute path="/login" exact={true} component={LoginScreen} /> 
                    <PrivateRoute path="/profile" exact={true} component={ProfileScreen} /> 
                </Switch>
            </BrowserRouter>
        </AppContext.Provider>
    )
}

export default App;