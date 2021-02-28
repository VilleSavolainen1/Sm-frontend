import React, { useState } from 'react';
import './styledComponents.css';
import Drawertoggle from './SideDrawer/Drawertoggle';
import Sidedrawer from './SideDrawer/Sidedrawer';
import axios from 'axios';

const Navigation = ({ user, setUser, onRouteChange, newmessages, messageChecked, setMessagechecked }) => {

    const [showSidebar, setShowsidebar] = useState(false);
    const [showmessageinfo, setShowmessageinfo] = useState(false);


    function showMessageSwitch() {
        !showmessageinfo ? setShowmessageinfo(true) : setShowmessageinfo(false)
    }

    function messageIsChecked(id) {
        axios.post('http://ec2-13-53-201-232.eu-north-1.compute.amazonaws.com:3001/read', { id: id })
        !messageChecked ? setMessagechecked(true) : setMessagechecked(false)
    }


    function getNumberOfNewMessages() {
        let count = 0;
        if (newmessages.data) {
            if (newmessages.data.length === 0) {
                return (
                    null
                )
            } else {
                newmessages.data.map(num => {
                    if (num.sender !== num.receiver) {
                        count++;
                    }
                })
            }
            if(count === 0){
                return null
            }else{
                return count;
            }
        } else {
            return null;
        }
    }


    function getNewMessageInfo() {
        if (newmessages.data) {
            return (
                newmessages.data.map(info => {
                    if (info.sender !== info.receiver) {
                        return (
                            <ul key={info.id}>
                                <li style={{ listStyle: 'none', fontWeight: 500, cursor: 'pointer' }}><i onClick={() => messageIsChecked(info.id)}>{info.sender} kommentoi kuvaasi {info.image}</i></li>
                            </ul>
                        )
                    }
                })
            )
        }
    }

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
                        <Drawertoggle showSidebar={showSidebar} setShowsidebar={setShowsidebar} />
                        {showSidebar ? <Sidedrawer user={user} onRouteChange={onRouteChange} setShowsidebar={setShowsidebar} setUser={setUser} /> : null}
                        {user !== 'Vieras' ?
                            <div>
                                <span id="username">{user}</span>
                                <div className="newMessagesSmallDevice" onClick={() => showMessageSwitch()}>Uudet viestit: <button className="newMessagesNumber">{getNumberOfNewMessages()}</button></div>
                                <div className="newMessagesList">
                                    <div className="newMessageListText">
                                        {showmessageinfo ? getNewMessageInfo() : null}
                                    </div>
                                </div>
                            </div> : null}
                        {user !== 'Vieras' ?
                            <div className="nav-links">
                                <span id="link" onClick={() => onRouteChange('/home')}>Etusivu</span>
                                <span id="link" onClick={() => onRouteChange('/profile')}>Profiili</span>
                                <div className="newMessages">Uudet viestit: <button className="newMessagesNumber" onClick={() => showMessageSwitch()}>{getNumberOfNewMessages()}</button></div>
                            </div> :
                            <div className="nav-links">
                                <span id="link" onClick={() => onRouteChange('/home')}>Etusivu</span>
                            </div>
                        }
                        {user !== 'Vieras' ?
                            <div className="nav-right">
                                <span id="link" onClick={() => exit()}>Kirjaudu ulos</span>
                            </div> :
                            <div className="nav-right">
                                <span id="link" onClick={() => onRouteChange('/signin')}>Kirjaudu</span>
                                <span id="link" onClick={() => onRouteChange('/register')}>Rekisteröidy!</span>
                            </div>}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navigation;