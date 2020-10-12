import React from 'react';

const IconButton = (props) => {
    return (
        <button className="btn btn-light rounded-circle"
        style={{"margin-right": "10px", "width": "42px", "height": "42px"}}>
            <i class={`fa ${props.icon}`}></i>
        </button>
    )
}

export default IconButton;