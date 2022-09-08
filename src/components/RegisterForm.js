import React, { useState } from "react";
import { postNewUser } from "../api";
import { Link } from 'react-router-dom';




const RegisterForm = ({ username, setUsername, password, setPassword, setToken }) => {

    const [newPW1, setNewPW1] = useState('')
    const [newPW2, setNewPW2] = useState('')
    const [newUserSuccess, setNewUserSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const createUser = (evt) => {
        evt.preventDefault();
        const getToken = async () => {

            const returnedResult = await postNewUser(username, password);
            if (returnedResult.success === true) {
                const returnedToken = returnedResult.data.token
                setToken(returnedToken)
                setNewUserSuccess(returnedResult.success)
            } else if (returnedResult.success === false) {
                setErrorMessage(returnedResult.error.message);
            }
        }
    getToken();
    }
 



    return (
        <section id='register-form-container'>
            <form
                id='register-form'
                onSubmit={createUser}
                >
                {
                    newUserSuccess ? 
                        <div>
                            <p>Thanks for signing up! Please <Link to="/log-in/">Log In</Link> with your new Username and Password to get started.</p>
                        </div>
                    :
                        <div id="log-in-inputs">
                            <h2>Create a Log-In</h2>
                            <p className="register-message">{errorMessage}</p>
                            <input
                                type='text'
                                required
                                value={username}
                                id='username'
                                placeholder="Username"
                                onChange={(evt) => setUsername(evt.target.value)}
                            ></input>
                            <input
                                type='password'
                                required
                                value={newPW1}
                                id='password-submission1'
                                placeholder="Password"
                                onChange={(evt) => setNewPW1(evt.target.value)}
                            ></input>
                            <input
                                type='password'
                                required
                                value={newPW2}
                                id='password-submission2'
                                placeholder="Reconfirm Password"
                                onInput={(evt) => setNewPW2(evt.target.value)}
                                onChange={(evt) => setPassword(evt.target.value)}      
                            ></input>
                            <input
                                type='submit'
                                value='Create Account'
                                disabled= {(newPW1 === newPW2) ? false : true}
                            ></input>
                            <div className="register-message">
                                {(newPW1 == newPW2 ) ? null : 'Passwords Must Match' }
                            </div>
                    </div>
                }
                
                
            </form>

        </section>
    )
}


export default RegisterForm;
