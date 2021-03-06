import axios from 'axios';
import React, { useState } from 'react';
import WriteMessage from './messageForm';


const Profile = ({ user, images, imageLoaded, setImageloaded, profileUpdate, setProfileupdate, post, setPost, loading, setLoading }) => {

    const [loadimage, setLoadimage] = useState(false);
    const [viewimage, setViewimage] = useState(false);
    const [current, setCurrent] = useState();
    const [messages, setMessages] = useState([])



    //Show all images
    const showImages = images.map(i => {
        return (
            <li className="images" key={i}>
                <img className="frontimage" src={i} alt="" onClick={() => bigImage(i)}></img>
            </li>
        )
    })


    
    //Get messages
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


    //Show image and get messages
    const bigImage = (img) => {
        setCurrent(img)
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


    const deleteImage = async () => {
        if (window.confirm("Haluatko poistaa tämän kuvan?")) {
            await axios.post('/delete', { imagename: current.split('/')[4], username: user })
                .then(res => {
                    setViewimage(false)
                    axios.post('/deletemessage', { image: current.split("/")[4] })
                    !profileUpdate ? setProfileupdate(true) : setProfileupdate(false)
                }).catch(e => {
                    console.log(e)
                })
        }
    }

    const isLoading = () => {
        if (!loadimage) {
            setLoadimage(true)
        } else {
            setLoadimage(false)
        }
    };

    async function uploadImage(e) {
        e.preventDefault();
        const data = new FormData();
        data.append("file", e.target.file.files[0])
        await axios.post('/save-image', data)
            .then(() => {
                setLoadimage(false);
                !profileUpdate ? setProfileupdate(true) : setProfileupdate(false);
                if (!imageLoaded) {
                    setImageloaded(true)
                } else {
                    setImageloaded(false)
                }
            })
        await axios.post('/save-imagename', { username: user, image: e.target.file.files[0].name.toLowerCase() })
            .then(() => {
                !loading ? setLoading(true): setLoading(false)
            })
    }



    return (
        <div className="profile">
            <div className="frontheader">
                <h1>{user}</h1>
                {!viewimage ? <button className="form-submit" onClick={isLoading}>Lataa kuva</button> : null}
                {viewimage ? <button style={{ margin: '8px' }} className="deleteimage" onClick={deleteImage}>Poista kuva</button> : null}
                {loadimage === true ?
                    <div className="uploadform">
                        <form action="#" onSubmit={uploadImage} encType="multipart/form-data">
                            <input type="file" name="file"></input>
                            <input className="from-submit" type="submit" value="Lähetä"></input>
                        </form>
                    </div>
                    : null
                }
            </div>
            <div className="frontblock">
                {!viewimage ? showImages :
                    <div>
                        <img className="bigImage" style={{ cursor: 'pointer', width: '800px' }} src={current} alt="" onClick={() => setViewimage(false)}></img>
                        <h3>Kommentit:</h3>
                        {showMessages}
                        <WriteMessage current={current} user={user} post={post} setPost={setPost} setMessages={setMessages} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile;