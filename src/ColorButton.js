import React from 'react';

const ColorButton = (props) => {
    return(
        <button 
        style={{"margin": "5px"}}
        className={`btn ${props.className}`}>{props.label}</button>
    )
};

export default ColorButton;