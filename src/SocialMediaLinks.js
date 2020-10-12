import React from 'react';

const SocialMediaLinks = (props) => {
    return (
        <div className="d-flex align-items-center ">
            {props.children}
        </div>
    )
}

export default SocialMediaLinks;