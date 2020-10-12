import React, { useState } from 'react';

const CounterButton = () => {

    const [state, setState] = useState(1);

    const incrementCount = () => {
        // create a const for the new state
        const newCount = state + 1;
        // use setState to update the current state
        setState(newCount);
    }

    return (
        <button 
            onClick={incrementCount} 
            className="btn btn-dark">{state}</button>
    )
};

export default CounterButton;