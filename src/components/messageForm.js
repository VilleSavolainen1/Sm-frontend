import React, { useState } from 'react';
import axios from 'axios';
import './styledComponents.css';

const WriteMessage = ({ user, post, setPost, current, setMessages, viewprofile }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const userMessage = (e) => {
        setMessage(e.target.value);
        setError('')
    }

    if(!viewprofile){
        viewprofile = user;
    }

    async function onSubmit(e) {
        e.preventDefault();
        if (message.length > 0) {
            await axios.post('http://localhost:3001/sendmessages', { image: current.split("/")[4], sender: user, receiver: viewprofile, message: message, date: new Date() })
                .then(res => {
                    axios.post('http://localhost:3001/messages', { image: current })
                        .then(msg => {
                            setMessages(msg.data)
                        })
                })
            setMessage('')
            if (!post) {
                setPost(true);
            } else {
                setPost(false);
            }
        } else {
            setError("Viestikenttä on tyhjä!")
        }
    }

    return (
        <div className="messageForm">
            <div className="signintitle">
                Kommentoi
            </div>
            <div className="signinform">
                <form onSubmit={onSubmit}>
                    <dl className="formrow">
                        <textarea className="messagebox" placeholder="Viesti" type="textarea" value={message} onChange={userMessage}></textarea>
                    </dl>
                    <dl className="formrow">
                        <input className="form-submit" type="submit" value="Lähetä"></input>
                    </dl>
                    <p>{error}</p>
                </form>
            </div>
        </div>
    )
}

export default WriteMessage;