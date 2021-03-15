import React, { useState } from 'react';
import WriteMessage from './messageForm';
import axios from 'axios';

const View = ({ viewprofile, images, user, post, setPost, imagemessages, setImagemessages }) => {
    const [current, setCurrent] = useState();
    const [viewimage, setViewimage] = useState(false);
    const [messages, setMessages] = useState([])

    const showImages = images.map(i => {
        return (
            <li className="images" key={i}>
                <img className="frontimage" src={i} alt="" onClick={() => bigImage(i)}></img>
            </li>
        )
    })


    const showMessages = messages.map(user => {
        return (
            <ul key={user.id} className="messageList">
                <li className="messagefeed">
                    <div className="name">{user.sender}</div>
                    <div className="message">{user.message}</div>
                </li>
            </ul>
        )
    })


    const bigImage = (img) => {
        setCurrent(img)
        setImagemessages(img)
        axios.post('/messages', { image: img })
            .then(msg => {
                setMessages(msg.data)
            })
            if(!viewimage){
                setMessages([])
                setViewimage(true)
            }else{
                setViewimage(false)
            }
    }

    return (
        <div className="profile">
            <div className="frontheader">
                <h1>{viewprofile}</h1>
                <div className="frontblock">
                    {!viewimage ? showImages :
                        <div>
                            <img className="bigImage" style={{ cursor: 'pointer', width: '800px' }} src={current} alt="" onClick={() => setViewimage(false)}></img>
                            {user !== 'Vieras' ?
                                <div>
                                    <h3>Kommentit:</h3>
                                    {showMessages}
                                    <WriteMessage current={current} user={user} post={post} setPost={setPost} setMessages={setMessages} viewprofile={viewprofile} />

                                </div>
                                : null}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default View;