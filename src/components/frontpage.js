import React from 'react';
import './styledComponents.css';


const FrontPage = ({ user, setRoute }) => {



    return (
        <div className="profile">
            <div className="frontheader">
                {user === 'Vieras' ?
                    <div>
                        <h1>Tervetuloa!</h1>
                        <p>Kirjaudu sisään tai rekisteröidy, jotta voit kommentoida ja ladata kuvia.</p></div> : null}
                {user === 'Vieras' ?
                    <div style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <button className="form-submit" onClick={() => setRoute('/signin')}>Kirjaudu sisään</button>
                        <button style={{ margin: '8px' }} className="form-submit" onClick={() => setRoute('/register')}>Rekisteröidy</button>
                    </div> : null}
                <div className="frontblock">
                    
                </div>
            </div>
        </div>
    )
}

export default FrontPage;