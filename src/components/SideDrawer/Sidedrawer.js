import React from 'react';
import './sidedrawer.css';

const Sidedrawer = ({ user, onRouteChange, setShowsidebar, setUser }) => {

    const exit = () => {
        localStorage.clear();
        setUser('Vieras');
        onRouteChange('/home')
        setShowsidebar(false);
    };

    const toggle = (route) => {
        onRouteChange(route);
        setShowsidebar(false);
    }

    return (
        <nav className="side-drawer">
            <ul className="link-list">
                <li className="drawerlink"><a onClick={() => toggle('/home')}>Etusivu</a></li>
                {user !== 'Vieras' ?
                    <div>
                        <li className="drawerlink"><a onClick={() => toggle('/profile')}>Profiili</a></li>
                        <li className="drawerlink"><a onClick={() => exit()}>Kirjaudu ulos</a></li>
                    </div> :
                    <div>
                        <li className="drawerlink"><a onClick={() => toggle('/signin')}>Kirjaudu</a></li>
                        <li className="drawerlink"><a onClick={() => toggle('/register')}>Rekisteröidy!</a></li>
                    </div>
                }

            </ul>
        </nav>
    )
}

export default Sidedrawer;