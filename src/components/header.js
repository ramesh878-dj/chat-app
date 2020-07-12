import React from 'react';
import { Link } from 'react-router-dom';
import './assets/mainstyle.css'
import './assets/icon.css'
import 'materialize-css/dist/js/materialize'

const Header = () =>{
    return (
        <div>
            <header>
                <nav className="nav-wrapper nav">
                    <div className="container">
                            {/* <span className="sidenav-trigger" data-target="mobile-links">
                            <i className="material-icons hide-on-large-only">menu</i>
                            </span> */}                            <ul className="right">
                            
                            <li><Link to="/friends">Friends</Link></li>
                            <li><Link to="/requests">Requests</Link></li>
                            <li><Link to="/search">Add Friend</Link></li>
                            <li><Link to="/logout"><i className="material-icons" style={{fontSize:"1.2em"}}>lock</i></Link></li>
                        </ul>
                    </div>
                </nav>
            </header>
            {/* <ul className="sidenav hide-on-large-only" id="mobile-links">
                <li><Link to="/chat">Chat</Link></li>
                <li><Link to="/friends">Friend</Link></li>
                <li><Link to="/search">Add Friend</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul> */}
        </div>
    )
}

export default Header;
