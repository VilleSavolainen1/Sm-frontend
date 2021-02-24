import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/navigation';
import Signin from './components/signin';
import Register from './components/register';
import WriteMessage from './components/messageForm';
import Profile from './components/profile';
import FrontPage from './components/frontpage';
import View from './components/viewprofile';
import axios from 'axios';



function App() {

  let messagesToRender;

  const [route, setRoute] = useState('/home');
  const [user, setUser] = useState('Vieras');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [post, setPost] = useState(false);
  const [images, setImages] = useState([]);
  const [viewprofile, setViewprofile] = useState();
  const [imageLoaded, setImageloaded] = useState(false);
  const [profileUpdate, setProfileupdate] = useState(false);
  const [usersList, setUserslist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagemessages, setImagemessages] = useState(null);
  const [unseenmessages, setUnseenmessages] = useState();
  const [messagecount, setMessagecount] = useState(0);


  let addresses = [];
  let users = [];
  let messages = [];
  let showUsers = '';

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(u => {
        users.push(u.data)
        setLoading(true)
      })
    setUserslist(users)
  }, [])


  useEffect(() => {
    if(user !== 'Vieras'){
      axios.post('http://localhost:3001/unseen', {receiver: username})
      .then(r => {
        setUnseenmessages(r)
      })
    }
  }, [user])



  useEffect(() => {
    if (user !== 'Vieras' && route !== '/viewprofile') {
      axios.post('http://localhost:3001/imagenames', { username: user })
        .then(res => {
          res.data.map(name => {
            addresses.push('http://localhost:3001/images/' + name)
          })
          setImages(addresses)
        })
    }
  }, [imageLoaded, user, profileUpdate, loading, route])



  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggeduser");
    if (loggedUser) {
      const user = loggedUser;
      setUser(user);
    }
  }, []);


  useEffect(() => {
    setError('');
  }, [route])


  const onRouteChange = (e) => {
    setRoute(e);
  }

  const viewUser = async (usr) => {
    if (usr === user) {
      setRoute('/profile')
    } else {
      await axios.post('http://localhost:3001/imagenames', { username: usr })
        .then(res => {
          res.data.map(name => {
            addresses.push('http://localhost:3001/images/' + name)
          })
          setImages(addresses)
        })
      setViewprofile(usr)
      setRoute('/viewprofile')
    }
  }


  if (loading) {
    showUsers = usersList[0].map(profile => {
      return (
        <i key={profile} onClick={() => viewUser(profile)}>{profile}</i>
      )
    })
  }



  if (messages) {
    messagesToRender = messages;
  } else {
    messagesToRender = "Loading...";
  }



  function signIn(e) {
    e.preventDefault();
    if (username.length === 0 || password.length === 0) {
      setError("Anna käyttäjänimi ja salasana!")
    } else {
      axios.post('http://localhost:3001/signin', { username: username, password: password })
        .then(res => {
          if (res.status === 200) {
            setRoute('/home')
            setUser(username)
            localStorage.setItem("loggeduser", username);
            setUsername('');
            setPassword('');
          } else {
            setError("Wrong username or password!");
            setUsername('');
            setPassword('');
          }
        })
        .catch(() => {
          setUsername('')
          setPassword('')
          setError("Väärä käyttäjänimi tai salasana!")
        })
    }
  }



  return (
    <div className="container">
      <header id="header">
        <Navigation user={user} setUser={setUser} onRouteChange={onRouteChange} unseenmessages={unseenmessages} messagecount={messagecount} setMessagecount={setMessagecount} />
      </header>
      {user === 'Vieras' && route === '/signin' ?
        <Signin setUser={setUser} setRoute={setRoute} username={username} setUsername={setUsername} password={password} setPassword={setPassword} setError={setError} signIn={signIn} error={error} /> : null
      }
      {user === 'Vieras' && route === '/register' ?
        <Register setRoute={setRoute} setUser={setUser} setError={setError} /> : null
      }
      {route === '/home' ?
        <div className="body-content">
          <div className="center">
            <FrontPage user={user} setRoute={setRoute} />
            <h1 style={{ fontWeight: 150 }}>Käyttäjät</h1>
            <div className="usersblock">
              {showUsers}
            </div>
          </div>
        </div> : null
      }
      {route === '/profile' ?
        <div className="body-content">
          <div className="center">
            <Profile user={user} images={images} imageLoaded={imageLoaded} setImageloaded={setImageloaded} profileUpdate={profileUpdate} setProfileupdate={setProfileupdate} post={post} setPost={setPost} />
          </div>
        </div> : null
      }
      {route === '/viewprofile' ?
        <div className="body-content">
          <div className="center">
            < View viewprofile={viewprofile} images={images} user={user} post={post} setPost={setPost} imagemessages={imagemessages} setImagemessages={setImagemessages} />
          </div>
        </div>
        : null
      }
    </div>
  );
}

export default App;
