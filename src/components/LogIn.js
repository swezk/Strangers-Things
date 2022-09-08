import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { postLogIn } from "../api";

const LogIn = ({ username, setUsername, password, setPassword, setCurrentUser, setToken, isLoggedIn, setIsLoggedIn }) => {
    
    
    const [errorMessage, setErrorMessage] = useState('')



    const loginUser = async (evt) => {
        evt.preventDefault();
        let loggedInUserObj = {
            username,
            password,
        }
        const result = await postLogIn(username, password);
            if (result.success) {
                setToken(result.data.token);
                setCurrentUser(loggedInUserObj);
                setIsLoggedIn(result.success)
            } else if (!result.success) {
                setErrorMessage(result.error.message)
                setUsername('');
                setPassword(''); 
            }            
        
        localStorage.setItem('currentUser', JSON.stringify(loggedInUserObj));
        localStorage.setItem('token', JSON.stringify(result.data.token))
        
   
    }





    return (
        <section id='log-container'>
            <section id='log-in-box'><h2>Log In</h2>
                <form 
                    id='log-in-form'
                    onSubmit={loginUser}
                    >
                    <input
                        type='text'
                        required
                        value={username}
                        id="username"
                        placeholder="Username*"
                        onChange={(evt) => setUsername(evt.target.value)}
                    ></input>
                    <input
                        type='password'
                        required
                        value={password}
                        id='password'
                        placeholder='Password*'
                        onChange={(evt) => setPassword(evt.target.value)}
                    ></input>
                    <input
                        type='submit'
                        value="LOG IN"
                    ></input>
                </form>
                <div>
                    {
                        isLoggedIn ?
                            <Navigate to='/profile/'/>
                    :
                    <div id='no-user-logged-in-container'>
                            <p>{errorMessage}</p>
                            <Link to="/register">Sign Up!</Link>
                    </div>
                    }
                </div>
            </section>
        </section>

    )
}

export default LogIn;