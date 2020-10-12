import React, { useState } from 'react';

const ToggleButton = () => {

    const [ state, setState ] = useState("On") // ["On", ()=>{}]

    const toggle = () => {
        if(state === "On") {
            setState("Off")
        } else {
            setState("On")
        }
    }

    return(
        <button 
        onClick={toggle} 
        className="btn btn-dark">{state}</button>
    )
}

export default ToggleButton;