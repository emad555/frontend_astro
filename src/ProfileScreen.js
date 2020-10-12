import React, { useState, useEffect } from 'react';
import { validEmail, validPassword } from './utils';  

const ProfileScreen = () => {

    const [ state, setState ] = useState(
        {
            profileLoaded: false,
            errors: [],
            success: false,
            preloader: false
        }
    )

    // All the registration data will go here
    const formData = new FormData();

    // Declare (not define) variables for React
    let firstNameField;
    let lastNameField;
    let emailField;
    let passwordField;
    let phoneField;
    let photoField;
    let updateButton;

    const attachFile = (event) => {
        // create a an array for files
        const files = Array.from(event.target.files);

        // append the files (e.g, image) to the FormData
        files.forEach( (file, index)=> {
            formData.append(index, file);
        });
    }

    const updateUser = () => {
        let errorMessages = [];

        if(firstNameField.value.length === 0) {
            errorMessages.push("Please enter your first name!");
        }
        if(lastNameField.value.length === 0) {
            errorMessages.push("Please enter your last name!");
        }
        if(!validEmail(emailField.value)) {
            errorMessages.push("Please enter your email!");
        }
        if(passwordField.value.length > 0 && !validPassword(passwordField.value)) {
            errorMessages.push("Please enter a valid password!");
        }

        if(errorMessages.length > 0) {
            setState(
                {
                    ...state,
                    errors: errorMessages
                }
            )
        } else {

            // Turn on preloader
            setState(
                {
                    ...state,
                    errors: [],
                    preloader: true
                }
            )

            // Complete the formData
            formData.append('firstName', firstNameField.value);
            formData.append('lastName', lastNameField.value);
            formData.append('email', emailField.value);
            formData.append('phone', phoneField.value);
            if(passwordField.value.length > 0 && !validPassword(passwordField.value)) {
                formData.append('password', passwordField.value);
            }

            // fetch function
            fetch(`${process.env.REACT_APP_API_URL}users/update`,{
                method: 'POST',
                headers: {
                    //"Content-Type": "multipart/form-data"
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData
            })
            // Convert the JSON string to an object
            .then(
                (response) => response.json()
            )

            // If Promise was successful
            .then(
                (response) => {
                    console.log(response);
                    
                    // Turn off preloader and reveal success message
                    setState(
                        {
                            ...state,
                            errors: [],
                            preloader: false,
                            success: true
                        }
                    )
                }
            )

            // If Promise was not fulfilled
            .catch(
                (e) => {
                    console.log({e: e})
                    // Turn off preloader and reveal error message
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

    useEffect(
        () => {
            // If the profile data is not loaded
            if(!state.profileLoaded) {
                // fetch the data from backend
                fetch(`${process.env.REACT_APP_API_URL}users/find`, {
                    method: 'POST',
                    headers: { 'Authorization' : `Bearer ${localStorage.getItem('token')}` },
                    body: {}
                })
                .then(
                    (response) => {
                        console.log('response', response);
                        return response.json()
                    }
                )
                .then((profile) => {
                    // Once data is loaded, change profileLoaded to true and 
                    // change the state to populate the form fields
                    setState(
                        {
                            ...state,
                            profileLoaded: true,
                            firstName: profile[0].firstName,
                            lastName: profile[0].lastName,
                            email: profile[0].email,
                            phone: profile[0].phone,
                            photoURL: profile[0].photoURL
                        }
                    )
                })
                .catch(
                    (e) => console.log('e', e)
                ) 
            }
        }, 
        [ state.profileLoaded ]
    )

    return (
        <div className="screen">

            <div className="container" 
                    style={
                        {
                            marginTop: "5em", 
                            maxWidth: "40em"
                        }
                    }>
                <h1>Profile Settings</h1>

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

                {
                 state.success &&
                    <div className="alert alert-success">Successfully Updated!</div>
                }

                <img src={state.photoURL} style={
                    {
                        width: '160px',
                        display: 'block',
                        margin: '0 auto',
                    }
                } />

                <br/>
                <label>Enter your firstname *</label>
                <input ref={(comp)=>firstNameField = comp} type="text" className="field form-control" defaultValue={state.firstName}/>

                <label>Enter your lastname *</label>
                <input ref={(comp)=>lastNameField = comp} type="text" className="field form-control" defaultValue={state.lastName}/>

                <label>Enter your email *</label>
                <input ref={(comp)=>emailField = comp} type="text" className="field form-control" defaultValue={state.email}/>

                <label>Enter your password *</label>
                <input ref={(comp)=>passwordField = comp} type="password" className="field form-control"/>

                <label>Enter your phone (optional)</label>
                <input ref={(comp)=>phoneField = comp} type="text" className="field form-control" defaultValue={state.phone}/>

                <br/><br/>

                <label>Upload your profile picture</label>
                <input
                ref={(comp)=>photoField = comp}
                onChange={attachFile}
                className="field form-control" id="photo" 
                name="file" type="file" multiple="multiple"
                />

                <br/><br/>

                { 
                !state.preloader &&
                    <button 
                    ref={(comp)=>updateButton = comp}
                    onClick={updateUser}
                    className="btn btn-primary"
                    style={
                        {
                            padding: "10px", 
                            fontSize: "16px"
                        }
                    }>
                        Update
                    </button>
                }
            </div>

        </div>
    )
}

export default ProfileScreen;