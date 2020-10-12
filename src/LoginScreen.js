import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from './AppContext';
import NavBar from './NavBar';
import { validEmail, validPassword } from './utils';

const LoginScreen = () => {

    const [globalState, setGlobalState] = useContext(AppContext);

    const [state, setState] = useState(
        {
            errors: [],
            preloader: false,
            success: false
        }
    )

    // All the registration data will go here
    const formData = new FormData();

    // Declare (not define) variables for React
    let emailField;
    let passwordField;
    let submitButton;

    const loginUser = () => {
        let errorMessages = [];
        // Validate email & password
        if(!validEmail(emailField.value)) {
            errorMessages.push("Please enter your email!");
        }
        if(!validPassword(passwordField.value)) {
            errorMessages.push("Please enter a password!");
        }
        // Change the state for error (if any errors)
        if(errorMessages.length > 0) {
            setState(
                {
                    ...state,
                    errors: errorMessages
                }
            )
        }

        // Proceed with fetch function (if no errors)
        else {

            setState(
                {
                    ...state,
                    preloader: true
                }
            )
            // Populate formData with user login details
            formData.append('email', emailField.value);
            formData.append('password', passwordField.value);

            // do fetch
            fetch(`${process.env.REACT_APP_API_URL}users/login`,
            {
                method: 'POST',
                //headers: { "Content-Type": "application/json" },
                body: formData
            })
            .then(
                (response)=>response.json()
            )
            .then(
                (response)=> {
                    // Save the token in the browser
                    const token = response.token;

                    // If backend rejects login attempt
                    if(!response.token) {
                        setState(
                            {
                                ...state,
                                errors: [ response.msg ]
                            }
                        )
                    } 
                    // Set globalState for loggedIn to trye
                    else {
                        setGlobalState(
                            {
                                ...globalState,
                                loggedIn: true,
                                user: {
                                    ...globalState.user,
                                    token: token
                                },
                            }
                        )
                    }
                }
            )
            .catch(
                (e) => {
                    console.log('e', e);
                    setState(
                        {
                            ...state,
                            preloader: false,
                            errors: ['Something went wrong. Please try again.']
                        }
                    )
                }
            )
        }
    }


    // If logged in, send user MainScreen
    if(globalState.loggedIn) {
        return (
            <Redirect to="/" />
        )
    }

    // Otherwise, show user the login form
    else {
        return (
            <div className="screen">
                <div className="container" 
                    style={
                        {
                            marginTop: "5em", 
                            maxWidth: "40em"
                        }
                    }>

                    <h1>Login to your Account</h1>
                    <br/>

                    { state.errors.length > 0 &&
                    <div className="error-message">
                        <ol>
                        { 
                            state.errors.map(
                                (error) => <li>{error}</li>
                            ) 
                        }
                        </ol>
                    </div>
                    }

                    { state.preloader &&
                        <div className="preloader">Loading...</div>
                    }

                    { state.success &&
                        <div className="alert alert-success">Successfully Logged In</div>
                    }

                    <label>Enter your email *</label>
                    <input ref={(comp)=>emailField = comp} className="field form-control" name="email" type="text" />

                    <label>Enter a password *</label>
                    <input ref={(comp)=>passwordField = comp} className="field form-control" name="password" autocomplete="off" type="password" />

                    <br/>

                    { 
                        !state.preloader &&
                        <button 
                        ref={(comp)=>submitButton = comp}
                        className="btn btn-primary"
                        onClick={loginUser}
                        style={
                            {
                                padding: "10px", 
                                fontSize: "16px"
                            }
                        }>
                            Login
                        </button>
                    }
                </div>
            </div>
        )
    }
}

export default LoginScreen;