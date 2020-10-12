import React, { useState } from 'react';
import NavBar from './NavBar';
import { validEmail, validPassword } from './utils';

const RegistrationScreen = () => {

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
    let firstNameField;
    let lastNameField;
    let emailField;
    let passwordField;
    let phoneField;
    let photoField;
    let termsConditionsCheck;
    let submitButton;

    const attachFile = (event) => {
        // create a an array for files
        const files = Array.from(event.target.files);

        // append the files (e.g, image) to the FormData
        files.forEach( (file, index)=> {
            formData.append(index, file);
        });
    }

    const registerUser = () => {

        let errorMessages = [];

        // Step 4
        if(firstNameField.value.length === 0) {
            errorMessages.push("Please enter your first name!");
        }
        if(lastNameField.value.length === 0) {
            errorMessages.push("Please enter your last name!");
        }
        if(!validEmail(emailField.value)) {
            errorMessages.push("Please enter your email!");
        }
        if(!validPassword(passwordField.value)) {
            errorMessages.push("Please enter a password!");
        }

        // Step 5
        if(termsConditionsCheck.checked === false) {
            errorMessages.push("Please accept terms & conditions!");
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
            formData.append('password', passwordField.value);
            formData.append('phone', phoneField.value);

            // fetch function
            fetch('http://localhost:3001/users/register',{
                method: 'POST',
                //headers: {"Content-Type": "multipart/form-data"},
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

    return (
        <div>
            <NavBar 
                brand="MyApp"
                links={
                    [
                        {
                            label: 'Home',
                            path: '/'
                        },
                        {
                            label: 'About',
                            path: '/about'
                        },
                        {
                            label: 'Contact',
                            path: '/contact'
                        }
                    ]
                    }
            />

            <div className="container" 
                style={
                    {
                        marginTop: "5em", 
                        maxWidth: "40em"
                    }
                }>

                <h1>Register Your Account</h1>
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
                    <div className="alert alert-success">Successfully Registered</div>
                }

                <label>Enter your firstname *</label>
                <input ref={(comp)=>firstNameField = comp} className="field form-control" name="firstName" 
                type="text" />

                <label>Enter your lastname *</label>
                <input ref={(comp)=>lastNameField=comp} className="field form-control" name="lastName" type="text" />

                <label>Enter your email *</label>
                <input ref={(comp)=>emailField = comp} className="field form-control" name="email" type="text" />

                <label>Enter a password *</label>
                <input ref={(comp)=>passwordField = comp} className="field form-control" name="password" autocomplete="off" type="password" />

                <label>Enter your phone (optional)</label>
                <input ref={(comp)=>phoneField = comp} className="field form-control" name="phone" type="text" />

                <br/><br/>

                <label>Upload your profile picture</label>
                <input ref={ (comp)=>photoField = comp } 
                onChange={attachFile}
                className="field form-control" id="photo" 
                name="file" type="file" multiple="multiple"
                />

                <br/><br/>

                <label>Do you agree to terms &amp; conditions? *</label>
                <input ref={(comp)=>termsConditionsCheck = comp} className="checkbox" name="termsConditions" 
                type="checkbox" /> Yes

                <br/><br/>

                <button 
                ref={(comp)=>submitButton = comp}
                className="btn btn-primary"
                onClick={registerUser}
                style={
                    {
                        padding: "10px", 
                        fontSize: "16px"
                    }
                }>
                    Register
                </button>
            </div>


        </div>
    )
}

export default RegistrationScreen;