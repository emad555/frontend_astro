import React from 'react';

const FooterSubscription = (props) => {
    return (
        <div className="container text-right text-light">
            <p>Get the latest news from Nokia delivered straight to your inbox.</p>
            {props.children}
        </div>
    )
}

export default FooterSubscription;