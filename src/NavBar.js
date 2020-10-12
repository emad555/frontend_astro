import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">{props.brand}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav mr-auto">
                {
                    // loop through links
                    props.links.map(
                        (entry) => 
                            // for every link, generate an 'li'
                            <li className="nav-item active">
                                <Link className="nav-link" to={entry.path}>
                                    {entry.label}
                                </Link>
                            </li>
                    )
                }
            </ul>
            
            </div>
            {props.children}
      </nav>
    )
}

export default NavBar;