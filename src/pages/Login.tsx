import { signInWithPopup, GoogleAuthProvider, OAuthCredential, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { logInInReducer } from "../app/loggedInSlice";
import { auth } from "../firebaseConfig";
import './Login.css'

const providerGoogleAuth = new GoogleAuthProvider();

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsgClassName, setErrorMsgClassName] = useState('error-message-off');


  const logInWithEmailAndPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(userName && password){
      signInWithEmailAndPassword(auth, userName, password)
      .then((userCredential) => {
        const user = userCredential.user;

        console.log(user.email);
        
        dispatch(logInInReducer(user.email));
        
        navigate('/pos');

        // console.log('**** user credentials ****');
        // console.log(userCredential);
        // console.log('**** user ***');
        // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log('*** Log in error ***');
        // console.log(errorMessage);

        setErrorMsgClassName('error-message-on');
      });

      // setUserName('');
      // setPassword('');
    }
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, providerGoogleAuth)
      .then((result) => {
        const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);

        const token = credential!.accessToken;
        const user = result.user;

        dispatch(logInInReducer(user.displayName));

        navigate('/pos');

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }


  const signIn = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate('/signin');
  }

  return (
    <div className='login__body'>
      <div className="login__container">
        <form onSubmit={(e) => logInWithEmailAndPassword(e)}>
          <div className="title">Login</div>
          <div className="input-box underline">
            <input type="email" placeholder="Enter Your Email" value={userName} onChange={(e)=> setUserName(e.target.value)} required />
            <div className="underline"></div>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Enter Your Password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
            <div className="underline"></div>
          </div>
          <br />
          <span className={errorMsgClassName}>Your credentials are incorrect. Please try again.</span>
          <span className="option">Not a member? <a href="#" onClick={(e) => signIn(e)}>Sign in now</a></span>
          <div className="input-box button">
            <input type="submit" name="" value="Login" />
          </div>
        </form>
        <div className="option">or Connect With Social Media</div>
        <div className="google">
          <a href="#" onClick={() => signInWithGoogle()}>Sign in With Google</a>
        </div>
        <div className="github">
          <a href="#">Sign in With GitHub</a>
        </div>
      </div>
    </div>
  )
}

export default Login

