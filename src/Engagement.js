import React from 'react';

const Engagement = (props) => {
    return (
        <div className="container-fluid bg-dark pt-4">
            <div className=" d-flex align-items-center justify-content-space-between">
                {props.children}
            </div>
        </div>
    )
}

export default Engagement;
