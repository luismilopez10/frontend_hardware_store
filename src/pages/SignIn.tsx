import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebaseConfig";
import './SignIn.css'

const SignIn = () => {

    const navigate = useNavigate();
    
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [errorMsgClassName, setErrorMsgClassName] = useState('error-message-off');
    

    const signInForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password && userName) {
            createUserWithEmailAndPassword(auth, userName, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // console.log("****user****");
                    // console.log(user);
                    
                    alert('Successful registration.');
                    navigate('/logIn');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('*** sign in error code ***');
                    console.log(errorCode);
                    console.log('*** sign in error ***');
                    console.log(errorMessage);


                    if (errorCode === "auth/weak-password") {
                        setErrorMsg("Password should be at least 6 characters.");
                        setPassword('');
                    } else if (errorCode === "auth/email-already-in-use"){
                        setErrorMsg("Email is already in use.");
                        setPassword('');
                    }
                    setErrorMsgClassName('error-message-on');
                });
        }
    }

    return (

        <div className='signin__body'>
            <div className="signin__container">
                <form onSubmit={(e) => signInForm(e)}>
                    <div className="title">Sign In</div>
                    <div className="input-box underline">
                        <input type="email" placeholder="Email" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <div className="underline"></div>
                    </div>
                    <br />
                    <span className={errorMsgClassName}>{errorMsg}</span>
                    <div className="input-box button">
                        <input type="submit" name="" value="Sign in" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn