import React from 'react';

const Jumbtron = (props) => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">{props.title}</h1>
            <p className="lead">{props.lead}</p>
            <hr className="my-4" />
            <p>{props.description}</p>

            {props.children}
        </div>
    )
}

export default Jumbtron;