import React, { useState } from 'react';

const EmailSubscribeForm = (props) => {

    const [state, setState] = useState(
        {
            showSubscribeButton: true
        }
    )

    const showForm = () => {
        setState(
            { showSubscribeButton: false }
        )
    }

    return(
        <div>
            {
                state.showSubscribeButton && 
                <button 
                onClick={showForm}
                className="btn btn-primary btn-lg">
                    {props.btnLabel}
                </button>
            }

            {
                !state.showSubscribeButton && 
                <div className="form-inline justify-content-center">
                    <div className="form-group">
                        <label for="staticEmail2" className="sr-only">Email</label>
                        <input type="text" readonly className="form-control" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            }
        </div>

    )
}

export default EmailSubscribeForm;