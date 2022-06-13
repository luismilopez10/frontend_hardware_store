import { signInWithPopup, GoogleAuthProvider, OAuthCredential } from "firebase/auth";
import React from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { logInInReducer } from "../app/loggedInSlice";
import { auth } from "../firebaseConfig";
import './Login.css'

const providerGoogleAuth = new GoogleAuthProvider();

const Login = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const signInWithGoogle = () => {

      signInWithPopup(auth, providerGoogleAuth)
      .then((result) => {
        const credential:OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
  
        const token = credential!.accessToken;
        const user = result.user;

          // console.log(user);
  
        dispatch(logInInReducer(user.displayName))
        
        navigate('/pos')

      }).catch((error) => {        
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
    }

  return (
    <div className='login__body'>
      <div className="login__container">
        <form action="#">
          <div className="title">Login</div>
          <div className="input-box underline">
            <input type="text" placeholder="Enter Your Email" required />
            <div className="underline"></div>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Enter Your Password" required />
            <div className="underline"></div>
          </div>
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

