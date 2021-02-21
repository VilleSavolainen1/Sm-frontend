import React from 'react';
import './styledComponents.css';

const Navigation = ({ user, setUser, onRouteChange }) => {

    const exit = () => {
        localStorage.clear();
        setUser('Vieras');
        onRouteChange('/home')
      };


    return (
        <div className="navigation">
            <div className="nav-wrapper">
                <nav id="nav">
                    <div className="nav-inner">
                        <a id="username">{user}</a>
                        {user !== 'Vieras' ?
                            <div className="nav-links">
                                <a id="link" onClick={() => onRouteChange('/home')}>Etusivu</a>
                                <a id="link" onClick={() => onRouteChange('/profile')}>Profiili</a>
                            </div> :
                            <div className="nav-links">
                                <a id="link" onClick={() => onRouteChange('/home')}>Etusivu</a>
                            </div>
                        }
                        {user !== 'Vieras' ?
                            <div className="nav-right">
                                <a id="link" onClick={() => exit()}>Kirjaudu ulos</a>
                            </div> :
                            <div className="nav-right">
                                <a id="link" onClick={() => onRouteChange('/signin')}>Kirjaudu</a>
                                <a id="link" onClick={() => onRouteChange('/register')}>Rekisteröidy!</a>
                            </div>}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navigation;