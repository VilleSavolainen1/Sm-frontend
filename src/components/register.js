import React, { useState } from 'react';
import axios from 'axios';
import './styledComponents.css';

const Register = ({ setRoute, setUser }) => {
    const [usern, setUsername] = useState('');
    const [passw, setPassword] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [error, setError] = useState('');


    async function onSubmit(e) {
        e.preventDefault();
        if (passw === confirmpassword && usern.length > 0) {
            await axios.post('http://ec2-13-53-201-232.eu-north-1.compute.amazonaws.com:3001/register', { username: usern, password: passw, email: email })
            .then(res => {
                setUser(usern)
                setRoute('/home');
            })
            .catch(()=> {
                setUsername('')
                setPassword('')
                setConfirmpassword('')
                setEmail('')
                setError("Käyttäjänimi on varattu!")
            })
        } else {
            setError('Täytä puuttuvat tiedot!');
        }
    }

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
        setError('')
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
        setError('')
    }

    const confirmPassword = (e) => {
        setConfirmpassword(e.target.value)
        setError('')
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
        setError('')
    }

    return (
        <div className="register">
            <div className="signintitle">
                Rekisteröidy
            </div>
            <div className="signinform">
                <form onSubmit={onSubmit}>
                    <dl className="formrow">
                        <input className="form-control" placeholder="Käyttäjänimi" name="username" value={usern} onChange={onUsernameChange}></input>
                    </dl>
                    <dl>
                        <input className="form-control" placeholder="Salasana" type="password" name="password" value={passw} autoComplete="new-password" onChange={onPasswordChange}></input>
                    </dl>
                    <dl>
                        <input className="form-control" placeholder="Salasana uudelleen" type="password" value={confirmpassword} onChange={confirmPassword}></input>
                    </dl>
                    <dl>
                        <input className="form-control" placeholder="E-mail" type="email" value={email} onChange={onEmailChange}></input>
                    </dl>
                    <dl>
                        <input className="form-submit" type="submit" value="Rekisteröidy"></input>
                    </dl>
                    <p>{error}</p>
                </form>
            </div>
        </div>
    )
}

export default Register;