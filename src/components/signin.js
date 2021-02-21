import React from 'react';
import './styledComponents.css';


const Signin = ({ username, password, setUsername, setPassword, signIn, error, setError }) => {
  
    const onUsernameChange = (e) => {
        setUsername(e.target.value)
        setError('')
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
        setError('')
    }
    
    return (
        <div className="signin">
            <div className="signintitle">
                Kirjaudu
            </div>
            <div className="signinform">
                <form onSubmit={signIn}>
                    <dl className="formrow">
                        <input className="form-control" placeholder="Käyttäjänimi" value={username} name="username" onChange={onUsernameChange}></input>
                    </dl>
                    <dl className="formrow">
                        <input className="form-control" placeholder="Salasana" value={password} name="password" type="password" autoComplete="new-password" onChange={onPasswordChange}></input>
                    </dl>
                    <dl className="formrow">
                        <input className="form-submit" type="submit" value="Kirjaudu"></input>
                    </dl>
                    <p>{error}</p>
                </form>
            </div>
        </div>
    )

}

export default Signin;