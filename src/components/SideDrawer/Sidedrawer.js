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
                <li className="drawerlink"><span onClick={() => toggle('/home')}>Etusivu</span></li>
                {user !== 'Vieras' ?
                    <div>
                        <li className="drawerlink"><span onClick={() => toggle('/profile')}>Profiili</span></li>
                        <li className="drawerlink"><span onClick={() => exit()}>Kirjaudu ulos</span></li>
                    </div> :
                    <div>
                        <li className="drawerlink"><span onClick={() => toggle('/signin')}>Kirjaudu</span></li>
                        <li className="drawerlink"><span onClick={() => toggle('/register')}>Rekisteröidy!</span></li>
                    </div>
                }

            </ul>
        </nav>
    )
}

export default Sidedrawer;